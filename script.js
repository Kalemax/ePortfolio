// Shows one tab at a time based on the URL hash (#intro, #about, ...).
// Project pages use #projects/<name> and keep the Projects tab highlighted.
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".nav a");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".menu-btn");

function showTab() {
  // Tabs use data-tab (not id) so the browser never jumps to an anchor
  const name = location.hash.slice(1);
  const target = document.querySelector(`.panel[data-tab="${CSS.escape(name)}"]`) || panels[0];
  const tab = target.dataset.tab;
  document.body.dataset.tab = tab; // lets CSS show the footer only on Intro

  panels.forEach((p) => {
    // Reloading a video's iframe stops it, so it doesn't keep playing after you leave the page
    if (p.classList.contains("active") && p !== target) {
      p.querySelectorAll("iframe").forEach((f) => { f.src = f.src; });
      p.querySelectorAll("video").forEach((v) => v.pause());
    }
    p.classList.toggle("active", p === target);
  });
  const navTab = target.dataset.parent || tab;
  document.body.classList.toggle("project-view", Boolean(target.dataset.parent)); // hides the sidebar
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + navTab));

  document.title = tab === "intro"
    ? "Kale Maxwell | ePortfolio"
    : `${target.dataset.title} | Kale Maxwell`;
  window.scrollTo(0, 0);
  closeMenu();
}

function closeMenu() {
  sidebar.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// Close the mobile menu when tapping outside it
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
});

window.addEventListener("hashchange", showTab);
showTab();
