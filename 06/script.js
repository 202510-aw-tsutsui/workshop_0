document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const policyCheck = document.querySelector("#policy-check");
  const inquiryStorageKey = "inoriAdminInquiries";

  if (!form) return;

  function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function loadInquiries() {
    try {
      const raw = localStorage.getItem(inquiryStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastName = document.querySelector("#last-name")?.value.trim() || "";
    const firstName = document.querySelector("#first-name")?.value.trim() || "";
    const email = document.querySelector("#email")?.value.trim() || "";
    const emailConfirm = document.querySelector("#email-confirm")?.value.trim() || "";
    const tel = document.querySelector("#tel")?.value.trim() || "";
    const message = document.querySelector("#message")?.value.trim() || "";

    if (!lastName || !firstName || !email || !emailConfirm || !tel) {
      alert("お名前、メールアドレス、電話番号を入力してください。");
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

    const inquiries = loadInquiries();
    inquiries.unshift({
      id: Date.now(),
      name: `${lastName} ${firstName}`.trim(),
      email,
      phone: tel,
      date: getToday(),
      subject: "Webお問い合わせ",
      status: "未対応",
      message: message || "お問い合わせフォームから送信"
    });

    localStorage.setItem(inquiryStorageKey, JSON.stringify(inquiries));
    alert("お問い合わせを送信しました。");
    form.reset();
  });
});
