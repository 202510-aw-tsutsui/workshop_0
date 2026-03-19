document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const viewPanels = Array.from(document.querySelectorAll(".content-view"));
  const sidebarLabel = document.querySelector("#sidebar-label");
  const sidebarCount = document.querySelector("#sidebar-count");
  const sidebarCaption = document.querySelector("#sidebar-caption");

  const reservationSearch = document.querySelector("#search-keyword");
  const reservationDate = document.querySelector("#filter-date");
  const reservationStatus = document.querySelector("#filter-status");
  const reservationSort = document.querySelector("#filter-sort");
  const reservationReset = document.querySelector("#reset-filter-btn");
  const reservationBody = document.querySelector("#reservation-tbody");
  const reservationResultCount = document.querySelector("#reservation-result-count");
  const reservationPrev = document.querySelector("#reservation-prev-page");
  const reservationNext = document.querySelector("#reservation-next-page");
  const reservationPageNumbers = document.querySelector("#reservation-page-numbers");
  const newReservationBtn = document.querySelector("#new-reservation-btn");

  const inquirySearch = document.querySelector("#inquiry-search-keyword");
  const inquiryDate = document.querySelector("#inquiry-filter-date");
  const inquiryStatus = document.querySelector("#inquiry-filter-status");
  const inquiryReset = document.querySelector("#inquiry-reset-filter-btn");
  const inquiryBody = document.querySelector("#inquiry-tbody");
  const inquiryResultCount = document.querySelector("#inquiry-result-count");
  const inquiryPrev = document.querySelector("#inquiry-prev-page");
  const inquiryNext = document.querySelector("#inquiry-next-page");
  const inquiryPageNumbers = document.querySelector("#inquiry-page-numbers");
  const newInquiryBtn = document.querySelector("#new-inquiry-btn");

  const reservationModal = document.querySelector("#reservation-modal");
  const closeReservationModal = document.querySelector("#close-reservation-modal");
  const reservationForm = document.querySelector("#reservation-form");
  const reservationModalTitle = document.querySelector("#reservation-modal-title");
  const completeReservationBtn = document.querySelector("#complete-reservation-btn");
  const deleteReservationBtn = document.querySelector("#delete-reservation-btn");

  const inquiryModal = document.querySelector("#inquiry-modal");
  const closeInquiryModal = document.querySelector("#close-inquiry-modal");
  const inquiryForm = document.querySelector("#inquiry-form");
  const inquiryModalTitle = document.querySelector("#inquiry-modal-title");
  const completeInquiryBtn = document.querySelector("#complete-inquiry-btn");
  const deleteInquiryBtn = document.querySelector("#delete-inquiry-btn");
  const replyInquiryBtn = document.querySelector("#reply-inquiry-btn");

  const reservationFields = {
    id: document.querySelector("#reservation-id"),
    name: document.querySelector("#customer-name"),
    email: document.querySelector("#customer-email"),
    phone: document.querySelector("#customer-phone"),
    date: document.querySelector("#reservation-date"),
    time: document.querySelector("#reservation-time"),
    people: document.querySelector("#reservation-people"),
    status: document.querySelector("#reservation-status"),
    note: document.querySelector("#reservation-note")
  };

  const inquiryFields = {
    id: document.querySelector("#inquiry-id"),
    name: document.querySelector("#inquiry-name"),
    email: document.querySelector("#inquiry-email"),
    phone: document.querySelector("#inquiry-phone"),
    date: document.querySelector("#inquiry-date"),
    subject: document.querySelector("#inquiry-subject"),
    status: document.querySelector("#inquiry-status"),
    message: document.querySelector("#inquiry-message"),
    replySubject: document.querySelector("#inquiry-reply-subject"),
    replyMessage: document.querySelector("#inquiry-reply-message")
  };

  const reservationSeed = [
    { id: 1, name: "山田 花", email: "hana@example.com", phone: "090-1111-2222", date: "2026-03-18", time: "11:00", people: 2, status: "予約確定", note: "記念日利用。写真撮影希望。" },
    { id: 2, name: "佐藤 健太", email: "kenta@example.com", phone: "080-4321-8765", date: "2026-03-18", time: "13:00", people: 3, status: "仮予約", note: "PayPay予定。" },
    { id: 3, name: "鈴木 美咲", email: "misaki@example.com", phone: "070-9988-2211", date: "2026-03-19", time: "15:00", people: 2, status: "予約確定", note: "香り相談あり。" },
    { id: 4, name: "田中 悠斗", email: "yuto@example.com", phone: "090-5432-3456", date: "2026-03-20", time: "11:00", people: 1, status: "キャンセル", note: "前日キャンセル。" },
    { id: 5, name: "高橋 莉子", email: "riko@example.com", phone: "080-4567-1234", date: "2026-03-20", time: "13:00", people: 4, status: "来店済み", note: "家族利用。" },
    { id: 6, name: "伊藤 蒼", email: "ao@example.com", phone: "070-8765-2345", date: "2026-03-21", time: "11:00", people: 2, status: "予約確定", note: "Amazon Pay。" },
    { id: 7, name: "渡辺 彩香", email: "ayaka@example.com", phone: "090-1234-5670", date: "2026-03-21", time: "15:00", people: 2, status: "仮予約", note: "日程確認中。" },
    { id: 8, name: "小林 拓海", email: "takumi@example.com", phone: "080-6789-2345", date: "2026-03-22", time: "13:00", people: 2, status: "予約確定", note: "クレジットカード。" },
    { id: 9, name: "加藤 杏奈", email: "anna@example.com", phone: "070-3344-5566", date: "2026-03-23", time: "11:00", people: 1, status: "予約確定", note: "1名利用。" },
    { id: 10, name: "吉田 直人", email: "naoto@example.com", phone: "090-7788-9900", date: "2026-03-23", time: "15:00", people: 2, status: "予約確定", note: "銀行振込。" }
  ];

  const inquirySeed = [
    { id: 1, name: "山田 花", email: "hana@example.com", phone: "090-1111-2222", date: "2026-03-18", subject: "予約変更について", status: "未対応", message: "開始時間を13時へ変更したいです。" },
    { id: 2, name: "佐藤 健太", email: "kenta@example.com", phone: "080-4321-8765", date: "2026-03-18", subject: "支払方法について", status: "対応中", message: "PayPay決済の流れを教えてください。" },
    { id: 3, name: "鈴木 美咲", email: "misaki@example.com", phone: "070-9988-2211", date: "2026-03-19", subject: "香りの持ち帰り", status: "完了", message: "当日持ち帰り可能か確認したいです。" },
    { id: 4, name: "高橋 莉子", email: "riko@example.com", phone: "080-4567-1234", date: "2026-03-20", subject: "人数変更", status: "未対応", message: "4名から3名に変更できますか。" },
    { id: 5, name: "吉田 直人", email: "naoto@example.com", phone: "090-7788-9900", date: "2026-03-21", subject: "領収書について", status: "対応中", message: "領収書発行の可否を知りたいです。" },
    { id: 6, name: "山口 みゆ", email: "miyu@example.com", phone: "080-1010-4545", date: "2026-03-22", subject: "英語対応", status: "完了", message: "英語での案内が可能か確認したいです。" }
  ];

  const storageKeys = {
    reservations: "inoriAdminReservations",
    inquiries: "inoriAdminInquiries"
  };
  const reservations = loadCollection(storageKeys.reservations, reservationSeed);
  const inquiries = loadCollection(storageKeys.inquiries, inquirySeed);
  const pageSize = 5;
  let currentReservationPage = 1;
  let currentInquiryPage = 1;
  let currentReservationId = null;
  let currentInquiryId = null;
  let currentView = "reservations";

  function buildInquiryReplyTemplate(item) {
    const customerName = item?.name ?? "○○";
    const subject = item?.subject ?? "○○";
    return `${customerName}様

この度はお問い合わせいただきありがとうございます。
お問い合わせいただきました${subject}につきまして、○○でございます。


ご不明点などございましたら、お気軽にお問い合わせください。
${customerName}様のご来店を心よりお待ちしております。

ーーーーーーーーーーーーーーーーーーー
inori 浅草店
〒111-0032 東京都台東区浅草2丁目1-5

東京メトロ銀座線「浅草駅」から徒歩2分

営業時間：10:30-18:30 ※月曜日定休日

☎TEL：000-0000-0000`;
  }

  function loadCollection(storageKey, fallback) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [...fallback];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [...fallback];
      }

      const merged = [...fallback];
      parsed.forEach((item) => {
        if (!item || typeof item !== "object") return;
        const index = merged.findIndex((fallbackItem) => fallbackItem.id === item.id);
        if (index >= 0) {
          merged[index] = { ...merged[index], ...item };
        } else {
          merged.unshift(item);
        }
      });

      return merged;
    } catch {
      return [...fallback];
    }
  }

  function replaceCollection(target, nextItems) {
    target.splice(0, target.length, ...nextItems);
  }

  function syncCollectionsFromStorage() {
    replaceCollection(reservations, loadCollection(storageKeys.reservations, reservationSeed));
    replaceCollection(inquiries, loadCollection(storageKeys.inquiries, inquirySeed));
  }

  function persistCollections() {
    localStorage.setItem(storageKeys.reservations, JSON.stringify(reservations));
    localStorage.setItem(storageKeys.inquiries, JSON.stringify(inquiries));
  }

  function formatDate(dateValue) {
    const [year, month, day] = dateValue.split("-");
    return `${year}/${month}/${day}`;
  }

  function reservationStatusClass(status) {
    if (status === "予約確定") return "status-confirmed";
    if (status === "仮予約") return "status-pending";
    if (status === "来店済み") return "status-visited";
    return "status-cancelled";
  }

  function inquiryStatusClass(status) {
    if (status === "完了") return "status-done";
    if (status === "対応中") return "status-progress";
    return "status-pending";
  }

  function setSidebarSummary() {
    if (currentView === "reservations") {
      const today = "2026-03-18";
      const count = reservations.filter((item) => item.date === today && item.status !== "キャンセル").length;
      sidebarLabel.textContent = "本日の予約";
      sidebarCount.textContent = `${count}件`;
      sidebarCaption.textContent = `${today} の有効予約`;
    } else {
      const count = inquiries.filter((item) => item.status !== "完了").length;
      sidebarLabel.textContent = "未対応のお問い合わせ";
      sidebarCount.textContent = `${count}件`;
      sidebarCaption.textContent = "返信待ちを表示中";
    }
  }

  function switchView(view) {
    currentView = view;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.view === view);
    });
    viewPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.viewPanel === view);
    });
    setSidebarSummary();
  }

  function filteredReservations() {
    const keyword = reservationSearch.value.trim().toLowerCase();
    const date = reservationDate.value;
    const status = reservationStatus.value;
    const sort = reservationSort.value;

    return reservations.filter((item) => {
      const matchKeyword = !keyword || item.name.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword) || item.phone.toLowerCase().includes(keyword);
      const matchDate = !date || item.date === date;
      const matchStatus = !status || item.status === status;
      return matchKeyword && matchDate && matchStatus;
    }).sort((a, b) => {
      const aKey = `${a.date || ""}T${a.time || "00:00"}`;
      const bKey = `${b.date || ""}T${b.time || "00:00"}`;
      const compare = aKey.localeCompare(bKey) || Number(a.id || 0) - Number(b.id || 0);
      if (sort === "oldest" || sort === "reservation-date-asc") {
        return compare;
      }
      return -compare;
    });
  }

  function filteredInquiries() {
    const keyword = inquirySearch.value.trim().toLowerCase();
    const date = inquiryDate.value;
    const status = inquiryStatus.value;

    return inquiries.filter((item) => {
      const matchKeyword = !keyword || item.name.toLowerCase().includes(keyword) || item.email.toLowerCase().includes(keyword) || item.subject.toLowerCase().includes(keyword) || item.message.toLowerCase().includes(keyword);
      const matchDate = !date || item.date === date;
      const matchStatus = !status || item.status === status;
      return matchKeyword && matchDate && matchStatus;
    });
  }

  function renderPageNumbers(container, currentPage, totalPages, onClick) {
    container.innerHTML = "";
    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `page-number${page === currentPage ? " active" : ""}`;
      button.textContent = page;
      button.addEventListener("click", () => onClick(page));
      container.appendChild(button);
    }
  }

  function renderReservations() {
    const filtered = filteredReservations();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentReservationPage = Math.min(currentReservationPage, totalPages);
    const start = (currentReservationPage - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    reservationResultCount.textContent = `${filtered.length}件を表示中`;
    reservationBody.innerHTML = "";

    if (items.length === 0) {
      reservationBody.innerHTML = '<tr class="empty-row"><td colspan="6">条件に一致する予約はありません。</td></tr>';
    } else {
      items.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${formatDate(item.date)}</td>
          <td>${item.time}</td>
          <td>${item.people}名</td>
          <td><span class="status-chip ${reservationStatusClass(item.status)}">${item.status}</span></td>
          <td>
            <div class="row-actions">
              <button type="button" class="table-action" data-reservation-action="detail" data-id="${item.id}">詳細</button>
              <button type="button" class="table-action danger" data-reservation-action="cancel" data-id="${item.id}">キャンセル</button>
            </div>
          </td>
        `;
        reservationBody.appendChild(tr);
      });
    }

    reservationPrev.disabled = currentReservationPage === 1;
    reservationNext.disabled = currentReservationPage === totalPages;
    renderPageNumbers(reservationPageNumbers, currentReservationPage, totalPages, (page) => {
      currentReservationPage = page;
      renderReservations();
    });
    setSidebarSummary();
  }

  function renderInquiries() {
    const filtered = filteredInquiries();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentInquiryPage = Math.min(currentInquiryPage, totalPages);
    const start = (currentInquiryPage - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    inquiryResultCount.textContent = `${filtered.length}件を表示中`;
    inquiryBody.innerHTML = "";

    if (items.length === 0) {
      inquiryBody.innerHTML = '<tr class="empty-row"><td colspan="5">条件に一致するお問い合わせはありません。</td></tr>';
    } else {
      items.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${formatDate(item.date)}</td>
          <td>${item.subject}</td>
          <td><span class="status-chip ${inquiryStatusClass(item.status)}">${item.status}</span></td>
          <td>
            <div class="row-actions">
              <button type="button" class="table-action" data-inquiry-action="detail" data-id="${item.id}">詳細</button>
              <button type="button" class="table-action danger" data-inquiry-action="delete" data-id="${item.id}">削除</button>
            </div>
          </td>
        `;
        inquiryBody.appendChild(tr);
      });
    }

    inquiryPrev.disabled = currentInquiryPage === 1;
    inquiryNext.disabled = currentInquiryPage === totalPages;
    renderPageNumbers(inquiryPageNumbers, currentInquiryPage, totalPages, (page) => {
      currentInquiryPage = page;
      renderInquiries();
    });
    setSidebarSummary();
  }

  function openReservationModal(mode, item) {
    reservationModal.classList.remove("hidden");
    currentReservationId = item?.id ?? null;
    reservationModalTitle.textContent = mode === "new" ? "新規予約" : "予約詳細・編集";
    reservationFields.id.value = item?.id ?? "";
    reservationFields.name.value = item?.name ?? "";
    reservationFields.email.value = item?.email ?? "";
    reservationFields.phone.value = item?.phone ?? "";
    reservationFields.date.value = item?.date ?? "";
    reservationFields.time.value = item?.time ?? "11:00";
    reservationFields.people.value = item?.people ?? 1;
    reservationFields.status.value = item?.status ?? "仮予約";
    reservationFields.note.value = item?.note ?? "";
    completeReservationBtn.disabled = mode === "new";
    deleteReservationBtn.disabled = mode === "new";
  }

  function closeReservation() {
    reservationModal.classList.add("hidden");
    reservationForm.reset();
    currentReservationId = null;
  }

  function openInquiryModal(mode, item) {
    inquiryModal.classList.remove("hidden");
    currentInquiryId = item?.id ?? null;
    inquiryModalTitle.textContent = mode === "new" ? "新規お問い合わせ" : "お問い合わせ詳細・編集";
    inquiryFields.id.value = item?.id ?? "";
    inquiryFields.name.value = item?.name ?? "";
    inquiryFields.email.value = item?.email ?? "";
    inquiryFields.phone.value = item?.phone ?? "";
    inquiryFields.date.value = item?.date ?? "";
    inquiryFields.subject.value = item?.subject ?? "";
    inquiryFields.status.value = item?.status ?? "未対応";
    inquiryFields.message.value = item?.message ?? "";
    inquiryFields.replySubject.value = item?.replySubject ?? (item?.subject ? `Re: ${item.subject}` : "Re: お問い合わせありがとうございます");
    inquiryFields.replyMessage.value = item?.replyMessage ?? buildInquiryReplyTemplate(item);
    completeInquiryBtn.disabled = mode === "new";
    deleteInquiryBtn.disabled = mode === "new";
    replyInquiryBtn.disabled = mode === "new";
  }

  function closeInquiry() {
    inquiryModal.classList.add("hidden");
    inquiryForm.reset();
    currentInquiryId = null;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      switchView(link.dataset.view);
    });
  });

  [reservationSearch, reservationDate, reservationStatus, reservationSort].forEach((el) => {
    el.addEventListener("input", () => {
      currentReservationPage = 1;
      renderReservations();
    });
    el.addEventListener("change", () => {
      currentReservationPage = 1;
      renderReservations();
    });
  });

  [inquirySearch, inquiryDate, inquiryStatus].forEach((el) => {
    el.addEventListener("input", () => {
      currentInquiryPage = 1;
      renderInquiries();
    });
    el.addEventListener("change", () => {
      currentInquiryPage = 1;
      renderInquiries();
    });
  });

  reservationReset.addEventListener("click", () => {
    reservationSearch.value = "";
    reservationDate.value = "";
    reservationStatus.value = "";
    reservationSort.value = "newest";
    currentReservationPage = 1;
    renderReservations();
  });

  inquiryReset.addEventListener("click", () => {
    inquirySearch.value = "";
    inquiryDate.value = "";
    inquiryStatus.value = "";
    currentInquiryPage = 1;
    renderInquiries();
  });

  reservationPrev.addEventListener("click", () => {
    if (currentReservationPage > 1) {
      currentReservationPage -= 1;
      renderReservations();
    }
  });

  reservationNext.addEventListener("click", () => {
    currentReservationPage += 1;
    renderReservations();
  });

  inquiryPrev.addEventListener("click", () => {
    if (currentInquiryPage > 1) {
      currentInquiryPage -= 1;
      renderInquiries();
    }
  });

  inquiryNext.addEventListener("click", () => {
    currentInquiryPage += 1;
    renderInquiries();
  });

  newReservationBtn.addEventListener("click", () => openReservationModal("new"));
  newInquiryBtn.addEventListener("click", () => openInquiryModal("new"));

  reservationBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = Number(target.dataset.id);
    const item = reservations.find((reservation) => reservation.id === id);
    if (!item) return;

    if (target.dataset.reservationAction === "detail") {
      openReservationModal("edit", item);
    }

    if (target.dataset.reservationAction === "cancel") {
      item.status = "キャンセル";
      persistCollections();
      renderReservations();
    }
  });

  inquiryBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = Number(target.dataset.id);
    const item = inquiries.find((inquiry) => inquiry.id === id);
    if (!item) return;

    if (target.dataset.inquiryAction === "detail") {
      openInquiryModal("edit", item);
    }

    if (target.dataset.inquiryAction === "delete") {
      const index = inquiries.findIndex((inquiry) => inquiry.id === id);
      inquiries.splice(index, 1);
      persistCollections();
      renderInquiries();
    }
  });

  closeReservationModal.addEventListener("click", closeReservation);
  closeInquiryModal.addEventListener("click", closeInquiry);

  reservationModal.addEventListener("click", (event) => {
    if (event.target === reservationModal) closeReservation();
  });
  inquiryModal.addEventListener("click", (event) => {
    if (event.target === inquiryModal) closeInquiry();
  });

  completeReservationBtn.addEventListener("click", () => {
    const item = reservations.find((reservation) => reservation.id === currentReservationId);
    if (!item) return;
    item.status = "来店済み";
    reservationFields.status.value = "来店済み";
    persistCollections();
    closeReservation();
    renderReservations();
  });

  deleteReservationBtn.addEventListener("click", () => {
    const index = reservations.findIndex((reservation) => reservation.id === currentReservationId);
    if (index < 0) return;
    reservations.splice(index, 1);
    persistCollections();
    closeReservation();
    renderReservations();
  });

  deleteInquiryBtn.addEventListener("click", () => {
    const index = inquiries.findIndex((inquiry) => inquiry.id === currentInquiryId);
    if (index < 0) return;
    inquiries.splice(index, 1);
    persistCollections();
    closeInquiry();
    renderInquiries();
  });

  replyInquiryBtn.addEventListener("click", () => {
    const item = inquiries.find((inquiry) => inquiry.id === currentInquiryId);
    const email = inquiryFields.email.value.trim();
    const subject = inquiryFields.replySubject.value.trim();
    const message = inquiryFields.replyMessage.value.trim();

    if (!item) return;

    if (!email) {
      alert("返信先メールアドレスがありません。");
      return;
    }

    if (!subject || !message) {
      alert("返信件名と返信内容を入力してください。");
      return;
    }

    item.replySubject = subject;
    item.replyMessage = message;
    if (item.status === "未対応") {
      item.status = "対応中";
      inquiryFields.status.value = "対応中";
    }
    persistCollections();
    renderInquiries();

    const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  });

  completeInquiryBtn.addEventListener("click", () => {
    const item = inquiries.find((inquiry) => inquiry.id === currentInquiryId);
    if (!item) return;
    item.status = "完了";
    inquiryFields.status.value = "完了";
    persistCollections();
    closeInquiry();
    renderInquiries();
  });

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = {
      id: currentReservationId ?? Date.now(),
      name: reservationFields.name.value.trim(),
      email: reservationFields.email.value.trim(),
      phone: reservationFields.phone.value.trim(),
      date: reservationFields.date.value,
      time: reservationFields.time.value,
      people: Number(reservationFields.people.value),
      status: reservationFields.status.value,
      note: reservationFields.note.value.trim()
    };

    if (!payload.name || !payload.date || !payload.time || !payload.people) {
      alert("予約者名、予約日、時間、人数は必須です。");
      return;
    }

    const index = reservations.findIndex((reservation) => reservation.id === payload.id);
    if (index >= 0) {
      reservations[index] = payload;
    } else {
      reservations.unshift(payload);
    }

    persistCollections();
    closeReservation();
    currentReservationPage = 1;
    renderReservations();
  });

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = {
      id: currentInquiryId ?? Date.now(),
      name: inquiryFields.name.value.trim(),
      email: inquiryFields.email.value.trim(),
      phone: inquiryFields.phone.value.trim(),
      date: inquiryFields.date.value,
      subject: inquiryFields.subject.value.trim(),
      status: inquiryFields.status.value,
      message: inquiryFields.message.value.trim(),
      replySubject: inquiryFields.replySubject.value.trim(),
      replyMessage: inquiryFields.replyMessage.value.trim()
    };

    if (!payload.name || !payload.date || !payload.subject) {
      alert("氏名、受信日、件名は必須です。");
      return;
    }

    const index = inquiries.findIndex((inquiry) => inquiry.id === payload.id);
    if (index >= 0) {
      inquiries[index] = payload;
    } else {
      inquiries.unshift(payload);
    }

    persistCollections();
    closeInquiry();
    currentInquiryPage = 1;
    renderInquiries();
  });

  function refreshFromStorage() {
    syncCollectionsFromStorage();
    renderReservations();
    renderInquiries();
  }

  window.addEventListener("focus", refreshFromStorage);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      refreshFromStorage();
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKeys.reservations || event.key === storageKeys.inquiries) {
      refreshFromStorage();
    }
  });

  const initialView = new URLSearchParams(window.location.search).get("view") === "inquiries"
    ? "inquiries"
    : "reservations";

  switchView(initialView);
  renderReservations();
  renderInquiries();
});
