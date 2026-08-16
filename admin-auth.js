const YABISA_ADMIN_SESSION_KEY = "yabisaAdminSession";
const YABISA_ADMIN_LOGOUT_KEY = "yabisaAdminLogoutPending";

function adminAuthToast(message, ok = true) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.background = ok ? "#172113" : "#8a2d21";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function adminReadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function adminWriteJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function adminIsLoggedIn() {
  const session = adminReadJson(YABISA_ADMIN_SESSION_KEY);
  return !adminIsLogoutPending() && Boolean(session?.loggedIn && session?.createdAt);
}

function adminRequireLogin() {
  if (!adminIsLoggedIn()) location.replace("admin-login.html");
}

function adminRedirectIfLoggedIn() {
  if (adminIsLoggedIn()) location.replace("admin.html");
}

function adminIsLogoutPending() {
  return localStorage.getItem(YABISA_ADMIN_LOGOUT_KEY) === "1";
}

function adminSetLogoutPending() {
  localStorage.setItem(YABISA_ADMIN_LOGOUT_KEY, "1");
}

function adminClearLogoutPending() {
  localStorage.removeItem(YABISA_ADMIN_LOGOUT_KEY);
}

function adminClearSupabaseStorage() {
  const clearFrom = storage => {
    if (!storage) return;
    Object.keys(storage).forEach(key => {
      const lower = key.toLowerCase();
      if (lower.startsWith("sb-") || lower.includes("supabase")) storage.removeItem(key);
    });
  };
  clearFrom(localStorage);
  clearFrom(sessionStorage);
}

function adminLogin(identity) {
  adminClearLogoutPending();
  adminWriteJson(YABISA_ADMIN_SESSION_KEY, {
    loggedIn: true,
    name: identity.name || identity.email || "Admin YABISA",
    email: identity.email || "",
    provider: identity.provider || "email",
    createdAt: new Date().toISOString()
  });
}

async function adminLogout() {
  adminSetLogoutPending();
  try {
    await window.yabisaSupabaseSignOut?.();
  } finally {
    localStorage.removeItem(YABISA_ADMIN_SESSION_KEY);
    adminClearSupabaseStorage();
    location.replace("admin-login.html?logged_out=1");
  }
}

function adminGetCurrentUser() {
  return adminReadJson(YABISA_ADMIN_SESSION_KEY);
}

window.YabisaAdminAuth = {
  require: adminRequireLogin,
  redirectIfLoggedIn: adminRedirectIfLoggedIn,
  login: adminLogin,
  logout: adminLogout,
  isLogoutPending: adminIsLogoutPending,
  clearLogoutPending: adminClearLogoutPending,
  clearSupabaseStorage: adminClearSupabaseStorage,
  currentUser: adminGetCurrentUser
};
