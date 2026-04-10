document.addEventListener("DOMContentLoaded", () => {
  const lookupForm = document.querySelector("#lookup-form");
  const lookupCode = document.querySelector("#lookup-code");
  const lookupLastName = document.querySelector("#lookup-last-name");
  const lookupFirstName = document.querySelector("#lookup-first-name");
  const lookupResult = document.querySelector("#lookup-result");
  const lookupResultLead = document.querySelector("#lookup-result-lead");
  const lookupMessage = document.querySelector("#lookup-message");
  const lookupCancelButton = document.querySelector("#lookup-cancel-btn");
  const lookupEditButton = document.querySelector("#lookup-edit-btn");
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

  const adminReservationStorageKey = "inoriAdminReservations";
  const selectedReservationStorageKey = "inoriSelectedReservation";
  const reservationSeed = [
    { id: 1, reservationCode: "INR-260318-HN4K8P", name: "山田 花", email: "hana@example.com", phone: "090-1111-2222", date: "2026-03-18", time: "11:00", people: 2, status: "予約確定", note: "記念日利用。写真撮影希望。" },
    { id: 2, reservationCode: "INR-260318-KT7M2Q", name: "佐藤 健太", email: "kenta@example.com", phone: "080-4321-8765", date: "2026-03-18", time: "13:00", people: 3, status: "仮予約", note: "PayPay予定。" },
    { id: 3, reservationCode: "INR-260319-MS5R9L", name: "鈴木 美咲", email: "misaki@example.com", phone: "070-9988-2211", date: "2026-03-19", time: "15:00", people: 2, status: "予約確定", note: "香り相談あり。" },
    { id: 4, reservationCode: "INR-260320-YT3W6N", name: "田中 悠斗", email: "yuto@example.com", phone: "090-5432-3456", date: "2026-03-20", time: "11:00", people: 1, status: "キャンセル", note: "前日キャンセル。" },
    { id: 5, reservationCode: "INR-260320-RK8P4S", name: "高橋 莉子", email: "riko@example.com", phone: "080-4567-1234", date: "2026-03-20", time: "13:00", people: 4, status: "確認待ち", note: "団体利用。" },
    { id: 6, reservationCode: "INR-260321-AO6X1C", name: "伊藤 蒼", email: "ao@example.com", phone: "070-8765-2345", date: "2026-03-21", time: "11:00", people: 2, status: "予約確定", note: "Amazon Pay。" }
  ];

  if (!lookupForm) return;

  function composeLookupName() {
    const lastName = lookupLastName?.value.trim() || "";
    const firstName = lookupFirstName?.value.trim() || "";
    return [lastName, firstName].filter(Boolean).join(" ");
  }

  function loadReservations() {
    try {
      const raw = localStorage.getItem(adminReservationStorageKey);
      if (!raw) return [...reservationSeed];

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...reservationSeed];

      const merged = [...reservationSeed];
      parsed.forEach((item) => {
        if (!item || typeof item !== "object") return;
        const index = merged.findIndex((seedItem) => seedItem.id === item.id);
        if (index >= 0) {
          merged[index] = { ...merged[index], ...item };
        } else {
          merged.unshift(item);
        }
      });
      return merged;
    } catch {
      return [...reservationSeed];
    }
  }

  function showLookupResult(item) {
    lookupResultLead?.classList.remove("hidden");
    lookupResultFields.id.textContent = item.reservationCode || String(item.id ?? "");
    lookupResultFields.name.textContent = item.name || "未入力";
    lookupResultFields.email.textContent = item.email || "未入力";
    lookupResultFields.tel.textContent = item.phone || "未入力";
    lookupResultFields.date.textContent = `${item.date || ""} ${item.time || ""}`.trim() || "未入力";
    lookupResultFields.people.textContent = item.people || "未入力";
    lookupResultFields.status.textContent = item.status || "未入力";
    lookupResultFields.note.textContent = item.note || "なし";
    lookupResult?.classList.remove("hidden");
    sessionStorage.setItem(selectedReservationStorageKey, JSON.stringify(item));
    if (lookupMessage) {
      lookupMessage.textContent = "";
    }
  }

  function moveToReservationActionPage(path) {
    const selectedRaw = sessionStorage.getItem(selectedReservationStorageKey);
    if (!selectedRaw) return;

    try {
      const selected = JSON.parse(selectedRaw);
      const reservationCode = String(selected.reservationCode || selected.id || "").trim();
      const target = reservationCode ? `${path}?code=${encodeURIComponent(reservationCode)}` : path;
      window.location.href = target;
    } catch {
      window.location.href = path;
    }
  }

  lookupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const reservationCode = lookupCode?.value.trim().toUpperCase() || "";
    const name = composeLookupName();

    if (!reservationCode || !name) {
      if (lookupMessage) {
        lookupMessage.textContent = "予約番号とお名前を入力してください。";
      }
      lookupResult?.classList.add("hidden");
      return;
    }

    const reservations = loadReservations();
    const matched = reservations.find((item) => {
      const sameCode = (item.reservationCode || String(item.id ?? "")).trim().toUpperCase() === reservationCode;
      const sameName = (item.name || "").trim() === name;
      return sameCode && sameName;
    });

    if (!matched) {
      if (lookupMessage) {
        lookupMessage.textContent = "該当するご予約が見つかりませんでした。入力内容をご確認ください。";
      }
      lookupResult?.classList.add("hidden");
      return;
    }

    showLookupResult(matched);
  });

  lookupCancelButton?.addEventListener("click", () => {
    moveToReservationActionPage("./cancel.html");
  });

  lookupEditButton?.addEventListener("click", () => {
    moveToReservationActionPage("./edit.html");
  });
});
