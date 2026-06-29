const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const galleryMain = document.querySelector("[data-gallery-main]");
const thumbs = [...document.querySelectorAll("[data-gallery]")];

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
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
