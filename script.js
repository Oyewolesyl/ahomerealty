const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const galleryMain = document.querySelector("[data-gallery-main]");
const thumbs = [...document.querySelectorAll("[data-gallery]")];
const themeButton = document.querySelector("[data-theme-toggle]");
const logos = [...document.querySelectorAll("[data-logo]")];

const setTheme = (mode) => {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);
  themeButton?.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  if (themeButton) themeButton.textContent = isLight ? "Dark" : "Light";
  logos.forEach((logo) => {
    logo.src = isLight ? logo.dataset.lightLogo : logo.dataset.darkLogo;
  });
  localStorage.setItem("ahome-theme", mode);
};

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

setTheme(localStorage.getItem("ahome-theme") || "dark");

themeButton?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    if (!galleryMain) return;
    galleryMain.src = thumb.dataset.gallery;
    thumbs.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
  });
});
