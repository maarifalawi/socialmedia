export const runtime = "nodejs";

interface CaptionRequest {
  deskripsi: string;
  gaya_bahasa: string;
  custom_style?: string;
  panjang_caption: string;
  opsi_hashtag: string;
  opsi_emoji: string;
  tujuan_caption?: string;
}

const styleDescriptions: Record<string, string> = {
  formal: "Bahasa formal, sopan, dan profesional seperti brand besar",
  friendly: "Bahasa ramah, hangat, seperti berbicara dengan teman dekat",
  casual: "Bahasa santai, rileks, seperti chatting dengan teman",
  professional: "Bahasa profesional namun tetap approachable",
  confident: "Bahasa percaya diri, tegas, authoritative tapi tidak arogan",
  academic: "Bahasa akademis, edukatif, untuk konten pembelajaran",
  simplified: "Bahasa sederhana, mudah dipahami siapa saja",
  vivid: "Bahasa deskriptif, penuh detail visual",
  empathetic: "Bahasa empatik, understanding",
  persuasive: "Bahasa persuasif, mengajak action",
  direct: "Bahasa langsung, to the point",
};

const lengthGuide: Record<string, string> = {
  pendek: "1-2 kalimat saja, concise dan impactful",
  sedang: "3-5 kalimat, cukup detail tapi tidak bertele-tele",
  panjang: "story-like dengan 6-10 kalimat, bercerita lebih dalam",
};

const hashtagGuide: Record<string, string> = {
  tanpa: "JANGAN gunakan hashtag sama sekali",
  seperlunya: "Gunakan 3-5 hashtag yang relevan",
  banyak: "Gunakan 10-15 hashtag yang relevan",
};

const emojiGuide: Record<string, string> = {
  tanpa: "JANGAN gunakan emoji sama sekali",
  sedikit: "Gunakan 2-4 emoji di tempat yang tepat",
  banyak: "Gunakan 5-10 emoji, tetap rapi",
};

const purposeGuide: Record<string, string> = {
  awareness: "Fokus untuk meningkatkan awareness dan branding",
  interaksi: "Ajak followers untuk berinteraksi",
  traffic: "Arahkan followers untuk klik link",
  konversi: "Fokus untuk konversi/penjualan",
};

export default async function handler(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body: CaptionRequest = await req.json();
    
    if (!body.deskripsi || body.deskripsi.trim() === "") {
      return new Response(JSON.stringify({ error: "Deskripsi konten wajib diisi" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY tidak dikonfigurasi" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemInstruction = `Kamu adalah asisten penulis caption Instagram untuk brand Indonesia. 
Buat caption yang enak dibaca, natural, dan relevan dengan deskripsi konten.
Caption dalam Bahasa Indonesia yang baik.`;

    const gayaBahasaDesc = body.gaya_bahasa === "custom"
      ? (body.custom_style || "gaya bebas")
      : (styleDescriptions[body.gaya_bahasa] || "gaya natural");

    const panjangDesc = lengthGuide[body.panjang_caption] || lengthGuide["sedang"];
    const hashtagDesc = hashtagGuide[body.opsi_hashtag] || hashtagGuide["seperlunya"];
    const emojiDesc = emojiGuide[body.opsi_emoji] || emojiGuide["sedikit"];
    const tujuanDesc = body.tujuan_caption && body.tujuan_caption !== "none"
      ? purposeGuide[body.tujuan_caption] || ""
      : "";

    const fullPrompt = `${systemInstruction}

Buat 3 caption Instagram berbeda:

DESKRIPSI: ${body.deskripsi}
GAYA: ${gayaBahasaDesc}
PANJANG: ${panjangDesc}
HASHTAG: ${hashtagDesc}
EMOJI: ${emojiDesc}
${tujuanDesc ? `TUJUAN: ${tujuanDesc}` : ""}

Output JSON: {"captions": ["caption1", "caption2", "caption3"]}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
          generationConfig: { temperature: 1, maxOutputTokens: 2048 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Gagal menghubungi AI" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      return new Response(JSON.stringify({ error: "Format jawaban AI tidak sesuai" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    let jsonText = generatedContent.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json?|```/g, "").trim();
    }

    let parsed = { captions: [] as string[] };
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return new Response(JSON.stringify({ error: "Gagal membaca hasil AI" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ captions: parsed.captions || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Terjadi kesalahan" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}