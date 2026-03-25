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
(function () {
  const roles = [
    "Laravel Developer",
    "Node.js Developer",
    "API Builder",
    "Database Designer",
    "System Builder",
    "Web Architect",
    "Problem Solver",
  ];

  let ri = 0;
  const el = document.getElementById("glitch-el");

  function formatText(text) {
    const len = text.length;

    const edge = 3; // jumlah huruf pinggir (bisa ubah ke 2 atau 3)

    const start = text.slice(0, edge);
    const middle = text.slice(edge, len - edge);
    const end = text.slice(len - edge);

    return `
      <span class="accent">${start}</span>${middle}<span class="accent">${end}</span>
    `;
  }

  function triggerGlitch(newText) {
    el.classList.add("is-glitching");

    setTimeout(() => {
      el.innerHTML = formatText(newText);
      el.setAttribute("data-text", newText);
      el.classList.remove("is-glitching");
    }, 250);
  }

  function glitchLoop() {
    triggerGlitch(roles[ri]);
    ri = (ri + 1) % roles.length;
    setTimeout(glitchLoop, 2800 + Math.random() * 800);
  }

  setTimeout(glitchLoop);
})();

function openRandomMeja(event) {
  event.preventDefault(); // supaya tidak langsung buka link

  // random angka 1–15
  const meja = Math.floor(Math.random() * 15) + 1;

  // buka link dengan meja random
  const url = `https://restoran-git-main-muhasfis-projects.vercel.app/menu?meja=${meja}`;
  window.open(url, "_blank");
}
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

// ── LOAD MORE PROJECTS ─────────────────────────────
(function () {
  const LIMIT_DESKTOP = 6;
  const LIMIT_MOBILE = 4;

  const cards = Array.from(
    document.querySelectorAll(".projects-grid .project-card"),
  );
  const wrapper = document.getElementById("loadMoreWrapper");
  const btn = document.getElementById("loadMoreBtn");
  const ghostPreview = document.getElementById("ghostCardsPreview");
  const ghostStack = document.getElementById("ghostStack");

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Build a ghost card from a real hidden project card
  function createGhostCard(sourceCard) {
    const ghost = document.createElement("div");
    ghost.className = "ghost-card";

    // Clone the image from source card
    const srcImg = sourceCard.querySelector(".project-img img");
    const srcPlaceholder = sourceCard.querySelector(".project-img-placeholder");

    const imgDiv = document.createElement("div");
    imgDiv.className = "ghost-card-img";

    if (srcImg) {
      const img = document.createElement("img");
      img.src = srcImg.src;
      img.alt = srcImg.alt || "";
      imgDiv.appendChild(img);
    } else if (srcPlaceholder) {
      // fallback: coloured block if no real image
      imgDiv.style.background = "var(--bg3)";
    }

    // Fake body skeleton
    const body = document.createElement("div");
    body.className = "ghost-card-body";
    body.innerHTML = `
      <div class="ghost-block num"></div>
      <div class="ghost-block title"></div>
      <div class="ghost-block line"></div>
      <div class="ghost-block line2"></div>`;

    ghost.appendChild(imgDiv);
    ghost.appendChild(body);
    return ghost;
  }

  // Rebuild ghost strip based on which cards are hidden
  function updateGhosts() {
    const hiddenCards = cards.filter((c) =>
      c.classList.contains("hidden-card"),
    );

    ghostStack.innerHTML = "";

    if (hiddenCards.length === 0) {
      ghostPreview.classList.remove("has-ghosts");
      return;
    }

    // Show max 3 ghost cards (first 3 hidden cards)
    const ghosts = Math.min(hiddenCards.length, 3);
    for (let i = 0; i < ghosts; i++) {
      ghostStack.appendChild(createGhostCard(hiddenCards[i]));
    }
    ghostPreview.classList.add("has-ghosts");
  }

  function applyLimit() {
    const limit = isMobile() ? LIMIT_MOBILE : LIMIT_DESKTOP;

    cards.forEach((card, i) => {
      if (i < limit) {
        card.classList.remove("hidden-card");
      } else {
        card.classList.add("hidden-card");
      }
    });

    const hasHidden = cards.some((c) => c.classList.contains("hidden-card"));
    wrapper.style.display = hasHidden ? "flex" : "none";

    btn.querySelector("span").textContent = "Tampilkan Lebih Banyak";
    btn.querySelector("svg").style.transform = "";
    btn.dataset.expanded = "false";

    updateGhosts();
  }

  function loadMoreProjects() {
    const isExpanded = btn.dataset.expanded === "true";

    if (isExpanded) {
      applyLimit();
    } else {
      cards.forEach((card) => {
        card.classList.remove("hidden-card");
        card.classList.add("reveal-card");
      });
      btn.querySelector("span").textContent = "Tampilkan Lebih Sedikit";
      btn.querySelector("svg").style.transform = "rotate(180deg)";
      btn.dataset.expanded = "true";
      updateGhosts(); // will hide ghosts since no hidden cards left
    }
  }

  window.loadMoreProjects = loadMoreProjects;

  applyLimit();

  // SESUDAH (fix)
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Jangan reset kalau sedang dalam state expanded
      if (btn.dataset.expanded !== "true") {
        applyLimit();
      }
    }, 200);
  });
})();

