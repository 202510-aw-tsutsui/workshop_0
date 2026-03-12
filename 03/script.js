document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#reserve-form");
  const policyCheck = document.querySelector("#policy-check");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (policyCheck && !policyCheck.checked) {
      alert("キャンセルポリシーへの同意が必要です。");
      return;
    }

    alert("次のステップへ進みます。");
  });
});
