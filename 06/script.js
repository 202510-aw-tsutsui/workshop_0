document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const policyCheck = document.querySelector("#policy-check");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email")?.value.trim() || "";
    const emailConfirm = document.querySelector("#email-confirm")?.value.trim() || "";

    if (!email || !emailConfirm) {
      alert("メールアドレスを入力してください。");
      return;
    }

    if (email !== emailConfirm) {
      alert("メールアドレスが一致しません。");
      return;
    }

    if (policyCheck && !policyCheck.checked) {
      alert("キャンセルポリシーに同意してください。");
      return;
    }

    alert("お問い合わせを送信しました。");
  });
});
