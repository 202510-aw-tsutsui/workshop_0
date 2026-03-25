document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#reserve-form");
  const policyCheck = document.querySelector("#policy-check");
  const paymentForm = document.querySelector("#payment-form");
  const paymentPanel = document.querySelector('[data-panel="2"]');
  const paymentInputs = Array.from(document.querySelectorAll('input[name="payment"]'));
  const paymentDetails = Array.from(document.querySelectorAll("[data-payment-detail]"));
  const steps = Array.from(document.querySelectorAll(".step"));
  const panels = Array.from(document.querySelectorAll(".flow-panel"));
  const backButtons = Array.from(document.querySelectorAll("[data-back-step]"));
  const completeButton = document.querySelector("#complete-btn");
  const dateStatusMessage = document.querySelector("#date-status-message");
  const timeStatusMessage = document.querySelector("#time-status-message");
  const lookupForm = document.querySelector("#lookup-form");
  const lookupName = document.querySelector("#lookup-name");
  const lookupEmailLocal = document.querySelector("#lookup-email-local");
  const lookupEmailDomain = document.querySelector("#lookup-email-domain");
  const lookupEmailDomainCustom = document.querySelector("#lookup-email-domain-custom");
  const lookupTel = document.querySelector("#lookup-tel");
  const lookupResult = document.querySelector("#lookup-result");
  const lookupMessage = document.querySelector("#lookup-message");
  const lookupResultFields = {
    id: document.querySelector("#lookup-result-id"),
    name: document.querySelector("#lookup-result-name"),
    email: document.querySelector("#lookup-result-email"),
    tel: document.querySelector("#lookup-result-tel"),
    date: document.querySelector("#lookup-result-date"),
    people: document.querySelector("#lookup-result-people"),
    status: document.querySelector("#lookup-result-status"),
    note: document.querySelector("#lookup-result-note")
  };

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
  const completeReservationCode = document.querySelector("#complete-reservation-code");
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

    if (stepNumber === 2 && window.innerWidth <= 980) {
      paymentPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  function getLookupEmailValue() {
    const local = lookupEmailLocal?.value.trim() || "";
    const domain = lookupEmailDomain?.value === "other"
      ? lookupEmailDomainCustom?.value.trim() || ""
      : lookupEmailDomain?.value.trim() || "";
    return local && domain ? `${local}@${domain}` : "";
  }

  function syncLookupEmailDomainInput() {
    if (!lookupEmailDomain || !lookupEmailDomainCustom) return;
    lookupEmailDomainCustom.classList.toggle("hidden", lookupEmailDomain.value !== "other");
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

  function isPastDate(date) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return targetStart.getTime() < todayStart.getTime();
  }

  function getSlotDateTime(dateKey, time) {
    return new Date(`${dateKey}T${time}:00`);
  }

  function isPastSlot(dateKey, time) {
    const slotDateTime = getSlotDateTime(dateKey, time);
    return !Number.isNaN(slotDateTime.getTime()) && slotDateTime.getTime() <= Date.now();
  }

  function getSlotStatus(dateKey, slotIndex) {
    if (isPastSlot(dateKey, slotTimes[slotIndex])) {
      return "full";
    }

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

  function generateReservationCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";

    for (let index = 0; index < 6; index += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    const datePart = fields.reservationDate.value.replaceAll("-", "").slice(2) || String(Date.now()).slice(-6);
    return `INR-${datePart}-${suffix}`;
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
    if (Number.isNaN(date.getTime()) || isPastDate(date) || !isReservableDate(date)) {
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
    if (Number.isNaN(date.getTime()) || isPastDate(date) || !isReservableDate(date)) {
      if (dateStatusMessage) {
        dateStatusMessage.textContent = "この日は予約対象外です。";
      }
      alert("予約可能な日付を選択してください。");
      return false;
    }

    const selectedTimeIndex = slotTimes.indexOf(fields.reservationTime.value);
    if (selectedTimeIndex < 0 || isPastSlot(fields.reservationDate.value, fields.reservationTime.value) || getSlotStatus(fields.reservationDate.value, selectedTimeIndex) === "full") {
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

  function findReservationForLookup() {
    const reservations = loadAdminReservations();
    const name = lookupName?.value.trim() || "";
    const email = getLookupEmailValue();
    const tel = lookupTel?.value.trim() || "";

    if (!name || (!email && !tel)) {
      if (lookupMessage) {
        lookupMessage.textContent = "お名前と、メールアドレスまたは電話番号を入力してください。";
      }
      lookupResult?.classList.add("hidden");
      return;
    }

    const matched = reservations.find((item) => {
      const sameName = (item.name || "").trim() === name;
      const sameEmail = email && (item.email || "").trim() === email;
      const sameTel = tel && (item.phone || "").trim() === tel;
      return sameName && (sameEmail || sameTel);
    });

    if (!matched) {
      if (lookupMessage) {
        lookupMessage.textContent = "該当するご予約が見つかりませんでした。入力内容をご確認ください。";
      }
      lookupResult?.classList.add("hidden");
      return;
    }

    lookupResultFields.id.textContent = String(matched.id ?? "");
    lookupResultFields.name.textContent = matched.name || "未入力";
    lookupResultFields.email.textContent = matched.email || "未入力";
    lookupResultFields.tel.textContent = matched.phone || "未入力";
    lookupResultFields.date.textContent = `${matched.date || ""} ${matched.time || ""}`.trim() || "未入力";
    lookupResultFields.people.textContent = matched.people || "未入力";
    lookupResultFields.status.textContent = matched.status || "未入力";
    lookupResultFields.note.textContent = matched.note || "なし";
    lookupResult?.classList.remove("hidden");
    if (lookupMessage) {
      lookupMessage.textContent = "";
    }
  }

  function saveReservationToAdmin() {
    const selected = paymentInputs.find((input) => input.checked);
    const reservations = loadAdminReservations();
    const noteParts = [];
    const reservationCode = generateReservationCode();

    if (fields.note.value.trim()) {
      noteParts.push(fields.note.value.trim());
    }

    if (selected) {
      noteParts.push(`支払方法: ${selected.value}`);
    }

    reservations.unshift({
      id: Date.now(),
      reservationCode,
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
    return reservationCode;
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
    const reservationCode = saveReservationToAdmin();
    if (completeReservationCode) {
      completeReservationCode.textContent = reservationCode;
    }
    goToStep(4);
  });

  fields.reservationDate?.addEventListener("change", syncReservationAvailability);
  fields.emailDomain?.addEventListener("change", syncEmailDomainInput);
  lookupEmailDomain?.addEventListener("change", syncLookupEmailDomainInput);
  fields.reservationTime?.addEventListener("change", () => {
    if (!fields.reservationDate.value || !fields.reservationTime.value || !timeStatusMessage) return;
    const timeIndex = slotTimes.indexOf(fields.reservationTime.value);
    timeStatusMessage.textContent = timeIndex >= 0 && getSlotStatus(fields.reservationDate.value, timeIndex) === "few"
      ? "この時間は残り僅かです。"
      : "";
  });

  lookupForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    findReservationForLookup();
  });

  syncPaymentDetails();
  syncEmailDomainInput();
  syncLookupEmailDomainInput();
  const hasDraft = applyReservationDraft();
  syncReservationAvailability();
  goToStep(hasDraft && searchParams.get("step") === "2" ? 2 : 1);
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
