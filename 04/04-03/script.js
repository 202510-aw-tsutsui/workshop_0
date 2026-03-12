document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector("#next-btn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    alert("完了画面へ進みます。");
  });
});
