document.addEventListener("DOMContentLoaded", () => {
  const selectedReservationStorageKey = "inoriSelectedReservation";
  const adminReservationStorageKey = "inoriAdminReservations";
  const editForm = document.querySelector("#edit-reservation-form");
  const editCompleteCard = document.querySelector("#edit-complete-card");
  const editMessage = document.querySelector("#edit-message");
  const fields = {
    reservationCode: document.querySelector("#edit-reservation-code"),
    lastNameKana: document.querySelector("#edit-last-name-kana"),
    firstNameKana: document.querySelector("#edit-first-name-kana"),
    lastName: document.querySelector("#edit-last-name"),
    firstName: document.querySelector("#edit-first-name"),
    email: document.querySelector("#edit-email"),
    tel: document.querySelector("#edit-tel"),
    date: document.querySelector("#edit-date"),
    time: document.querySelector("#edit-time"),
    people: document.querySelector("#edit-people"),
    note: document.querySelector("#edit-note")
  };

  function getReservationCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return String(params.get("code") || "").trim().toUpperCase();
  }

  function loadReservations() {
    try {
      const raw = localStorage.getItem(adminReservationStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveReservations(items) {
    localStorage.setItem(adminReservationStorageKey, JSON.stringify(items));
  }

  function splitName(value) {
    const [lastName = "", firstName = ""] = String(value || "").trim().split(/\s+/, 2);
    return { lastName, firstName };
  }

  function composeName(lastName, firstName) {
    return [lastName, firstName].filter(Boolean).join(" ");
  }

  function loadSelectedReservation() {
    const targetCode = getReservationCodeFromUrl();

    try {
      const raw = sessionStorage.getItem(selectedReservationStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const code = String(parsed?.reservationCode || parsed?.id || "").trim().toUpperCase();
        if (!targetCode || code === targetCode) {
          return parsed;
        }
      }
    } catch {
      // noop
    }

    if (!targetCode) return null;
    return loadReservations().find((item) => String(item.reservationCode || item.id || "").trim().toUpperCase() === targetCode) || null;
  }

  function populateForm(item) {
    const kana = splitName(item.nameKana);
    const name = splitName(item.name);

    fields.reservationCode.value = item.reservationCode || "";
    fields.lastNameKana.value = kana.lastName;
    fields.firstNameKana.value = kana.firstName;
    fields.lastName.value = name.lastName;
    fields.firstName.value = name.firstName;
    fields.email.value = item.email || "";
    fields.tel.value = item.phone || "";
    fields.date.value = item.date || "";
    fields.time.value = item.time || "11:00";
    fields.people.value = item.people || "";
    fields.note.value = item.note || "";
  }

  function validate() {
    const requiredValues = [
      fields.lastNameKana.value.trim(),
      fields.firstNameKana.value.trim(),
      fields.lastName.value.trim(),
      fields.firstName.value.trim(),
      fields.email.value.trim(),
      fields.date.value.trim(),
      fields.time.value.trim(),
      fields.people.value.trim()
    ];

    if (requiredValues.some((value) => !value)) {
      editMessage.textContent = "必須項目を入力してください。";
      return false;
    }

    editMessage.textContent = "";
    return true;
  }

  const selectedReservation = loadSelectedReservation();
  if (!selectedReservation) {
    editMessage.textContent = "対象のご予約情報が見つかりませんでした。ご予約確認画面からやり直してください。";
    editForm?.classList.add("hidden");
    return;
  }

  populateForm(selectedReservation);

  editForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const nextItem = {
      ...selectedReservation,
      reservationCode: fields.reservationCode.value.trim(),
      nameKana: composeName(fields.lastNameKana.value.trim(), fields.firstNameKana.value.trim()),
      name: composeName(fields.lastName.value.trim(), fields.firstName.value.trim()),
      email: fields.email.value.trim(),
      phone: fields.tel.value.trim(),
      date: fields.date.value,
      time: fields.time.value,
      people: fields.people.value,
      note: fields.note.value.trim()
    };

    const reservations = loadReservations();
    const reservationCode = String(nextItem.reservationCode || "").trim();
    const existingIndex = reservations.findIndex((item) => String(item.reservationCode || "").trim() === reservationCode);

    if (existingIndex >= 0) {
      reservations[existingIndex] = { ...reservations[existingIndex], ...nextItem };
    } else {
      reservations.unshift(nextItem);
    }

    saveReservations(reservations);
    sessionStorage.setItem(selectedReservationStorageKey, JSON.stringify(nextItem));
    editForm.classList.add("hidden");
    editCompleteCard?.classList.remove("hidden");
  });
});
