import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  UserPlus, 
  Trash2, 
  Shield, 
  Eye, 
  Edit, 
  Crown, 
  Users, 
  Loader2
} from "lucide-react";

interface ProjectMember {
  id_anggota_proyek: string;
  id_pengguna: string;
  peran_dalam_proyek: "owner" | "admin" | "editor" | "viewer";
  created_at: string;
  profil: {
    id_profil: string;
    nama_lengkap: string | null;
  } | null;
}

interface AvailableUser {
  id_profil: string;
  nama_lengkap: string | null;
}

const roleLabels: Record<string, string> = {
  owner: "Pemilik",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

const roleIcons: Record<string, React.ReactNode> = {
  owner: <Crown className="h-4 w-4" />,
  admin: <Shield className="h-4 w-4" />,
  editor: <Edit className="h-4 w-4" />,
  viewer: <Eye className="h-4 w-4" />,
};

const roleBadgeVariants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  owner: "default",
  admin: "secondary",
  editor: "outline",
  viewer: "outline",
};

const AnggotaProyek = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, loading: appLoading } = useApp();
  
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isProjectAdmin, setIsProjectAdmin] = useState(false);
  
  // Add member dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("viewer");
  const [addingMember, setAddingMember] = useState(false);
  
  // Edit member dialog
  const [editingMember, setEditingMember] = useState<ProjectMember | null>(null);
  const [editRole, setEditRole] = useState<string>("");
  const [updatingRole, setUpdatingRole] = useState(false);
  
  // Delete member dialog
  const [deletingMember, setDeletingMember] = useState<ProjectMember | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState(false);

  // Project owner info
  const [projectOwner, setProjectOwner] = useState<{ id_pemilik: string; nama_lengkap: string | null } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (selectedProject && user) {
      fetchProjectData();
    }
  }, [selectedProject, user]);

  const fetchProjectData = async () => {
    if (!selectedProject || !user) return;
    
    setLoading(true);
    try {
      // Fetch project to get owner ID
      const { data: projectData, error: projectError } = await supabase
        .from("proyek")
        .select("id_pemilik")
        .eq("id_proyek", selectedProject.id_proyek)
        .single();

      if (projectError) throw projectError;

      // Fetch owner profile separately
      const { data: ownerProfileData } = await supabase
        .from("profil")
        .select("nama_lengkap")
        .eq("id_profil", projectData.id_pemilik)
        .maybeSingle();

      setProjectOwner({
        id_pemilik: projectData.id_pemilik,
        nama_lengkap: ownerProfileData?.nama_lengkap || null,
      });
      setIsOwner(projectData.id_pemilik === user.id);

      // Fetch project members
      const { data: membersData, error: membersError } = await supabase
        .from("anggota_proyek")
        .select("id_anggota_proyek, id_pengguna, peran_dalam_proyek, created_at")
        .eq("id_proyek", selectedProject.id_proyek)
        .order("created_at", { ascending: true });

      if (membersError) throw membersError;

      // Fetch profiles for members
      const memberIds = (membersData || []).map(m => m.id_pengguna);
      let memberProfiles: Record<string, { id_profil: string; nama_lengkap: string | null }> = {};
      
      if (memberIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profil")
          .select("id_profil, nama_lengkap")
          .in("id_profil", memberIds);
        
        if (profilesData) {
          memberProfiles = profilesData.reduce((acc, p) => {
            acc[p.id_profil] = p;
            return acc;
          }, {} as Record<string, { id_profil: string; nama_lengkap: string | null }>);
        }
      }

      const formattedMembers = (membersData || []).map(m => ({
        ...m,
        profil: memberProfiles[m.id_pengguna] || null,
      })) as ProjectMember[];

      setMembers(formattedMembers);

      // Check if current user is project admin
      const currentUserMember = formattedMembers.find(m => m.id_pengguna === user.id);
      setIsProjectAdmin(currentUserMember?.peran_dalam_proyek === "admin" || projectData.id_pemilik === user.id);

      // Fetch available users to add (not already members and not owner)
      const existingMemberIds = formattedMembers.map(m => m.id_pengguna);
      existingMemberIds.push(projectData.id_pemilik); // Add owner to exclusion list

      let usersQuery = supabase.from("profil").select("id_profil, nama_lengkap");
      
      if (existingMemberIds.length > 0) {
        usersQuery = usersQuery.not("id_profil", "in", `(${existingMemberIds.join(",")})`);
      }
      
      const { data: usersData, error: usersError } = await usersQuery;

      if (usersError) throw usersError;

      setAvailableUsers(usersData || []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      toast.error("Gagal memuat data anggota proyek");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!selectedProject || !selectedUserId || !selectedRole) {
      toast.error("Pilih pengguna dan peran");
      return;
    }

    setAddingMember(true);
    try {
      const insertData = {
        id_proyek: selectedProject.id_proyek,
        id_pengguna: selectedUserId,
        peran_dalam_proyek: selectedRole as "owner" | "admin" | "editor" | "viewer",
      };

      const { error } = await supabase
        .from("anggota_proyek")
        .insert(insertData);

      if (error) throw error;

      toast.success("Anggota berhasil ditambahkan");
      setIsAddDialogOpen(false);
      setSelectedUserId("");
      setSelectedRole("viewer");
      fetchProjectData();
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Gagal menambahkan anggota");
    } finally {
      setAddingMember(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!editingMember || !editRole) return;

    setUpdatingRole(true);
    try {
      const updateData = { 
        peran_dalam_proyek: editRole as "owner" | "admin" | "editor" | "viewer" 
      };
      
      const { error } = await supabase
        .from("anggota_proyek")
        .update(updateData)
        .eq("id_anggota_proyek", editingMember.id_anggota_proyek);

      if (error) throw error;

      toast.success("Peran berhasil diubah");
      setEditingMember(null);
      setEditRole("");
      fetchProjectData();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Gagal mengubah peran");
    } finally {
      setUpdatingRole(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!deletingMember) return;

    setDeletingMemberId(true);
    try {
      const { error } = await supabase
        .from("anggota_proyek")
        .delete()
        .eq("id_anggota_proyek", deletingMember.id_anggota_proyek);

      if (error) throw error;

      toast.success("Anggota berhasil dihapus");
      setDeletingMember(null);
      fetchProjectData();
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Gagal menghapus anggota");
    } finally {
      setDeletingMemberId(false);
    }
  };

  const canManageMembers = isOwner || isProjectAdmin;

  if (authLoading || appLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  if (!selectedProject) {
    return (
      <AppLayout>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Pilih project terlebih dahulu untuk melihat anggota.
            </p>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Anggota Proyek</h1>
            <p className="text-muted-foreground">
              Kelola anggota dan akses untuk proyek {selectedProject.nama_proyek}
            </p>
          </div>
          {canManageMembers && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tambah Anggota
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Anggota Baru</DialogTitle>
                  <DialogDescription>
                    Pilih pengguna yang sudah terdaftar dan tentukan peran dalam proyek ini.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Pengguna</Label>
                    <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pengguna" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUsers.length === 0 ? (
                          <SelectItem value="none" disabled>
                            Tidak ada pengguna tersedia
                          </SelectItem>
                        ) : (
                          availableUsers.map((u) => (
                            <SelectItem key={u.id_profil} value={u.id_profil}>
                              {u.nama_lengkap || "Tanpa Nama"}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Peran</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <span className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Admin - Dapat mengelola anggota
                          </span>
                        </SelectItem>
                        <SelectItem value="editor">
                          <span className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Editor - Dapat mengedit data
                          </span>
                        </SelectItem>
                        <SelectItem value="viewer">
                          <span className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Viewer - Hanya lihat
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button 
                    onClick={handleAddMember} 
                    disabled={!selectedUserId || addingMember}
                  >
                    {addingMember && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Tambah
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Owner Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="h-5 w-5 text-warning" />
              Pemilik Proyek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {projectOwner?.nama_lengkap || "Tanpa Nama"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pemilik memiliki akses penuh ke proyek
                  </p>
                </div>
              </div>
              <Badge variant="default">
                {roleLabels.owner}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Members Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Daftar Anggota
            </CardTitle>
            <CardDescription>
              Anggota yang memiliki akses ke proyek ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Belum ada anggota ditambahkan</p>
                {canManageMembers && (
                  <p className="text-sm mt-2">
                    Klik "Tambah Anggota" untuk menambahkan anggota baru
                  </p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead>Ditambahkan</TableHead>
                    {canManageMembers && <TableHead className="text-right">Aksi</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id_anggota_proyek}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                            {roleIcons[member.peran_dalam_proyek]}
                          </div>
                          <span className="font-medium">
                            {member.profil?.nama_lengkap || "Tanpa Nama"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={roleBadgeVariants[member.peran_dalam_proyek]}>
                          <span className="flex items-center gap-1">
                            {roleIcons[member.peran_dalam_proyek]}
                            {roleLabels[member.peran_dalam_proyek]}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(member.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      {canManageMembers && (
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingMember(member);
                                setEditRole(member.peran_dalam_proyek);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeletingMember(member)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ubah Peran Anggota</DialogTitle>
              <DialogDescription>
                Ubah peran untuk {editingMember?.profil?.nama_lengkap || "anggota ini"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Peran Baru</Label>
                <Select value={editRole} onValueChange={setEditRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin - Dapat mengelola anggota
                      </span>
                    </SelectItem>
                    <SelectItem value="editor">
                      <span className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Editor - Dapat mengedit data
                      </span>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <span className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Viewer - Hanya lihat
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingMember(null)}>
                Batal
              </Button>
              <Button onClick={handleUpdateRole} disabled={updatingRole}>
                {updatingRole && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Member Alert */}
        <AlertDialog open={!!deletingMember} onOpenChange={(open) => !open && setDeletingMember(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Anggota?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus {deletingMember?.profil?.nama_lengkap || "anggota ini"} dari proyek? 
                Anggota tidak akan memiliki akses ke proyek lagi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveMember}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={deletingMemberId}
              >
                {deletingMemberId && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
};

export default AnggotaProyek;