// ── TECH STACK MARQUEE ──────────────────────────────
(function () {
  const techs = [
    {
      name: "Laravel",
      svg: `<svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 264"><path d="m255.9 59.6.1 1.1v56.6c0 1.4-.8 2.8-2 3.5l-47.6 27.4v54.2c0 1.4-.7 2.8-2 3.5l-99.1 57-.7.4-.3.1c-.7.2-1.4.2-2.1 0l-.4-.1-.6-.3L2 206c-1.3-.8-2.1-2.2-2.1-3.6V32.7l.1-1.1.2-.4.3-.6.2-.4.4-.5.4-.3c.2 0 .3-.2.5-.3L51.6.6c1.3-.8 2.9-.8 4.1 0L105.3 29c.2 0 .3.2.4.3l.5.3c0 .2.2.4.3.5l.3.4.3.6.1.4.2 1v106l41.2-23.7V60.7c0-.4 0-.7.2-1l.1-.4.3-.7.3-.3.3-.5.5-.3.4-.4 49.6-28.5c1.2-.7 2.8-.7 4 0L254 57l.5.4.4.3.4.5.2.3c.2.2.2.5.3.7l.2.3Zm-8.2 55.3v-47l-17.3 10-24 13.7v47l41.3-23.7Zm-49.5 85v-47l-23.6 13.5-67.2 38.4v47.5l90.8-52.3ZM8.2 39.9V200l90.9 52.3v-47.5l-47.5-26.9-.4-.4c-.2 0-.3-.1-.4-.3l-.4-.4-.3-.4-.2-.5-.2-.5v-.6l-.2-.5V63.6L25.6 49.8l-17.3-10Zm45.5-31L12.4 32.8l41.3 23.7 41.2-23.7L53.7 8.9ZM75 157.3l24-13.8V39.8l-17.3 10-24 13.8v103.6l17.3-10ZM202.3 36.9 161 60.7l41.3 23.8 41.3-23.8-41.3-23.8Zm-4.1 54.7-24-13.8-17.3-10v47l24 13.9 17.3 10v-47Zm-95 106 60.6-34.5 30.2-17.3-41.2-23.8-47.5 27.4L62 174.3l41.2 23.3Z" fill="#FF2D20"/></svg>"`,
    },
    {
      name: "PHP",
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PHP</title><path fill="#777BB4" d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>`,
    },
    {
      name: "Node.js",
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Node.js</title><path fill="#83CD29" d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>`,
    },
    {
      name: "Express",
      svg: `<svg viewBox="0 0 32 32"><path fill="#fff" d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z"/></svg>`,
    },
    {
      name: "Vue.js",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#42B883" d="M78.8 10L64 35.4 49.2 10H0l64 110 64-110z"/><path fill="#35495E" d="M78.8 10L64 35.4 49.2 10H25.6L64 76l38.4-66z"/></svg>`,
    },
    {
      name: "PostgreSQL",
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL</title><path fill="#336791" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"/></svg>`,
    },
    {
      name: "MySQL",
      svg: `<svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 252"><path fill="#FFF" d="M236 194c-14 0-25 1-34 5-3 1-7 1-7 4l3 6c2 3 5 8 9 11l11 8 21 10 11 9 6 4-3-6-5-5c-5-7-11-13-18-18-6-3-18-9-20-15h-1l12-3 18-3 8-2v-2l-9-10c-8-8-18-15-28-22l-18-8c-2-1-6-2-7-4l-7-13-15-30-8-20c-18-30-38-48-68-65-6-4-14-5-22-7l-13-1-8-6C34 5 8-9 1 9c-5 11 7 22 11 28l9 13 3 9c3 8 5 17 9 24l6 10c2 2 4 3 5 6-3 4-3 9-4 13-7 20-4 44 5 59 2 4 9 14 18 10 8-3 6-13 8-22l1-4 8 14c5 9 14 18 22 24 4 3 8 8 13 10l-4-4-9-10c-8-10-14-21-20-32l-7-17-3-6c-3 4-7 7-9 12-3 7-3 17-4 26h-1c-6-1-8-7-10-12-5-12-6-32-1-46 1-4 6-15 4-19-1-3-4-5-6-7l-7-12-10-30-9-13c-3-5-7-8-10-14-1-2-2-5 0-7l2-2c2-2 9 0 11 1 6 3 12 5 17 9l8 6h4c6 1 12 0 17 2 9 3 18 7 25 12 23 14 42 35 54 59 3 4 3 8 5 12l12 26c4 8 7 16 12 23 3 4 14 6 18 8l12 4 18 12c2 2 11 7 12 10Z"/><path fill="#FFF" d="m58 43-7 1 6 7 4 9v-1c3-1 4-4 4-8l-2-4-5-4Z"/></svg>`,
    },
    {
      name: "Git",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F34F29" d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993L87.42 55.529c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.578 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.785-3.778-9.906 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.11c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.016-11.501z"/></svg>`,
    },
    {
      name: "GitHub",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/></svg>`,
    },
    {
      name: "Supabase",
      svg: `<svg viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M63.708 110.284c-2.86 3.601-8.953 1.628-9.081-2.94l-1.803-67.587h45.73c8.288 0 12.912 9.66 7.666 16.041L63.708 110.284z" fill="url(#sb1)"/><path d="M63.708 110.284c-2.86 3.601-8.953 1.628-9.081-2.94l-1.803-67.587h45.73c8.288 0 12.912 9.66 7.666 16.041L63.708 110.284z" fill="url(#sb2)" fill-opacity=".2"/><path d="M45.317 2.071C48.178-1.53 54.27.443 54.398 5.011l1.068 67.587H9.736c-8.288 0-12.912-9.66-7.666-16.041L45.317 2.071z" fill="#3ECF8E"/><defs><linearGradient id="sb1" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse"><stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/></linearGradient><linearGradient id="sb2" x1="36.156" y1="30.578" x2="54.399" y2="65.105" gradientUnits="userSpaceOnUse"><stop/><stop offset="1" stop-opacity="0"/></linearGradient></defs></svg>`,
    },
    {
      name: "JavaScript",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>`,
    },
    {
      name: "HTML",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.214-7.82.207-2.325 3.234-36.233.336-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`,
    },
    {
      name: "CSS",
      svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.128l-.277-3.108-.63-6.994-.331-3.729h35.158zm-.047 27.994v13.831H48.792l-.277-3.108-.631-6.994-.33-3.729h16.447z"/></svg>`,
    },
  ];

  const track = document.getElementById("marqueeTrack");
  const track2 = document.getElementById("marqueeTrack2");
  if (!track || !track2) return;

  const html = techs
    .map((t) => `<div class="tech-item">${t.svg}</div>`)
    .join("");

  track.innerHTML = html.repeat(3);
  track.style.animationDuration = techs.length * 2.6 + "s";

  track2.innerHTML = html.repeat(3);
  track2.style.animationDuration = techs.length * 2.6 + "s";

  // Pause on hover
  // track.addEventListener(
  //   "mouseenter",
  //   () => (track.style.animationPlayState = "paused"),
  // );
  // track.addEventListener(
  //   "mouseleave",
  //   () => (track.style.animationPlayState = "running"),
  // );
})();
