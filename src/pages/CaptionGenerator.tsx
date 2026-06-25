import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CaptionGenerator() {
  const { user, loading: authLoading } = useAuth();
  const { selectedProject, loading: appLoading } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [gayaBahasa, setGayaBahasa] = useState("friendly");
  const [customStyle, setCustomStyle] = useState("");
  const [panjangCaption, setPanjangCaption] = useState("sedang");
  const [opsiHashtag, setOpsiHashtag] = useState("seperlunya");
  const [opsiEmoji, setOpsiEmoji] = useState("sedikit");
  const [tujuanCaption, setTujuanCaption] = useState("none");
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (authLoading || appLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!selectedProject) {
    return (
      <AppLayout>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Project Belum Dipilih</AlertTitle>
          <AlertDescription>
            Silakan pilih project terlebih dahulu dari dropdown di atas.
          </AlertDescription>
        </Alert>
      </AppLayout>
    );
  }

  const handleGenerate = async () => {
    if (!deskripsi.trim()) {
      toast({ title: "Deskripsi diperlukan", description: "Silakan isi deskripsi", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setGeneratedCaptions([]);

    try {
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log("API Key:", geminiApiKey ? "ADA" : "TIDAK ADA");

      if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY tidak dikonfigurasi");
      }

      const styleMap: Record<string, string> = {
        friendly: "Bahasa ramah, hangat",
        casual: "Bahasa santai",
        formal: "Bahasa formal",
        professional: "Bahasa profesional",
        confident: "Bahasa percaya diri",
        simplified: "Bahasa sederhana",
        direct: "Bahasa langsung",
      };

      const lengthMap: Record<string, string> = {
        pendek: "1-2 kalimat",
        sedang: "3-5 kalimat",
        panjang: "6-10 kalimat",
      };

      const hashtagMap: Record<string, string> = {
        tanpa: "Tanpa hashtag",
        seperlunya: "3-5 hashtag",
        banyak: "10-15 hashtag",
      };

      const emojiMap: Record<string, string> = {
        tanpa: "Tanpa emoji",
        sedikit: "2-4 emoji",
        banyak: "5-10 emoji",
      };

      const prompt = `Buat 3 caption Instagram berbeda dalam Bahasa Indonesia.

DESKRIPSI: ${deskripsi}
GAYA: ${gayaBahasa === "custom" ? customStyle : styleMap[gayaBahasa]}
PANJANG: ${lengthMap[panjangCaption]}
HASHTAG: ${hashtagMap[opsiHashtag]}
EMOJI: ${emojiMap[opsiEmoji]}

Output JSON saja: {"captions": ["caption1", "caption2", "caption3"]}`;

      console.log("Calling Gemini API...");

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 1, maxOutputTokens: 2048 },
          }),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini error:", errorText);
        throw new Error("Gagal menghubungi AI (Status: " + response.status + ")");
      }

      const data = await response.json();
      console.log("Response data:", data);

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Format jawaban AI tidak sesuai");

      let jsonText = text.replace(/```json?|```/g, "").trim();
      const parsed = JSON.parse(jsonText);

      if (parsed.captions && Array.isArray(parsed.captions)) {
        setGeneratedCaptions(parsed.captions);
        toast({ title: "Berhasil!", description: `${parsed.captions.length} caption siap` });
      } else {
        throw new Error("Format tidak valid");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Gagal", description: error instanceof Error ? error.message : "Error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (caption: string, index: number) => {
    await navigator.clipboard.writeText(caption);
    setCopiedIndex(index);
    toast({ title: "Disalin!" });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Generator Caption AI</h1>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Caption</CardTitle>
            <CardDescription>Isi form untuk menghasilkan caption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Deskripsi Konten *</Label>
              <Textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Contoh: promo diskon..." className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label>Gaya Bahasa</Label>
              <Select value={gayaBahasa} onValueChange={setGayaBahasa}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Ramah</SelectItem>
                  <SelectItem value="casual">Santai</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="professional">Profesional</SelectItem>
                  <SelectItem value="simplified">Sederhana</SelectItem>
                  <SelectItem value="direct">Langsung</SelectItem>
                  <SelectItem value="custom">Kustom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {gayaBahasa === "custom" && (
              <Textarea value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Jelaskan gaya..." />
            )}

            <div className="space-y-2">
              <Label>Panjang</Label>
              <RadioGroup value={panjangCaption} onValueChange={setPanjangCaption}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="pendek" id="pendek" />
                  <Label htmlFor="pendek" className="font-normal">Pendek</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sedang" id="sedang" />
                  <Label htmlFor="sedang" className="font-normal">Sedang</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="panjang" id="panjang" />
                  <Label htmlFor="panjang" className="font-normal">Panjang</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Hashtag</Label>
              <RadioGroup value={opsiHashtag} onValueChange={setOpsiHashtag}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="tanpa" id="tanpa" />
                  <Label htmlFor="tanpa" className="font-normal">Tanpa</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="seperlunya" id="seperlunya" />
                  <Label htmlFor="seperlunya" className="font-normal">Seperlunya</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="banyak" id="banyak" />
                  <Label htmlFor="banyak" className="font-normal">Banyak</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Emoji</Label>
              <RadioGroup value={opsiEmoji} onValueChange={setOpsiEmoji}>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="tanpa" id="e-tanpa" />
                  <Label htmlFor="e-tanpa" className="font-normal">Tanpa</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sedikit" id="e-sedikit" />
                  <Label htmlFor="e-sedikit" className="font-normal">Sedikit</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="banyak" id="e-banyak" />
                  <Label htmlFor="e-banyak" className="font-normal">Banyak</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleGenerate} disabled={isLoading || !deskripsi.trim()} className="w-full" size="lg">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Membuat...</> : <><Sparkles className="mr-2 h-4 w-4" />Buat Caption</>}
            </Button>
          </CardContent>
        </Card>

        {generatedCaptions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Hasil</h2>
            {generatedCaptions.map((caption, i) => (
              <Card key={i}>
                <CardHeader><CardTitle className="text-base">Opsi {i + 1}</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg text-sm">{caption}</div>
                  <Button variant="outline" onClick={() => handleCopy(caption, i)} className="w-full">
                    {copiedIndex === i ? <><Check className="mr-2 h-4 w-4" />Tersalin</> : <><Copy className="mr-2 h-4 w-4" />Salin</>}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
