import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const config = window.YABISA_FIREBASE_CONFIG || {};
const configured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

let auth = null;
let provider = null;

function isMobileViewport() {
  return window.matchMedia?.("(max-width: 720px)").matches;
}

function setButtonState(message, disabled = false) {
  const button = document.querySelector("#googleLogin");
  if (!button) return;
  button.disabled = disabled;
  button.dataset.ready = configured ? "true" : "false";
  if (message) {
    const text = button.querySelector("[data-google-text]");
    if (text) text.textContent = message;
  }
}

function saveFirebaseSession(user) {
  window.YabisaAdminAuth?.login({
    name: user.displayName || user.email || "Admin YABISA",
    email: user.email || "",
    provider: "google"
  });
}

if (configured) {
  const app = initializeApp(config);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  getRedirectResult(auth)
    .then(result => {
      if (result?.user) {
        saveFirebaseSession(result.user);
        location.href = "admin.html";
      }
    })
    .catch(error => adminAuthToast(`Login Google gagal: ${error.message}`, false));

  onAuthStateChanged(auth, user => {
    if (user && location.pathname.endsWith("admin-login.html")) {
      saveFirebaseSession(user);
      location.href = "admin.html";
    }
  });

  setButtonState("Login melalui akun Google");
} else {
  setButtonState("Login Google belum dikonfigurasi", false);
}

window.yabisaGoogleSignIn = async function yabisaGoogleSignIn() {
  if (!configured || !auth || !provider) {
    adminAuthToast("Login Google belum aktif. Isi firebase-config.js dari Firebase Console terlebih dahulu.", false);
    return;
  }
  try {
    setButtonState("Menghubungkan ke Google...", true);
    if (isMobileViewport()) {
      await signInWithRedirect(auth, provider);
      return;
    }
    const result = await signInWithPopup(auth, provider);
    saveFirebaseSession(result.user);
    adminAuthToast("Login Google berhasil.");
    setTimeout(() => location.href = "admin.html", 500);
  } catch (error) {
    adminAuthToast(`Login Google gagal: ${error.message}`, false);
    setButtonState("Login melalui akun Google", false);
  }
};

window.yabisaFirebaseSignOut = async function yabisaFirebaseSignOut() {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch {
    // Logout lokal tetap dijalankan oleh admin-auth.js.
  }
};
