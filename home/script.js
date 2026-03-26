document.addEventListener("DOMContentLoaded", () => {
  const reservationStorageKey = "inoriAdminReservations";
  const inquiryStorageKey = "inoriAdminInquiries";
  const reservationPageSize = 5;
  const reservationMaxItems = 10;
  const inquiryPageSize = 5;
  const inquiryMaxItems = 10;

  const reservationSeed = [
    {
      id: 1001,
      reservationCode: "INR-260401-HN4K8P",
      name: "山田 花",
      email: "hana@example.com",
      phone: "090-1111-2222",
      date: "2026-04-01",
      time: "11:00",
      people: 2,
      status: "予約確定",
      note: "記念日利用。写真撮影希望。"
    },
    {
      id: 1002,
      reservationCode: "INR-260402-KT7M2Q",
      name: "佐藤 健太",
      email: "kenta@example.com",
      phone: "080-4321-8765",
      date: "2026-04-02",
      time: "13:00",
      people: 3,
      status: "仮予約",
      note: "PayPay予定。香りは柑橘系希望。"
    },
    {
      id: 1003,
      reservationCode: "INR-260403-MS5R9L",
      name: "鈴木 美咲",
      email: "misaki@example.com",
      phone: "070-9988-2211",
      date: "2026-04-03",
      time: "15:00",
      people: 2,
      status: "予約確定",
      note: "香り相談あり。"
    },
    {
      id: 1004,
      reservationCode: "INR-260405-YT3W6N",
      name: "田中 悠斗",
      email: "yuto@example.com",
      phone: "090-5432-3456",
      date: "2026-04-05",
      time: "11:00",
      people: 1,
      status: "キャンセル",
      note: "前日キャンセル。"
    },
    {
      id: 1005,
      reservationCode: "INR-260406-RK8P4S",
      name: "高橋 莉子",
      email: "riko@example.com",
      phone: "080-4567-1234",
      date: "2026-04-06",
      time: "13:00",
      people: 4,
      status: "来店済み",
      note: "友人4名で参加。"
    }
  ];

  const inquirySeed = [
    {
      id: 2001,
      name: "中村 美穂",
      email: "miho@example.com",
      phone: "090-2345-6789",
      date: "2026-03-29",
      subject: "予約可能日の確認",
      status: "未対応",
      message: "4月前半の土日で2名予約したいです。空き状況を教えてください。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n4月前半の土日につきましては、日によってご案内可能なお時間が異なります。\n現在の空き状況を確認のうえ、改めて候補日とあわせてご案内いたします。\n\nご希望の日程がございましたら、第1希望から第3希望までお知らせいただけますと、よりスムーズにご案内可能です。\nどうぞよろしくお願いいたします。"
    },
    {
      id: 2002,
      name: "小林 直人",
      email: "naoto@example.com",
      phone: "080-1234-5678",
      date: "2026-03-30",
      subject: "香りの持ち帰りについて",
      status: "対応中",
      message: "ワークショップで作成した香りは当日持ち帰れますか。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\nワークショップでお作りいただいた香りは、当日そのままお持ち帰りいただけます。\nお帰りの際にお持ち運びしやすいよう、簡易的な包装もご用意しております。\n\nご不明な点がございましたら、どうぞお気軽にご連絡ください。"
    },
    {
      id: 2003,
      name: "井上 遥",
      email: "haruka@example.com",
      phone: "070-9876-5432",
      date: "2026-03-31",
      subject: "英語対応の可否",
      status: "完了",
      message: "海外の友人と参加予定です。英語での案内は可能でしょうか。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n当日は簡単な英語でのご案内が可能です。\n専門的な香りの説明につきましては、日本語を中心にご案内しつつ、必要に応じて英語でも補足いたします。\n\nご参加予定人数やご不安な点がございましたら、事前にお知らせください。できる限り対応いたします。"
    },
    {
      id: 2004,
      name: "加藤 真央",
      email: "mao@example.com",
      phone: "090-8765-4321",
      date: "2026-04-01",
      subject: "キャンセルポリシーについて",
      status: "未対応",
      message: "体調不良時のキャンセル料について確認したいです。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n体調不良などやむを得ないご事情の場合は、まずはお早めにご連絡ください。\nキャンセル料の取り扱いについては、ご連絡の時期やご予約状況を確認のうえ、個別にご案内しております。\n\nご不安な点がありましたら、遠慮なくご相談ください。"
    },
    {
      id: 2005,
      name: "松本 蓮",
      email: "ren@example.com",
      phone: "080-7654-3210",
      date: "2026-04-02",
      subject: "貸切利用の相談",
      status: "対応中",
      message: "5名での貸切利用は可能ですか。平日希望です。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n5名様でのご利用については、日程によって貸切対応が可能な場合がございます。\n平日をご希望とのことですので、候補日をいくつかお知らせいただけましたら、空き状況を確認してご案内いたします。\n\nご希望のお時間帯がありましたら、あわせてお知らせください。"
    }
  ];

  const reservationState = { page: 1, items: [] };
  const inquiryState = { page: 1, items: [] };

  const views = Array.from(document.querySelectorAll("[data-view-panel]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const todayReservationsCard = document.querySelector("#today-reservations-card");
  const sidebarCount = document.querySelector("#sidebar-count");
  const sidebarCaption = document.querySelector("#sidebar-caption");

  const reservationElements = {
    tbody: document.querySelector("#reservation-tbody"),
    resultCount: document.querySelector("#reservation-result-count"),
    keyword: document.querySelector("#search-keyword"),
    date: document.querySelector("#filter-date"),
    status: document.querySelector("#filter-status"),
    sort: document.querySelector("#filter-sort"),
    reset: document.querySelector("#reset-filter-btn"),
    prev: document.querySelector("#reservation-prev-page"),
    next: document.querySelector("#reservation-next-page"),
    pageNumbers: document.querySelector("#reservation-page-numbers"),
    modal: document.querySelector("#reservation-modal"),
    modalTitle: document.querySelector("#reservation-modal-title"),
    form: document.querySelector("#reservation-form"),
    newButton: document.querySelector("#new-reservation-btn"),
    closeButton: document.querySelector("#close-reservation-modal"),
    deleteButton: document.querySelector("#delete-reservation-btn"),
    completeButton: document.querySelector("#complete-reservation-btn")
  };

  const inquiryElements = {
    tbody: document.querySelector("#inquiry-tbody"),
    resultCount: document.querySelector("#inquiry-result-count"),
    keyword: document.querySelector("#inquiry-search-keyword"),
    date: document.querySelector("#inquiry-filter-date"),
    status: document.querySelector("#inquiry-filter-status"),
    reset: document.querySelector("#inquiry-reset-filter-btn"),
    prev: document.querySelector("#inquiry-prev-page"),
    next: document.querySelector("#inquiry-next-page"),
    pageNumbers: document.querySelector("#inquiry-page-numbers"),
    modal: document.querySelector("#inquiry-modal"),
    modalTitle: document.querySelector("#inquiry-modal-title"),
    form: document.querySelector("#inquiry-form"),
    newButton: document.querySelector("#new-inquiry-btn"),
    closeButton: document.querySelector("#close-inquiry-modal"),
    deleteButton: document.querySelector("#delete-inquiry-btn"),
    completeButton: document.querySelector("#complete-inquiry-btn"),
    replyButton: document.querySelector("#reply-inquiry-btn")
  };

  if (!reservationElements.tbody || !inquiryElements.tbody) {
    return;
  }

  function normalizeArray(raw, seed) {
    if (!raw) return [...seed];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...seed];
      const merged = [...seed];
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
      return [...seed];
    }
  }

  function loadReservations() {
    return normalizeArray(localStorage.getItem(reservationStorageKey), reservationSeed);
  }

  function saveReservations(items) {
    localStorage.setItem(reservationStorageKey, JSON.stringify(items));
  }

  function loadInquiries() {
    return normalizeArray(localStorage.getItem(inquiryStorageKey), inquirySeed);
  }

  function saveInquiries(items) {
    localStorage.setItem(inquiryStorageKey, JSON.stringify(items));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  function generateCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";
    for (let index = 0; index < 6; index += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `INR-${getToday().replaceAll("-", "").slice(2)}-${suffix}`;
  }

  function setActiveView(viewName) {
    navLinks.forEach((button) => {
      button.classList.toggle("active", button.dataset.view === viewName);
    });
    views.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.viewPanel === viewName);
    });
  }

  function updateSidebarSummary(items) {
    const todayItems = items.filter((item) => item.date === getToday() && item.status !== "キャンセル");
    if (sidebarCount) {
      sidebarCount.textContent = `${todayItems.length}件`;
    }
    if (sidebarCaption) {
      sidebarCaption.textContent = todayItems.length > 0
        ? `${todayItems[0].time} から順に確認`
        : "本日の予約はありません";
    }
  }

  function buildPagination(target, totalPages, currentPage, onMove) {
    target.innerHTML = "";
    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `page-btn${page === currentPage ? " is-active" : ""}`;
      button.textContent = String(page);
      button.addEventListener("click", () => onMove(page));
      target.appendChild(button);
    }
  }

  function renderReservations() {
    const allItems = loadReservations();
    const keyword = reservationElements.keyword.value.trim().toLowerCase();
    const filterDate = reservationElements.date.value;
    const filterStatus = reservationElements.status.value;
    const sortMode = reservationElements.sort.value;

    let items = allItems.filter((item) => {
      const matchedKeyword = !keyword || [item.reservationCode, item.name, item.email, item.phone]
        .some((value) => String(value ?? "").toLowerCase().includes(keyword));
      const matchedDate = !filterDate || item.date === filterDate;
      const matchedStatus = !filterStatus || item.status === filterStatus;
      return matchedKeyword && matchedDate && matchedStatus;
    });

    items.sort((left, right) => {
      const leftKey = `${left.date} ${left.time}`;
      const rightKey = `${right.date} ${right.time}`;
      if (sortMode === "reservation-date-asc") return leftKey.localeCompare(rightKey);
      if (sortMode === "oldest") return left.id - right.id;
      return rightKey.localeCompare(leftKey) || right.id - left.id;
    });

    const visibleItems = items.slice(0, reservationMaxItems);
    reservationState.items = visibleItems;
    const totalPages = Math.max(1, Math.ceil(visibleItems.length / reservationPageSize));
    reservationState.page = Math.min(reservationState.page, totalPages);
    const start = (reservationState.page - 1) * reservationPageSize;
    const pagedItems = visibleItems.slice(start, start + reservationPageSize);

    reservationElements.tbody.innerHTML = pagedItems.map((item) => `
      <tr>
        <td class="reservation-code-cell">${escapeHtml(item.reservationCode)}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.date)}</td>
        <td>${escapeHtml(item.time)}</td>
        <td>${escapeHtml(item.people)}名</td>
        <td>${escapeHtml(item.status)}</td>
        <td><button type="button" class="secondary-btn" data-open-reservation="${item.id}">詳細</button></td>
      </tr>
    `).join("");

    reservationElements.resultCount.textContent = `${visibleItems.length}件を表示中`;
    reservationElements.prev.disabled = reservationState.page <= 1;
    reservationElements.next.disabled = reservationState.page >= totalPages;
    buildPagination(reservationElements.pageNumbers, totalPages, reservationState.page, (page) => {
      reservationState.page = page;
      renderReservations();
    });
    updateSidebarSummary(allItems);
  }

  function renderInquiries() {
    const allItems = loadInquiries();
    const keyword = inquiryElements.keyword.value.trim().toLowerCase();
    const filterDate = inquiryElements.date.value;
    const filterStatus = inquiryElements.status.value;

    const items = allItems
      .filter((item) => {
        const matchedKeyword = !keyword || [item.name, item.email, item.subject, item.message]
          .some((value) => String(value ?? "").toLowerCase().includes(keyword));
        const matchedDate = !filterDate || item.date === filterDate;
        const matchedStatus = !filterStatus || item.status === filterStatus;
        return matchedKeyword && matchedDate && matchedStatus;
      })
      .sort((left, right) => right.date.localeCompare(left.date) || right.id - left.id);

    const visibleItems = items.slice(0, inquiryMaxItems);
    inquiryState.items = visibleItems;
    const totalPages = Math.max(1, Math.ceil(visibleItems.length / inquiryPageSize));
    inquiryState.page = Math.min(inquiryState.page, totalPages);
    const start = (inquiryState.page - 1) * inquiryPageSize;
    const pagedItems = visibleItems.slice(start, start + inquiryPageSize);

    inquiryElements.tbody.innerHTML = pagedItems.map((item) => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${escapeHtml(item.date)}</td>
        <td>${escapeHtml(item.subject)}</td>
        <td>${escapeHtml(item.status)}</td>
        <td><button type="button" class="secondary-btn" data-open-inquiry="${item.id}">詳細</button></td>
      </tr>
    `).join("");

    inquiryElements.resultCount.textContent = `${visibleItems.length}件を表示中`;
    inquiryElements.prev.disabled = inquiryState.page <= 1;
    inquiryElements.next.disabled = inquiryState.page >= totalPages;
    buildPagination(inquiryElements.pageNumbers, totalPages, inquiryState.page, (page) => {
      inquiryState.page = page;
      renderInquiries();
    });
  }

  function openModal(modal) {
    modal.classList.remove("hidden");
  }

  function closeModal(modal) {
    modal.classList.add("hidden");
  }

  function fillReservationForm(item) {
    document.querySelector("#reservation-id").value = item.id ?? "";
    document.querySelector("#reservation-code").value = item.reservationCode ?? "";
    document.querySelector("#customer-name").value = item.name ?? "";
    document.querySelector("#customer-email").value = item.email ?? "";
    document.querySelector("#customer-phone").value = item.phone ?? "";
    document.querySelector("#reservation-date").value = item.date ?? "";
    document.querySelector("#reservation-time").value = item.time ?? "11:00";
    document.querySelector("#reservation-people").value = item.people ?? 1;
    document.querySelector("#reservation-status").value = item.status ?? "予約確定";
    document.querySelector("#reservation-note").value = item.note ?? "";
  }

  function fillInquiryForm(item) {
    document.querySelector("#inquiry-id").value = item.id ?? "";
    document.querySelector("#inquiry-name").value = item.name ?? "";
    document.querySelector("#inquiry-email").value = item.email ?? "";
    document.querySelector("#inquiry-phone").value = item.phone ?? "";
    document.querySelector("#inquiry-date").value = item.date ?? getToday();
    document.querySelector("#inquiry-subject").value = item.subject ?? "";
    document.querySelector("#inquiry-status").value = item.status ?? "未対応";
    document.querySelector("#inquiry-message").value = item.message ?? "";
    document.querySelector("#inquiry-reply-subject").value = item.replySubject ?? "お問い合わせありがとうございます";
    document.querySelector("#inquiry-reply-message").value = item.replyMessage ?? "お問い合わせありがとうございます。\n\n内容を確認のうえ、順次ご案内いたします。\n恐れ入りますが、今しばらくお待ちください。\n\nどうぞよろしくお願いいたします。";
  }

  function getReservationFormValue() {
    return {
      id: Number(document.querySelector("#reservation-id").value) || Date.now(),
      reservationCode: document.querySelector("#reservation-code").value.trim() || generateCode(),
      name: document.querySelector("#customer-name").value.trim(),
      email: document.querySelector("#customer-email").value.trim(),
      phone: document.querySelector("#customer-phone").value.trim(),
      date: document.querySelector("#reservation-date").value,
      time: document.querySelector("#reservation-time").value,
      people: document.querySelector("#reservation-people").value,
      status: document.querySelector("#reservation-status").value,
      note: document.querySelector("#reservation-note").value.trim()
    };
  }

  function getInquiryFormValue() {
    return {
      id: Number(document.querySelector("#inquiry-id").value) || Date.now(),
      name: document.querySelector("#inquiry-name").value.trim(),
      email: document.querySelector("#inquiry-email").value.trim(),
      phone: document.querySelector("#inquiry-phone").value.trim(),
      date: document.querySelector("#inquiry-date").value || getToday(),
      subject: document.querySelector("#inquiry-subject").value.trim(),
      status: document.querySelector("#inquiry-status").value,
      message: document.querySelector("#inquiry-message").value.trim(),
      replySubject: document.querySelector("#inquiry-reply-subject").value.trim(),
      replyMessage: document.querySelector("#inquiry-reply-message").value.trim()
    };
  }

  function upsertById(items, nextItem) {
    const index = items.findIndex((item) => item.id === nextItem.id);
    if (index >= 0) {
      items[index] = nextItem;
      return items;
    }
    return [nextItem, ...items];
  }

  reservationElements.tbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-reservation]");
    if (!button) return;
    const id = Number(button.dataset.openReservation);
    const item = loadReservations().find((entry) => entry.id === id);
    if (!item) return;
    reservationElements.modalTitle.textContent = "予約詳細";
    fillReservationForm(item);
    openModal(reservationElements.modal);
  });

  inquiryElements.tbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-inquiry]");
    if (!button) return;
    const id = Number(button.dataset.openInquiry);
    const item = loadInquiries().find((entry) => entry.id === id);
    if (!item) return;
    inquiryElements.modalTitle.textContent = "お問い合わせ詳細";
    fillInquiryForm(item);
    openModal(inquiryElements.modal);
  });

  reservationElements.newButton.addEventListener("click", () => {
    reservationElements.modalTitle.textContent = "新規予約";
    fillReservationForm({
      reservationCode: generateCode(),
      date: getToday(),
      time: "11:00",
      people: 1,
      status: "予約確定"
    });
    document.querySelector("#reservation-id").value = "";
    openModal(reservationElements.modal);
  });

  inquiryElements.newButton.addEventListener("click", () => {
    inquiryElements.modalTitle.textContent = "新規お問い合わせ";
    fillInquiryForm({ date: getToday(), status: "未対応" });
    document.querySelector("#inquiry-id").value = "";
    openModal(inquiryElements.modal);
  });

  reservationElements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextItem = getReservationFormValue();
    const items = upsertById(loadReservations(), nextItem);
    saveReservations(items);
    closeModal(reservationElements.modal);
    renderReservations();
  });

  inquiryElements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextItem = getInquiryFormValue();
    const items = upsertById(loadInquiries(), nextItem);
    saveInquiries(items);
    closeModal(inquiryElements.modal);
    renderInquiries();
  });

  reservationElements.deleteButton.addEventListener("click", () => {
    const id = Number(document.querySelector("#reservation-id").value);
    if (!id) return;
    const items = loadReservations().filter((item) => item.id !== id);
    saveReservations(items);
    closeModal(reservationElements.modal);
    renderReservations();
  });

  inquiryElements.deleteButton.addEventListener("click", () => {
    const id = Number(document.querySelector("#inquiry-id").value);
    if (!id) return;
    const items = loadInquiries().filter((item) => item.id !== id);
    saveInquiries(items);
    closeModal(inquiryElements.modal);
    renderInquiries();
  });

  reservationElements.completeButton.addEventListener("click", () => {
    document.querySelector("#reservation-status").value = "来店済み";
  });

  inquiryElements.completeButton.addEventListener("click", () => {
    document.querySelector("#inquiry-status").value = "完了";
  });

  inquiryElements.replyButton.addEventListener("click", () => {
    const email = document.querySelector("#inquiry-email").value.trim();
    const subject = document.querySelector("#inquiry-reply-subject").value.trim();
    const body = document.querySelector("#inquiry-reply-message").value.trim();
    if (!email) return;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  reservationElements.closeButton.addEventListener("click", () => closeModal(reservationElements.modal));
  inquiryElements.closeButton.addEventListener("click", () => closeModal(inquiryElements.modal));

  reservationElements.modal.addEventListener("click", (event) => {
    if (event.target === reservationElements.modal) closeModal(reservationElements.modal);
  });

  inquiryElements.modal.addEventListener("click", (event) => {
    if (event.target === inquiryElements.modal) closeModal(inquiryElements.modal);
  });

  reservationElements.prev.addEventListener("click", () => {
    reservationState.page = Math.max(1, reservationState.page - 1);
    renderReservations();
  });
  reservationElements.next.addEventListener("click", () => {
    reservationState.page += 1;
    renderReservations();
  });

  inquiryElements.prev.addEventListener("click", () => {
    inquiryState.page = Math.max(1, inquiryState.page - 1);
    renderInquiries();
  });
  inquiryElements.next.addEventListener("click", () => {
    inquiryState.page += 1;
    renderInquiries();
  });

  [reservationElements.keyword, reservationElements.date, reservationElements.status, reservationElements.sort].forEach((element) => {
    element.addEventListener("input", () => {
      reservationState.page = 1;
      renderReservations();
    });
    element.addEventListener("change", () => {
      reservationState.page = 1;
      renderReservations();
    });
  });

  [inquiryElements.keyword, inquiryElements.date, inquiryElements.status].forEach((element) => {
    element.addEventListener("input", () => {
      inquiryState.page = 1;
      renderInquiries();
    });
    element.addEventListener("change", () => {
      inquiryState.page = 1;
      renderInquiries();
    });
  });

  reservationElements.reset.addEventListener("click", () => {
    reservationElements.keyword.value = "";
    reservationElements.date.value = "";
    reservationElements.status.value = "";
    reservationElements.sort.value = "newest";
    reservationState.page = 1;
    renderReservations();
  });

  inquiryElements.reset.addEventListener("click", () => {
    inquiryElements.keyword.value = "";
    inquiryElements.date.value = "";
    inquiryElements.status.value = "";
    inquiryState.page = 1;
    renderInquiries();
  });

  navLinks.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  todayReservationsCard?.addEventListener("click", () => {
    setActiveView("reservations");
    reservationElements.date.value = getToday();
    reservationState.page = 1;
    renderReservations();
  });

  if (!localStorage.getItem(reservationStorageKey)) {
    saveReservations(reservationSeed);
  }
  if (!localStorage.getItem(inquiryStorageKey)) {
    saveInquiries(inquirySeed);
  }

  renderReservations();
  renderInquiries();
});
