import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Loader2, Mail, Lock, UserIcon } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      return false;
    }
    if (password.length > 16) {
      setPasswordError("Password maksimal 16 karakter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (value: string) => {
    setSignupPassword(value);
    if (value) validatePassword(value);
    else setPasswordError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    if (!error) navigate("/dashboard");
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(signupPassword)) return;
    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupFullName);
    setLoading(false);
    if (!error) {
      setSignupEmail("");
      setSignupPassword("");
      setSignupFullName("");
      setPasswordError("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--gradient-page)" }}
    >
      {/* Decorative blobs — pastel mint, peach, blush */}
      <div
        className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-25 animate-float pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(172 50% 70%) 0%, hsl(185 50% 65%) 100%)",
          filter: "blur(52px)",
        }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(25 70% 78%) 0%, hsl(340 50% 80%) 100%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute top-1/2 left-[-40px] w-36 h-36 rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(210 60% 76%) 0%, hsl(172 45% 68%) 100%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-full max-w-[420px] animate-fade-in relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-primary transition-transform duration-300 hover:scale-110 hover:rotate-3 pulse-glow">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Analytics Sosmed
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Platform Analitik Media Sosial
            </p>
          </div>
        </div>

        <Card className="shadow-elevated border-border/40 backdrop-blur-sm card-gradient">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center font-bold">
              Selamat Datang
            </CardTitle>
            <CardDescription className="text-center">
              Analisis performa konten sosial media untuk UMKM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="text-sm font-medium">
                  Masuk
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm font-medium">
                  Daftar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-email"
                      className="text-xs font-semibold text-foreground/80"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="nama@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="h-10 pl-10 transition-all duration-200 focus:border-primary/60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-foreground/80"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="h-10 pl-10 transition-all duration-200 focus:border-primary/60"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold btn-primary-glow text-white border-0 mt-2"
                    style={{ background: "var(--gradient-primary)" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {loading ? "Memproses..." : "Masuk"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-name"
                      className="text-xs font-semibold text-foreground/80"
                    >
                      Nama Lengkap
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Nama Anda"
                        value={signupFullName}
                        onChange={(e) => setSignupFullName(e.target.value)}
                        required
                        className="h-10 pl-10 transition-all duration-200 focus:border-primary/60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-email"
                      className="text-xs font-semibold text-foreground/80"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="nama@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        className="h-10 pl-10 transition-all duration-200 focus:border-primary/60"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-password"
                      className="text-xs font-semibold text-foreground/80"
                    >
                      Password (6-16 karakter)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                        minLength={6}
                        maxLength={16}
                        className={`h-10 pl-10 transition-all duration-200 ${passwordError ? "border-destructive focus-visible:ring-destructive" : "focus:border-primary/60"}`}
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-destructive flex items-center gap-1 animate-fade-in-fast">
                        {passwordError}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold btn-primary-glow text-white border-0 mt-2"
                    style={{ background: "var(--gradient-primary)" }}
                    disabled={loading || !!passwordError}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {loading ? "Memproses..." : "Daftar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Analytics Sosmed. Hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
};

export default Auth;
