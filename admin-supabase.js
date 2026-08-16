import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const config = window.YABISA_SUPABASE_CONFIG || {};
const configured = Boolean(config.url && config.publishableKey);
const supabase = configured ? createClient(config.url, config.publishableKey) : null;

function userName(user) {
  return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "Admin YABISA";
}

function saveSupabaseSession(user) {
  if (!user) return;
  window.YabisaAdminAuth?.login({
    name: userName(user),
    email: user.email || "",
    provider: "supabase-email"
  });
}

function requireSupabase() {
  if (supabase) return true;
  adminAuthToast("Supabase belum aktif. Periksa supabase-config.js.", false);
  return false;
}

async function syncSupabaseSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    adminAuthToast(`Gagal membaca sesi Supabase: ${error.message}`, false);
    return null;
  }
  const user = data.session?.user;
  if (user) saveSupabaseSession(user);
  return user || null;
}

if (configured) {
  if (window.YabisaAdminAuth?.isLogoutPending?.()) {
    supabase.auth.signOut()
      .finally(() => {
        window.YabisaAdminAuth?.clearSupabaseStorage?.();
        window.YabisaAdminAuth?.clearLogoutPending?.();
      });
  } else {
    syncSupabaseSession().then(user => {
      if (user && location.pathname.endsWith("admin-login.html")) location.href = "admin.html";
    });
  }
}

window.yabisaSupabaseSignUp = async function yabisaSupabaseSignUp({ name, email, password }) {
  if (!requireSupabase()) return false;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }
    }
  });
  if (error) {
    adminAuthToast(`Daftar gagal: ${error.message}`, false);
    return false;
  }
  if (data.session?.user) {
    saveSupabaseSession(data.session.user);
    adminAuthToast("Akun admin berhasil dibuat.");
    setTimeout(() => location.href = "admin.html", 500);
    return true;
  }
  adminAuthToast("Akun dibuat. Silakan cek email untuk konfirmasi, lalu login kembali.");
  return true;
};

window.yabisaSupabaseSignIn = async function yabisaSupabaseSignIn({ email, password }) {
  if (!requireSupabase()) return false;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    adminAuthToast(`Login gagal: ${error.message}`, false);
    return false;
  }
  saveSupabaseSession(data.user);
  adminAuthToast("Login berhasil.");
  setTimeout(() => location.href = "admin.html", 500);
  return true;
};

window.yabisaSupabaseSignOut = async function yabisaSupabaseSignOut() {
  if (!supabase) return;
  await supabase.auth.signOut({ scope: "local" });
};
