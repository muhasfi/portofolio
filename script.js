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

function setActive(id) {
  document.querySelectorAll(".nav-links a, .drawer-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + id);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0,
  },
);

sections.forEach((s) => observer.observe(s));

// Fix section terakhir (#contact) yang terlalu pendek
window.addEventListener("scroll", () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
  if (scrolledToBottom) {
    setActive("contact");
  }
});

(function () {
  var errPool = [
    "!",
    "?",
    "#",
    "@",
    "%",
    "&",
    "*",
    "$",
    "X",
    "Ø",
    "Σ",
    "▓",
    "░",
    "▒",
    "NaN",
    "0xF",
    "≠",
  ];
  var numPool = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  var stats = [
    { val: "1", sym: false, delay: 0 },
    { val: "5", sym: false, delay: 200 },
    { val: "5", sym: false, delay: 400 },
    { val: "∞", sym: true, delay: 600 },
  ];

  function runScramble(i) {
    var cfg = stats[i];
    var el = document.getElementById("v" + i);
    var stat = el.closest(".stat");
    if (!el || !stat) return;

    var duration = 1400;
    var startTime = null,
      lastFlip = 0,
      speed = 60;

    stat.classList.add("shaking");
    el.style.color = "var(--accent)";

    function tick(ts) {
      if (!startTime) startTime = ts;
      if (ts - startTime < duration) {
        if (ts - lastFlip > speed) {
          var pool = cfg.sym
            ? errPool
            : Math.random() < 0.45
              ? errPool
              : numPool;
          el.textContent = pool[Math.floor(Math.random() * pool.length)];
          speed = 35 + Math.random() * 80;
          lastFlip = ts;
        }
        requestAnimationFrame(tick);
      } else {
        el.textContent = cfg.val;
        el.style.color = "";
        stat.classList.remove("shaking");
      }
    }

    setTimeout(function () {
      requestAnimationFrame(tick);
    }, cfg.delay);
  }

  function runAll() {
    for (var i = 0; i < 4; i++) runScramble(i);
  }

  // Jalankan saat pertama kali about masuk viewport
  var aboutSection = document.querySelector("#about");
  var hasRun = false;
  var statObserver = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting && !hasRun) {
        hasRun = true;
        runAll();
      }
    },
    { threshold: 0.3 },
  );
  if (aboutSection) statObserver.observe(aboutSection);

  // Jalankan setiap kali link About diklik (navbar desktop + mobile drawer)
  document.querySelectorAll('a[href="#about"]').forEach(function (link) {
    link.addEventListener("click", function () {
      setTimeout(runAll, 400); // delay sedikit agar scroll selesai dulu
    });
  });
})();

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");
  const wrapper = document.getElementById("loadMoreWrapper");
  const limit = 4;

  // Sembunyikan kartu setelah index ke-3 (0-based)
  cards.forEach((card, i) => {
    if (i >= limit) {
      card.classList.add("hidden-card");
    }
  });

  // Jika total ≤ 4, sembunyikan tombol
  if (cards.length <= limit) {
    wrapper.style.display = "none";
  }
});

function loadMoreProjects() {
  const hiddenCards = document.querySelectorAll(".project-card.hidden-card");

  hiddenCards.forEach((card, i) => {
    card.classList.remove("hidden-card");
    card.style.animationDelay = `${i * 0.1}s`;
    card.classList.add("reveal-card");
  });

  // Sembunyikan tombol setelah semua tampil
  document.getElementById("loadMoreWrapper").style.display = "none";
}
