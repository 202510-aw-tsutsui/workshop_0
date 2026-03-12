document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#payment-form");
  const paymentInputs = document.querySelectorAll('input[name="payment"]');
  const creditFields = document.querySelector("#credit-fields");
  const ccNumber = document.querySelector("#cc-number");
  const ccExp = document.querySelector("#cc-exp");
  const ccCvc = document.querySelector("#cc-cvc");
  const ccName = document.querySelector("#cc-name");

  if (!form) return;

  function toggleCreditFields() {
    const selected = Array.from(paymentInputs).find((input) => input.checked);
    const show = selected && selected.value === "credit-card";

    if (creditFields) {
      creditFields.hidden = !show;
    }
  }

  paymentInputs.forEach((input) => {
    input.addEventListener("change", toggleCreditFields);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = Array.from(paymentInputs).find((input) => input.checked);
    if (!selected) {
      alert("お支払い方法を選択してください。");
      return;
    }

    if (selected.value === "credit-card") {
      const hasEmpty =
        !ccNumber?.value.trim() ||
        !ccExp?.value.trim() ||
        !ccCvc?.value.trim() ||
        !ccName?.value.trim();

      if (hasEmpty) {
        alert("クレジットカード情報を入力してください。");
        return;
      }
    }

    alert("確認画面へ進みます。");
  });

  toggleCreditFields();
});
