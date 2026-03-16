document.addEventListener("DOMContentLoaded", () => {
  const pagerLinks = Array.from(document.querySelectorAll(".pager a"));
  const pagerPrev = document.querySelector(".pager-btn.prev");
  const pagerNext = document.querySelector(".pager-btn.next");

  function setActivePage(index) {
    pagerLinks.forEach((link, linkIndex) => {
      link.classList.toggle("active", linkIndex === index);
    });

    if (pagerPrev) {
      pagerPrev.disabled = index === 0;
    }

    if (pagerNext) {
      pagerNext.disabled = index === pagerLinks.length - 1;
    }
  }

  pagerLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setActivePage(index);
    });
  });

  pagerPrev?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex > 0) {
      setActivePage(currentIndex - 1);
    }
  });

  pagerNext?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex < pagerLinks.length - 1) {
      setActivePage(currentIndex + 1);
    }
  });

  const initialIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
  setActivePage(initialIndex >= 0 ? initialIndex : 0);
});
