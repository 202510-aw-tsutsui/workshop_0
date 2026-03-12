document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;

    btn.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  const pagerLinks = document.querySelectorAll(".pager a");
  pagerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      pagerLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
