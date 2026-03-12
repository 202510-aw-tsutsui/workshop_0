document.addEventListener("DOMContentLoaded", () => {
  const pagerLinks = document.querySelectorAll(".pager a");

  pagerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      pagerLinks.forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
