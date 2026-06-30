const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const galleryMain = document.querySelector("[data-gallery-main]");
const thumbs = [...document.querySelectorAll("[data-gallery]")];
const themeButton = document.querySelector("[data-theme-toggle]");
const logos = [...document.querySelectorAll("[data-logo]")];
const buyArt = document.querySelector("[data-buy-art]");
const assetStatus = document.querySelector("[data-asset-status]");
const scrollTopButton = document.querySelector("[data-scroll-top]");

const setMenuOpen = (isOpen) => {
  document.body.classList.toggle("menu-open", isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  menuButton?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

const setTheme = (mode) => {
  const isLight = mode === "light";
  document.body.classList.toggle("light-mode", isLight);
  themeButton?.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  if (themeButton) themeButton.textContent = isLight ? "Dark" : "Light";
  logos.forEach((logo) => {
    logo.src = isLight ? logo.dataset.lightLogo : logo.dataset.darkLogo;
  });
  if (buyArt instanceof HTMLImageElement) {
    buyArt.src = isLight ? buyArt.dataset.lightSrc : buyArt.dataset.darkSrc;
  }
  localStorage.setItem("ahome-theme", mode);
};

menuButton?.addEventListener("click", () => {
  setMenuOpen(!document.body.classList.contains("menu-open"));
});

setTheme(localStorage.getItem("ahome-theme") || "dark");

themeButton?.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("menu-open")) return;
  if (event.target instanceof Node && (nav?.contains(event.target) || menuButton?.contains(event.target))) return;
  setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    if (!galleryMain) return;
    galleryMain.src = thumb.dataset.gallery;
    thumbs.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
  });
});

const mediaAssets = [...document.images, ...document.querySelectorAll("video")];
let loadedAssets = 0;

const markAssetLoaded = () => {
  loadedAssets += 1;
  if (assetStatus) {
    assetStatus.textContent = `Loading media ${Math.min(loadedAssets, mediaAssets.length)}/${mediaAssets.length}`;
  }
  if (loadedAssets >= mediaAssets.length) {
    assetStatus?.classList.add("is-hidden");
  }
};

if (mediaAssets.length === 0) {
  assetStatus?.classList.add("is-hidden");
} else {
  mediaAssets.forEach((asset) => {
    if (asset.complete || asset.readyState >= 2) {
      markAssetLoaded();
      return;
    }
    asset.addEventListener("load", markAssetLoaded, { once: true });
    asset.addEventListener("loadeddata", markAssetLoaded, { once: true });
    asset.addEventListener("error", markAssetLoaded, { once: true });
  });
}

window.addEventListener("scroll", () => {
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 700);
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
