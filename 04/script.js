document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#payment-form");
  const paymentInputs = document.querySelectorAll('input[name="payment"]');

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = Array.from(paymentInputs).find((input) => input.checked);
    if (!selected) {
      alert("お支払い方法を選択してください。");
      return;
    }

    alert("確認画面へ進みます。");
  });
});
