document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");

  if (reserveBtn) {
    reserveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("予約ページへ進みます。");
    });
  }
});
