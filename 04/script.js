document.addEventListener("DOMContentLoaded", () => {
  const stepEls = Array.from(document.querySelectorAll(".step"));
  const panels = Array.from(document.querySelectorAll(".flow-panel"));
  const reservationForm = document.querySelector("#reservation-form");
  const paymentForm = document.querySelector("#payment-form");
  const paymentInputs = Array.from(document.querySelectorAll('input[name="payment"]'));
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
    note: document.querySelector("#note"),
    policyCheck: document.querySelector("#policy-check")
  };

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

  const paymentSummaryDate = document.querySelector("#payment-summary-date");
  const paymentSummaryPeople = document.querySelector("#payment-summary-people");
  const paymentSummaryEmail = document.querySelector("#payment-summary-email");
  const confirmPaymentPill = document.querySelector("#confirm-payment-pill");
  const completeDate = document.querySelector("#complete-date");
  const completePeople = document.querySelector("#complete-people");
  const completePayment = document.querySelector("#complete-payment");

  if (!reservationForm || !paymentForm) return;

  function goToStep(stepNumber) {
    stepEls.forEach((stepEl, index) => {
      const stepIndex = index + 1;
      stepEl.classList.toggle("active", stepIndex === stepNumber);
      stepEl.classList.toggle("is-complete", stepIndex < stepNumber);
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", Number(panel.dataset.panel) === stepNumber);
    });
  }

  function validateReservationForm() {
    const requiredValues = [
      fields.lastNameKana.value.trim(),
      fields.firstNameKana.value.trim(),
      fields.lastName.value.trim(),
      fields.firstName.value.trim(),
      fields.email.value.trim(),
      fields.emailConfirm.value.trim(),
      fields.tel.value.trim(),
      fields.reservationDate.value.trim(),
      fields.reservationTime.value.trim(),
      fields.people.value.trim()
    ];

    if (requiredValues.some((value) => !value)) {
      alert("必須項目を入力してください。");
      return false;
    }

    if (fields.email.value.trim() !== fields.emailConfirm.value.trim()) {
      alert("メールアドレスが一致しません。");
      return false;
    }

    if (!fields.policyCheck.checked) {
      alert("キャンセルポリシーに同意してください。");
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

  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateReservationForm()) {
      return;
    }

    updatePaymentSummary();
    goToStep(2);
  });

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = paymentInputs.find((input) => input.checked);
    if (!selected) {
      alert("お支払い方法を選択してください。");
      return;
    }

    updateConfirmation();
    goToStep(3);
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goToStep(Number(button.dataset.backStep));
    });
  });

  completeButton?.addEventListener("click", () => {
    goToStep(4);
  });

  goToStep(1);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuPanel = document.querySelector("#mobile-menu-panel");
  const mobileMenuLinks = Array.from(document.querySelectorAll(".mobile-menu-panel a"));

  if (!header || !mobileMenuToggle || !mobileMenuPanel) return;

  function closeMobileMenu() {
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuPanel.hidden = true;
    header.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuPanel.hidden = isOpen;
    header.classList.toggle("menu-open", !isOpen);
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("click", (event) => {
    if (mobileMenuPanel.hidden) return;
    const target = event.target;
    if (!(target instanceof Node) || header.contains(target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMobileMenu();
  });
});
