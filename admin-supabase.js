import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const config = window.YABISA_SUPABASE_CONFIG || {};
const configured = Boolean(config.url && config.publishableKey);
const supabase = configured ? createClient(config.url, config.publishableKey) : null;

function redirectUrl() {
  return new URL("admin-login.html", location.href).href;
}

function setGoogleButton(message, disabled = false) {
  const button = document.querySelector("#googleLogin");
  if (!button) return;
  button.disabled = disabled;
  button.dataset.ready = configured ? "true" : "false";
  const text = button.querySelector("[data-google-text]");
  if (text) text.textContent = message;
}

async function syncSupabaseSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    adminAuthToast(`Gagal membaca sesi Supabase: ${error.message}`, false);
    return null;
  }
  const user = data.session?.user;
  if (!user) return null;
  window.YabisaAdminAuth?.login({
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Admin YABISA",
    email: user.email || "",
    provider: "supabase-google"
  });
  return user;
}

if (configured) {
  setGoogleButton("Login melalui akun Google");
  syncSupabaseSession().then(user => {
    if (user && location.pathname.endsWith("admin-login.html")) location.href = "admin.html";
  });
} else {
  setGoogleButton("Login Supabase belum dikonfigurasi");
}

window.yabisaGoogleSignIn = async function yabisaGoogleSignIn() {
  if (!supabase) {
    adminAuthToast("Login Supabase belum aktif. Isi publishableKey di supabase-config.js terlebih dahulu.", false);
    return;
  }
  setGoogleButton("Menghubungkan ke Google...", true);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl(),
      queryParams: {
        prompt: "select_account"
      }
    }
  });
  if (error) {
    adminAuthToast(`Login Google gagal: ${error.message}`, false);
    setGoogleButton("Login melalui akun Google", false);
  }
};

window.yabisaSupabaseSignOut = async function yabisaSupabaseSignOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
};
