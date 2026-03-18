document.addEventListener("DOMContentLoaded", () => {
  const lookupForm = document.querySelector("#lookup-form");
  const lookupName = document.querySelector("#lookup-name");
  const lookupEmailLocal = document.querySelector("#lookup-email-local");
  const lookupEmailDomain = document.querySelector("#lookup-email-domain");
  const lookupEmailDomainCustom = document.querySelector("#lookup-email-domain-custom");
  const lookupTel = document.querySelector("#lookup-tel");
  const lookupResult = document.querySelector("#lookup-result");
  const lookupResultLead = document.querySelector("#lookup-result-lead");
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

  const adminReservationStorageKey = "inoriAdminReservations";
  const reservationSeed = [
    { id: 1, name: "山田 花", email: "hana@example.com", phone: "090-1111-2222", date: "2026-03-18", time: "11:00", people: 2, status: "予約確定", note: "記念日利用。写真撮影希望。" },
    { id: 2, name: "佐藤 健太", email: "kenta@example.com", phone: "080-4321-8765", date: "2026-03-18", time: "13:00", people: 3, status: "仮予約", note: "PayPay予定。" },
    { id: 3, name: "鈴木 美咲", email: "misaki@example.com", phone: "070-9988-2211", date: "2026-03-19", time: "15:00", people: 2, status: "予約確定", note: "香り相談あり。" },
    { id: 4, name: "田中 悠斗", email: "yuto@example.com", phone: "090-5432-3456", date: "2026-03-20", time: "11:00", people: 1, status: "キャンセル", note: "前日キャンセル。" },
    { id: 5, name: "高橋 莉子", email: "riko@example.com", phone: "080-4567-1234", date: "2026-03-20", time: "13:00", people: 4, status: "来店済み", note: "家族利用。" },
    { id: 6, name: "伊藤 蒼", email: "ao@example.com", phone: "070-8765-2345", date: "2026-03-21", time: "11:00", people: 2, status: "予約確定", note: "Amazon Pay。" }
  ];

  if (!lookupForm) return;

  function syncLookupEmailDomainInput() {
    if (!lookupEmailDomain || !lookupEmailDomainCustom) return;
    lookupEmailDomainCustom.classList.toggle("hidden", lookupEmailDomain.value !== "other");
  }

  function getLookupEmailValue() {
    const local = lookupEmailLocal?.value.trim() || "";
    const domain = lookupEmailDomain?.value === "other"
      ? lookupEmailDomainCustom?.value.trim() || ""
      : lookupEmailDomain?.value.trim() || "";
    return local && domain ? `${local}@${domain}` : "";
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
    lookupResultFields.id.textContent = String(item.id ?? "");
    lookupResultFields.name.textContent = item.name || "未入力";
    lookupResultFields.email.textContent = item.email || "未入力";
    lookupResultFields.tel.textContent = item.phone || "未入力";
    lookupResultFields.date.textContent = `${item.date || ""} ${item.time || ""}`.trim() || "未入力";
    lookupResultFields.people.textContent = item.people || "未入力";
    lookupResultFields.status.textContent = item.status || "未入力";
    lookupResultFields.note.textContent = item.note || "なし";
    lookupResult.classList.remove("hidden");
    lookupMessage.textContent = "";
  }

  lookupEmailDomain?.addEventListener("change", syncLookupEmailDomainInput);

  lookupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = lookupName?.value.trim() || "";
    const email = getLookupEmailValue();
    const tel = lookupTel?.value.trim() || "";

    if (!name || (!email && !tel)) {
      lookupMessage.textContent = "お名前と、メールアドレスまたは電話番号を入力してください。";
      lookupResult.classList.add("hidden");
      return;
    }

    const reservations = loadReservations();
    const matched = reservations.find((item) => {
      const sameName = (item.name || "").trim() === name;
      const sameEmail = email && (item.email || "").trim() === email;
      const sameTel = tel && (item.phone || "").trim() === tel;
      return sameName && (sameEmail || sameTel);
    });

    if (!matched) {
      lookupMessage.textContent = "該当するご予約が見つかりませんでした。入力内容をご確認ください。";
      lookupResult.classList.add("hidden");
      return;
    }

    showLookupResult(matched);
  });

  syncLookupEmailDomainInput();
});
