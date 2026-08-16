const YABISA_ADMIN_SESSION_KEY = "yabisaAdminSession";

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
  return Boolean(session?.loggedIn && session?.createdAt);
}

function adminRequireLogin() {
  if (!adminIsLoggedIn()) location.replace("admin-login.html");
}

function adminRedirectIfLoggedIn() {
  if (adminIsLoggedIn()) location.replace("admin.html");
}

function adminLogin(identity) {
  adminWriteJson(YABISA_ADMIN_SESSION_KEY, {
    loggedIn: true,
    name: identity.name || identity.email || "Admin YABISA",
    email: identity.email || "",
    provider: identity.provider || "email",
    createdAt: new Date().toISOString()
  });
}

async function adminLogout() {
  try {
    await window.yabisaSupabaseSignOut?.();
  } finally {
    localStorage.removeItem(YABISA_ADMIN_SESSION_KEY);
    location.href = "admin-login.html";
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
  currentUser: adminGetCurrentUser
};
