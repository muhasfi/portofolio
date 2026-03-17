// ── THEME TOGGLE ────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themeBtnSm = document.getElementById("themeBtnSm");
const themeIcon = document.getElementById("themeIcon");
const themeIconSm = document.getElementById("themeIconSm");
const themeLabel = document.getElementById("themeLabel");

const saved = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", saved);
updateThemeUI(saved);

function setTheme(t) {
  html.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  updateThemeUI(t);
}
function updateThemeUI(t) {
  const isDark = t === "dark";
  if (themeIcon) themeIcon.textContent = isDark ? "☽" : "☀";
  if (themeIconSm) themeIconSm.textContent = isDark ? "☽" : "☀";
  if (themeLabel) themeLabel.textContent = isDark ? "Dark" : "Light";
}
themeBtn?.addEventListener("click", () =>
  setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark"),
);
themeBtnSm?.addEventListener("click", () =>
  setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark"),
);

// ── NAVBAR SCROLL ───────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 20);
});

// ── MOBILE MENU ─────────────────────────────────────
const menuBtn = document.getElementById("menuBtn");
const navDrawer = document.getElementById("navDrawer");
let drawerOpen = false;

menuBtn?.addEventListener("click", () => {
  drawerOpen = !drawerOpen;
  if (drawerOpen) {
    navDrawer.style.display = "block";
    requestAnimationFrame(() => navDrawer.classList.add("open"));
    menuBtn.textContent = "✕";
    menuBtn.classList.add("open");
  } else {
    closeDrawer();
  }
});

function closeDrawer() {
  drawerOpen = false;
  navDrawer.classList.remove("open");
  menuBtn.textContent = "☰";
  menuBtn.classList.remove("open");
  setTimeout(() => {
    if (!drawerOpen) navDrawer.style.display = "none";
  }, 250);
}

document.querySelectorAll(".drawer-link").forEach((a) => {
  a.addEventListener("click", closeDrawer);
});

// close on outside click
document.addEventListener("click", (e) => {
  if (
    drawerOpen &&
    !navDrawer.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    closeDrawer();
  }
});

// ── SCROLL REVEAL ───────────────────────────────────
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => io.observe(el));

// ── ACTIVE NAV LINK ─────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  // desktop links
  document.querySelectorAll(".nav-links a, .drawer-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});
