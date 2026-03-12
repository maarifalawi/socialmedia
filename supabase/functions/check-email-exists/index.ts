import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckEmailRequest {
  email: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: CheckEmailRequest = await req.json();

    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes("@") || normalizedEmail.length > 255) {
      return new Response(JSON.stringify({ error: "Email tidak valid" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!url || !serviceKey) {
      return new Response(JSON.stringify({ error: "Konfigurasi server belum lengkap" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use GoTrue Admin API directly to avoid supabase-js typing differences in Deno.
    const endpoint = `${url}/auth/v1/admin/users?email=${encodeURIComponent(normalizedEmail)}`;

    const resp = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Admin API error:", resp.status, text);
      return new Response(JSON.stringify({ error: "Gagal cek email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const users = Array.isArray(data?.users) ? data.users : Array.isArray(data) ? data : [];
    const exists = users.length > 0;

    return new Response(JSON.stringify({ exists }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("check-email-exists error:", error);
    return new Response(JSON.stringify({ error: error?.message ?? "Terjadi kesalahan" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

