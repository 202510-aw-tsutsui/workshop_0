document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#reserve-form");
  const policyCheck = document.querySelector("#policy-check");
  const paymentForm = document.querySelector("#payment-form");
  const paymentInputs = Array.from(document.querySelectorAll('input[name="payment"]'));
  const paymentDetails = Array.from(document.querySelectorAll("[data-payment-detail]"));
  const steps = Array.from(document.querySelectorAll(".step"));
  const panels = Array.from(document.querySelectorAll(".flow-panel"));
  const backButtons = Array.from(document.querySelectorAll("[data-back-step]"));
  const completeButton = document.querySelector("#complete-btn");

  const fields = {
    lastNameKana: document.querySelector("#last-name-kana"),
    firstNameKana: document.querySelector("#first-name-kana"),
    lastName: document.querySelector("#last-name"),
    firstName: document.querySelector("#first-name"),
    email: document.querySelector("#email"),
    emailConfirm: document.querySelector("#email-confirm"),
    tel: document.querySelector("#tel"),
    reservationDate: document.querySelector("#reservation-date"),
    reservationTime: document.querySelector("#reservation-time"),
    people: document.querySelector("#people"),
    note: document.querySelector("#note")
  };

  const paymentSummaryDate = document.querySelector("#payment-summary-date");
  const paymentSummaryPeople = document.querySelector("#payment-summary-people");
  const paymentSummaryEmail = document.querySelector("#payment-summary-email");

  const confirmFields = {
    nameKana: document.querySelector("#confirm-name-kana"),
    name: document.querySelector("#confirm-name"),
    email: document.querySelector("#confirm-email"),
    tel: document.querySelector("#confirm-tel"),
    date: document.querySelector("#confirm-date"),
    people: document.querySelector("#confirm-people"),
    payment: document.querySelector("#confirm-payment"),
    note: document.querySelector("#confirm-note")
  };

  const confirmPaymentPill = document.querySelector("#confirm-payment-pill");
  const completeDate = document.querySelector("#complete-date");
  const completePeople = document.querySelector("#complete-people");
  const completePayment = document.querySelector("#complete-payment");

  if (!form) return;

  function goToStep(stepNumber) {
    steps.forEach((step, index) => {
      const current = index + 1;
      step.classList.toggle("active", current === stepNumber);
      step.classList.toggle("is-complete", current < stepNumber);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", Number(panel.dataset.panel) === stepNumber);
    });
  }

  function updatePaymentSummary() {
    if (paymentSummaryDate) {
      paymentSummaryDate.textContent = `${fields.reservationDate.value.trim() || "未入力"} ${fields.reservationTime.value.trim() || ""}`.trim();
    }
    if (paymentSummaryPeople) {
      paymentSummaryPeople.textContent = fields.people.value.trim() || "未入力";
    }
    if (paymentSummaryEmail) {
      paymentSummaryEmail.textContent = fields.email.value.trim() || "未入力";
    }
  }

  function syncPaymentDetails() {
    const selected = paymentInputs.find((input) => input.checked);
    paymentDetails.forEach((detail) => {
      detail.classList.toggle("is-active", detail.dataset.paymentDetail === selected?.value);
    });
  }

  function validatePaymentDetail(selectedValue) {
    const requiredByPayment = {
      "Amazon Pay": [],
      "PayPay": [],
      "クレジットカード": ["#card-number", "#card-name", "#card-expiry-month", "#card-expiry-year", "#card-cvc"],
      "銀行振込": ["#bank-name", "#bank-account", "#bank-date"]
    };

    const requiredSelectors = requiredByPayment[selectedValue] || [];
    const hasEmpty = requiredSelectors.some((selector) => {
      const input = document.querySelector(selector);
      return !input || !input.value.trim();
    });

    if (hasEmpty) {
      alert("選択したお支払い方法の必要項目を入力してください。");
      return false;
    }

    return true;
  }

  function updateConfirmation() {
    const selected = paymentInputs.find((input) => input.checked);

    confirmFields.nameKana.textContent = `${fields.lastNameKana.value.trim()} ${fields.firstNameKana.value.trim()}`;
    confirmFields.name.textContent = `${fields.lastName.value.trim()} ${fields.firstName.value.trim()}`;
    confirmFields.email.textContent = fields.email.value.trim();
    confirmFields.tel.textContent = fields.tel.value.trim();
    confirmFields.date.textContent = `${fields.reservationDate.value.trim()} ${fields.reservationTime.value.trim()}`;
    confirmFields.people.textContent = fields.people.value.trim();
    confirmFields.payment.textContent = selected ? selected.value : "";
    confirmFields.note.textContent = fields.note.value.trim() || "なし";

    if (confirmPaymentPill) {
      confirmPaymentPill.textContent = selected ? `支払方法 ${selected.value}` : "支払方法 未選択";
    }
    if (completeDate) {
      completeDate.textContent = `${fields.reservationDate.value.trim()} ${fields.reservationTime.value.trim()}`;
    }
    if (completePeople) {
      completePeople.textContent = fields.people.value.trim();
    }
    if (completePayment) {
      completePayment.textContent = selected ? selected.value : "";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (policyCheck && !policyCheck.checked) {
      alert("キャンセルポリシーへの同意が必要です。");
      return;
    }

    updatePaymentSummary();
    goToStep(2);
  });

  paymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = paymentInputs.find((input) => input.checked);
    if (!selected) {
      alert("お支払い方法を選択してください。");
      return;
    }

    if (!validatePaymentDetail(selected.value)) {
      return;
    }

    updateConfirmation();
    goToStep(3);
  });

  paymentInputs.forEach((input) => {
    input.addEventListener("change", syncPaymentDetails);
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goToStep(Number(button.dataset.backStep));
    });
  });

  completeButton?.addEventListener("click", () => {
    goToStep(4);
  });

  syncPaymentDetails();
  goToStep(1);
});
