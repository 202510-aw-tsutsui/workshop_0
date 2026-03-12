document.addEventListener("DOMContentLoaded", () => {
  const backTopBtn = document.querySelector("#back-top-btn");

  if (!backTopBtn) return;

  backTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
