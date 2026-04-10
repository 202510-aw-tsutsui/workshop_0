document.addEventListener("DOMContentLoaded", () => {
  const selectedReservationStorageKey = "inoriSelectedReservation";
  const adminReservationStorageKey = "inoriAdminReservations";
  const detailCard = document.querySelector("#cancel-detail-card");
  const completeCard = document.querySelector("#cancel-complete-card");
  const cancelMessage = document.querySelector("#cancel-message");
  const cancelReason = document.querySelector("#cancel-reason");
  const cancelSubmitButton = document.querySelector("#cancel-submit-btn");
  const fields = {
    reservationCode: document.querySelector("#cancel-reservation-code"),
    name: document.querySelector("#cancel-name"),
    email: document.querySelector("#cancel-email"),
    date: document.querySelector("#cancel-date"),
    people: document.querySelector("#cancel-people"),
    status: document.querySelector("#cancel-status")
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

  function renderReservation(item) {
    fields.reservationCode.textContent = item.reservationCode || "未入力";
    fields.name.textContent = item.name || "未入力";
    fields.email.textContent = item.email || "未入力";
    fields.date.textContent = `${item.date || ""} ${item.time || ""}`.trim() || "未入力";
    fields.people.textContent = item.people || "未入力";
    fields.status.textContent = item.status || "未入力";
    detailCard?.classList.remove("hidden");
  }

  function persistCancellation(item) {
    const reservations = loadReservations();
    const reservationCode = String(item.reservationCode || "").trim();
    const reason = cancelReason?.value.trim() || "";
    const nextNote = [item.note, reason ? `キャンセル理由: ${reason}` : ""].filter(Boolean).join("\n");
    const nextItem = {
      ...item,
      status: "キャンセル",
      note: nextNote
    };

    const existingIndex = reservations.findIndex((entry) => String(entry.reservationCode || "").trim() === reservationCode);
    if (existingIndex >= 0) {
      reservations[existingIndex] = { ...reservations[existingIndex], ...nextItem };
    } else {
      reservations.unshift(nextItem);
    }

    saveReservations(reservations);
    sessionStorage.setItem(selectedReservationStorageKey, JSON.stringify(nextItem));
  }

  const selectedReservation = loadSelectedReservation();
  if (!selectedReservation) {
    cancelMessage.textContent = "対象のご予約情報が見つかりませんでした。ご予約確認画面からやり直してください。";
    return;
  }

  renderReservation(selectedReservation);

  cancelSubmitButton?.addEventListener("click", () => {
    persistCancellation(selectedReservation);
    detailCard?.classList.add("hidden");
    completeCard?.classList.remove("hidden");
    cancelMessage.textContent = "";
  });
});
