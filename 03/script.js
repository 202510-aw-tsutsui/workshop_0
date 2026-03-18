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
  const dateStatusMessage = document.querySelector("#date-status-message");
  const timeStatusMessage = document.querySelector("#time-status-message");

  const fields = {
    nameKana: document.querySelector("#name-kana"),
    name: document.querySelector("#name"),
    emailLocal: document.querySelector("#email-local"),
    emailDomain: document.querySelector("#email-domain"),
    emailDomainCustom: document.querySelector("#email-domain-custom"),
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
  const searchParams = new URLSearchParams(window.location.search);
  const adminReservationStorageKey = "inoriAdminReservations";
  const slotTimes = ["11:00", "13:00", "15:00"];
  const holidayDates = new Set([
    "2026-03-20",
    "2026-04-29",
    "2026-05-03",
    "2026-05-04",
    "2026-05-05",
    "2026-05-06",
    "2026-07-20",
    "2026-08-11",
    "2026-09-21",
    "2026-09-22",
    "2026-09-23",
    "2026-10-12",
    "2026-11-03",
    "2026-11-23",
    "2027-01-01",
    "2027-01-11",
    "2027-02-11",
    "2027-02-23",
    "2027-03-20"
  ]);

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

  function getEmailValue() {
    const local = fields.emailLocal?.value.trim() || "";
    const domain = fields.emailDomain?.value === "other"
      ? fields.emailDomainCustom?.value.trim() || ""
      : fields.emailDomain?.value.trim() || "";
    return local && domain ? `${local}@${domain}` : "";
  }

  function syncEmailDomainInput() {
    if (!fields.emailDomain || !fields.emailDomainCustom) return;
    fields.emailDomainCustom.classList.toggle("hidden", fields.emailDomain.value !== "other");
  }

  function applyEmailToFields(email) {
    if (!email || !fields.emailLocal || !fields.emailDomain || !fields.emailDomainCustom) return;

    const atIndex = email.indexOf("@");
    if (atIndex < 0) {
      fields.emailLocal.value = email;
      fields.emailDomain.value = "gmail.com";
      fields.emailDomainCustom.value = "";
      syncEmailDomainInput();
      return;
    }

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);
    const knownDomains = Array.from(fields.emailDomain.options).map((option) => option.value);

    fields.emailLocal.value = localPart;
    if (knownDomains.includes(domainPart)) {
      fields.emailDomain.value = domainPart;
      fields.emailDomainCustom.value = "";
    } else {
      fields.emailDomain.value = "other";
      fields.emailDomainCustom.value = domainPart;
    }

    syncEmailDomainInput();
  }

  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function isHoliday(date) {
    return holidayDates.has(formatDateKey(date));
  }

  function isReservableDate(date) {
    const day = date.getDay();
    return day === 0 || day === 6 || isHoliday(date);
  }

  function getSlotStatus(dateKey, slotIndex) {
    const seed = Array.from(`${dateKey}-${slotIndex}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const statusIndex = seed % 6;

    if (statusIndex === 0) {
      return "full";
    }

    if (statusIndex <= 2) {
      return "few";
    }

    return "available";
  }

  function syncReservationAvailability() {
    if (!fields.reservationDate || !fields.reservationTime) return;

    const dateValue = fields.reservationDate.value;
    const previousValue = fields.reservationTime.value;
    fields.reservationTime.innerHTML = '<option value="">選択してください</option>';

    if (dateStatusMessage) {
      dateStatusMessage.textContent = "";
    }
    if (timeStatusMessage) {
      timeStatusMessage.textContent = "";
    }

    if (!dateValue) {
      fields.reservationTime.disabled = true;
      return;
    }

    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime()) || !isReservableDate(date)) {
      if (dateStatusMessage) {
        dateStatusMessage.textContent = "この日は予約対象外です。サイトのスケジュールから空き日をご確認ください。";
      }
      if (timeStatusMessage) {
        timeStatusMessage.textContent = "予約可能な日付を選択すると時間を表示します。";
      }
      fields.reservationTime.disabled = true;
      return;
    }

    const statuses = slotTimes.map((time, index) => ({ time, status: getSlotStatus(dateValue, index) }));
    const availableSlots = statuses.filter((slot) => slot.status !== "full");

    if (availableSlots.length === 0) {
      if (dateStatusMessage) {
        dateStatusMessage.textContent = "この日は空きがありません。別の日程を選択してください。";
      }
      if (timeStatusMessage) {
        timeStatusMessage.textContent = "空きのある時間がありません。";
      }
      fields.reservationTime.disabled = true;
      return;
    }

    fields.reservationTime.disabled = false;
    statuses.forEach((slot) => {
      const option = document.createElement("option");
      option.value = slot.time;
      option.textContent = slot.status === "few" ? `${slot.time}（残り僅か）` : slot.time;
      option.disabled = slot.status === "full";
      if (slot.time === previousValue) {
        option.selected = true;
      }
      fields.reservationTime.appendChild(option);
    });

    const hasMatchingAvailableTime = availableSlots.some((slot) => slot.time === previousValue);
    if (!hasMatchingAvailableTime) {
      fields.reservationTime.value = "";
    }

    if (dateStatusMessage) {
      dateStatusMessage.textContent = availableSlots.length === slotTimes.length
        ? ""
        : "一部の時間帯は満席、または残り僅かです。";
    }
  }

  function validateStepOne() {
    if (!fields.name.value.trim() || !getEmailValue() || !fields.reservationDate.value.trim() || !fields.reservationTime.value.trim() || !fields.people.value.trim()) {
      alert("お名前、メールアドレス、日程、時間、参加人数を入力してください。");
      return false;
    }

    const date = new Date(`${fields.reservationDate.value}T00:00:00`);
    if (Number.isNaN(date.getTime()) || !isReservableDate(date)) {
      if (dateStatusMessage) {
        dateStatusMessage.textContent = "この日は予約対象外です。";
      }
      alert("予約可能な日付を選択してください。");
      return false;
    }

    const selectedTimeIndex = slotTimes.indexOf(fields.reservationTime.value);
    if (selectedTimeIndex < 0 || getSlotStatus(fields.reservationDate.value, selectedTimeIndex) === "full") {
      if (timeStatusMessage) {
        timeStatusMessage.textContent = "選択した時間は空きがありません。";
      }
      alert("空きのある時間を選択してください。");
      return false;
    }

    return true;
  }

  function updatePaymentSummary() {
    if (paymentSummaryDate) {
      paymentSummaryDate.textContent = `${fields.reservationDate.value.trim() || "未入力"} ${fields.reservationTime.value.trim() || ""}`.trim();
    }
    if (paymentSummaryPeople) {
      paymentSummaryPeople.textContent = fields.people.value.trim() || "未入力";
    }
    if (paymentSummaryEmail) {
      paymentSummaryEmail.textContent = getEmailValue() || "未入力";
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

    confirmFields.nameKana.textContent = fields.nameKana.value.trim() || "なし";
    confirmFields.name.textContent = fields.name.value.trim();
    confirmFields.email.textContent = getEmailValue();
    confirmFields.tel.textContent = fields.tel.value.trim() || "なし";
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

  function loadAdminReservations() {
    try {
      const raw = localStorage.getItem(adminReservationStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveReservationToAdmin() {
    const selected = paymentInputs.find((input) => input.checked);
    const reservations = loadAdminReservations();
    const noteParts = [];

    if (fields.note.value.trim()) {
      noteParts.push(fields.note.value.trim());
    }

    if (selected) {
      noteParts.push(`支払方法: ${selected.value}`);
    }

    reservations.unshift({
      id: Date.now(),
      name: fields.name.value.trim(),
      email: getEmailValue(),
      phone: fields.tel.value.trim(),
      date: fields.reservationDate.value,
      time: fields.reservationTime.value,
      people: fields.people.value.trim(),
      status: "予約確定",
      note: noteParts.join(" / ") || "Web予約"
    });

    localStorage.setItem(adminReservationStorageKey, JSON.stringify(reservations));
    sessionStorage.removeItem("inoriReservationDraft");
  }

  function applyReservationDraft() {
    const draftRaw = sessionStorage.getItem("inoriReservationDraft");
    if (!draftRaw) {
      return false;
    }

    try {
      const draft = JSON.parse(draftRaw);
      Object.entries(fields).forEach(([key, field]) => {
        if (key === "emailLocal" || key === "emailDomain" || key === "emailDomainCustom") return;
        if (field && typeof draft[key] === "string") {
          field.value = draft[key];
        }
      });
      if (typeof draft.email === "string") {
        applyEmailToFields(draft.email);
      }
      updatePaymentSummary();
      return true;
    } catch {
      return false;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (policyCheck && !policyCheck.checked) {
      alert("キャンセルポリシーへの同意が必要です。");
      return;
    }

    if (!validateStepOne()) {
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
    saveReservationToAdmin();
    goToStep(4);
  });

  fields.reservationDate?.addEventListener("change", syncReservationAvailability);
  fields.emailDomain?.addEventListener("change", syncEmailDomainInput);
  fields.reservationTime?.addEventListener("change", () => {
    if (!fields.reservationDate.value || !fields.reservationTime.value || !timeStatusMessage) return;
    const timeIndex = slotTimes.indexOf(fields.reservationTime.value);
    timeStatusMessage.textContent = timeIndex >= 0 && getSlotStatus(fields.reservationDate.value, timeIndex) === "few"
      ? "この時間は残り僅かです。"
      : "";
  });

  syncPaymentDetails();
  syncEmailDomainInput();
  const hasDraft = applyReservationDraft();
  syncReservationAvailability();
  goToStep(hasDraft && searchParams.get("step") === "2" ? 2 : 1);
});
