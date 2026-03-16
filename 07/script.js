document.addEventListener("DOMContentLoaded", () => {
  const reserveBtn = document.querySelector(".reserve-btn");

  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      window.location.href = "../03/index.html#reservation";
    });
  }
});
