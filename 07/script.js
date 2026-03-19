document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");

  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      window.location.href = "../03/index.html#reservation";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuPanel = document.querySelector("#mobile-menu-panel");
  const mobileMenuLinks = Array.from(document.querySelectorAll(".mobile-menu-panel a"));

  if (!header || !mobileMenuToggle || !mobileMenuPanel) return;

  function closeMobileMenu() {
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuPanel.hidden = true;
    header.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuPanel.hidden = isOpen;
    header.classList.toggle("menu-open", !isOpen);
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("click", (event) => {
    if (mobileMenuPanel.hidden) return;
    const target = event.target;
    if (!(target instanceof Node) || header.contains(target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMobileMenu();
  });
});
