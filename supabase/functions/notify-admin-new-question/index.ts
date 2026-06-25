import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const APP_URL = Deno.env.get("APP_URL") ?? "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": APP_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  question_id: string;
  judul_pertanyaan: string;
  isi_pertanyaan: string;
  nama_penanya: string;
  nama_proyek: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ── Auth check ──────────────────────────────────────────────
  // Hanya request dengan JWT session valid yang boleh kirim notifikasi.
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const {
      question_id,
      judul_pertanyaan,
      isi_pertanyaan,
      nama_penanya,
      nama_proyek,
    }: NotificationRequest = await req.json();

    if (!question_id || !judul_pertanyaan || !isi_pertanyaan || !nama_penanya || !nama_proyek) {
      return new Response(JSON.stringify({ error: "Payload tidak lengkap" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending admin notification for question:", question_id);

    // ── Sanitize user input untuk cegah XSS di email ───────────
    const sanitize = (str: string): string =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br>");

    const safeTitle = sanitize(judul_pertanyaan);
    const safeBody = sanitize(isi_pertanyaan);
    const safeName = sanitize(nama_penanya);
    const safeProject = sanitize(nama_proyek);

    const adminEmail = Deno.env.get("ADMIN_EMAIL") ?? "maarifalaawi@gmail.com";
    const appBaseUrl = (Deno.env.get("SUPABASE_URL") ?? "").replace(".supabase.co", ".lovable.app");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
          Pertanyaan Baru Membutuhkan Jawaban
        </h2>
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4F46E5; margin-top: 0;">${safeTitle}</h3>
          <p style="color: #666; line-height: 1.6;">${safeBody}</p>
        </div>
        <div style="margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Ditanya oleh:</strong> ${safeName}</p>
          <p style="margin: 5px 0;"><strong>Proyek:</strong> ${safeProject}</p>
        </div>
        <div style="margin: 30px 0;">
          <a href="${appBaseUrl}/bantuan-admin"
             style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Kelola Pertanyaan
          </a>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          Email ini dikirim otomatis saat ada pertanyaan baru yang perlu dijawab.
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
        from: "Notifikasi Admin <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `Pertanyaan Baru: ${safeTitle}`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailResponse: emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in notify-admin-new-question function:", error);
    const message = error instanceof Error ? error.message : "Terjadi kesalahan";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
