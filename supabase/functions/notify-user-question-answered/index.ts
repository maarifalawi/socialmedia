import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const APP_URL = Deno.env.get("APP_URL") ?? "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": APP_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  user_email: string;
  nama_penanya: string;
  judul_pertanyaan: string;
  isi_pertanyaan: string;
  jawaban: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ── Auth check ──────────────────────────────────────────────
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const {
      user_email,
      nama_penanya,
      judul_pertanyaan,
      isi_pertanyaan,
      jawaban,
    }: NotificationRequest = await req.json();

    if (!user_email || !judul_pertanyaan || !jawaban) {
      return new Response(JSON.stringify({ error: "Payload tidak lengkap" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending answer notification to:", user_email);

    // ── Sanitize user input ───────────────────────────────────
    const sanitize = (str: string): string =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br>");

    const safeName = sanitize(nama_penanya);
    const safeTitle = sanitize(judul_pertanyaan);
    const safeQuestion = sanitize(isi_pertanyaan);
    const safeAnswer = sanitize(jawaban);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Halo ${safeName}!</h2>
        <p style="color: #666;">Pertanyaan Anda telah dijawab oleh tim kami.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Pertanyaan Anda:</h3>
          <p style="color: #555; font-weight: bold;">${safeTitle}</p>
          <p style="color: #666;">${safeQuestion}</p>
        </div>
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4caf50;">
          <h3 style="color: #2e7d32; margin-top: 0;">Jawaban:</h3>
          <p style="color: #333;">${safeAnswer}</p>
        </div>
        <p style="color: #666; margin-top: 20px;">
          Silakan kembali ke aplikasi untuk melihat jawaban lengkap dan memberikan rating.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Email ini dikirim secara otomatis, mohon tidak membalas email ini.
        </p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Support <onboarding@resend.dev>",
        to: [user_email],
        subject: `Pertanyaan Anda "${safeTitle}" telah dijawab!`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in notify-user-question-answered function:", error);
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
