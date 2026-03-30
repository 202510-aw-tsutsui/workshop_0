document.addEventListener("DOMContentLoaded", () => {
  const reservationStorageKey = "inoriAdminReservations";
  const reservationTrashStorageKey = "inoriAdminReservationTrash";
  const inquiryStorageKey = "inoriAdminInquiries";
  const reservationPageSize = 5;
  const reservationMaxItems = 10;
  const inquiryPageSize = 5;
  const inquiryMaxItems = 10;
  const reservationStatusVisited = "来店済み";
  const reservationStatusCancelled = "キャンセル";

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
      note: "当日は体験利用。同行者1名あり。"
    },
    {
      id: 1002,
      reservationCode: "INR-260402-KT7M2Q",
      name: "加藤 健太",
      email: "kenta@example.com",
      phone: "080-4321-8765",
      date: "2026-04-02",
      time: "13:00",
      people: 3,
      status: "仮予約",
      note: "PayPay希望。返信は午後希望。"
    },
    {
      id: 1003,
      reservationCode: "INR-260403-MS5R9L",
      name: "松木 美咲",
      email: "misaki@example.com",
      phone: "070-9988-2211",
      date: "2026-04-03",
      time: "15:00",
      people: 2,
      status: "予約確定",
      note: "ゆっくり説明希望。"
    },
    {
      id: 1004,
      reservationCode: "INR-260405-YT3W6N",
      name: "山中 裕斗",
      email: "yuto@example.com",
      phone: "090-5432-3456",
      date: "2026-04-05",
      time: "11:00",
      people: 1,
      status: "キャンセル",
      note: "前日にキャンセル。"
    },
    {
      id: 1005,
      reservationCode: "INR-260406-RK8P4S",
      name: "高橋 理子",
      email: "riko@example.com",
      phone: "080-4567-1234",
      date: "2026-04-06",
      time: "13:00",
      people: 4,
      status: "来店済み",
      note: "4名で来店済み。"
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
      replyMessage: "お問い合わせありがとうございます。\n\n4月前半の土日について、現在ご案内可能な日程を確認しております。\n確認でき次第、候補日時をご案内します。\n\n少々お待ちください。"
    },
    {
      id: 2002,
      name: "森田 直人",
      email: "naoto@example.com",
      phone: "080-1234-5678",
      date: "2026-03-30",
      subject: "持ち物の確認について",
      status: "対応中",
      message: "ワークショップで必要な持ち物はありますか。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n基本的な道具はすべてこちらでご用意しております。\n必要に応じて、汚れてもよい服装でお越しください。\n\nほかにも気になる点があればご連絡ください。"
    },
    {
      id: 2003,
      name: "青木 春香",
      email: "haruka@example.com",
      phone: "070-9876-5432",
      date: "2026-03-31",
      subject: "団体利用の可否",
      status: "完了",
      message: "会社の研修での利用は可能でしょうか。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n団体利用にも対応しております。\n人数や希望日時をお知らせいただければ、個別にご案内いたします。\n\n必要であればお見積りもお送りします。"
    },
    {
      id: 2004,
      name: "佐々木 真央",
      email: "mao@example.com",
      phone: "090-8765-4321",
      date: "2026-04-01",
      subject: "キャンセルポリシーについて",
      status: "未対応",
      message: "体調不良時のキャンセル料について確認したいです。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n体調不良などやむを得ない事情の場合は、まずはお早めにご連絡ください。\nキャンセル料の扱いについては、ご予約状況を確認のうえ個別にご案内しております。\n\nご不安な点があれば遠慮なくご相談ください。"
    },
    {
      id: 2005,
      name: "田本 蓮",
      email: "ren@example.com",
      phone: "080-7654-3210",
      date: "2026-04-02",
      subject: "子ども連れの参加",
      status: "対応中",
      message: "5歳の子ども連れでの参加は可能ですか。平日希望です。",
      replySubject: "お問い合わせありがとうございます",
      replyMessage: "お問い合わせありがとうございます。\n\n5歳のお子さま連れでのご参加について、日程によりご案内可能です。\n平日の候補日を確認して、折り返しご連絡いたします。\n\n少しお時間をください。"
    }
  ];

  const reservationState = {
    upcomingPage: 1,
    visitedPage: 1,
    upcomingItems: [],
    visitedItems: []
  };
  const inquiryState = {
    pendingPage: 1,
    handledPage: 1,
    pendingItems: [],
    handledItems: []
  };
  const trashState = { page: 1, items: [] };

  const views = Array.from(document.querySelectorAll("[data-view-panel]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const todayReservationsCard = document.querySelector("#today-reservations-card");
  const sidebarCount = document.querySelector("#sidebar-count");
  const sidebarCaption = document.querySelector("#sidebar-caption");

  const reservationElements = {
    viewPanels: Array.from(document.querySelectorAll("[data-reservation-panel]")),
    viewToggles: Array.from(document.querySelectorAll("[data-reservation-toggle]")),
    upcomingTbody: document.querySelector("#upcoming-reservation-tbody"),
    visitedTbody: document.querySelector("#visited-reservation-tbody"),
    upcomingResultCount: document.querySelector("#upcoming-reservation-result-count"),
    visitedResultCount: document.querySelector("#visited-reservation-result-count"),
    keyword: document.querySelector("#search-keyword"),
    date: document.querySelector("#filter-date"),
    status: document.querySelector("#filter-status"),
    sort: document.querySelector("#filter-sort"),
    reset: document.querySelector("#reset-filter-btn"),
    upcomingPrev: document.querySelector("#upcoming-reservation-prev-page"),
    upcomingNext: document.querySelector("#upcoming-reservation-next-page"),
    upcomingPageNumbers: document.querySelector("#upcoming-reservation-page-numbers"),
    visitedPrev: document.querySelector("#visited-reservation-prev-page"),
    visitedNext: document.querySelector("#visited-reservation-next-page"),
    visitedPageNumbers: document.querySelector("#visited-reservation-page-numbers"),
    modal: document.querySelector("#reservation-modal"),
    modalTitle: document.querySelector("#reservation-modal-title"),
    form: document.querySelector("#reservation-form"),
    newButton: document.querySelector("#new-reservation-btn"),
    closeButton: document.querySelector("#close-reservation-modal"),
    deleteButton: document.querySelector("#delete-reservation-btn"),
    completeButton: document.querySelector("#complete-reservation-btn")
  };

  const inquiryElements = {
    viewPanels: Array.from(document.querySelectorAll("[data-inquiry-panel]")),
    viewToggles: Array.from(document.querySelectorAll("[data-inquiry-toggle]")),
    pendingTbody: document.querySelector("#pending-inquiry-tbody"),
    handledTbody: document.querySelector("#handled-inquiry-tbody"),
    pendingResultCount: document.querySelector("#pending-inquiry-result-count"),
    handledResultCount: document.querySelector("#handled-inquiry-result-count"),
    keyword: document.querySelector("#inquiry-search-keyword"),
    date: document.querySelector("#inquiry-filter-date"),
    status: document.querySelector("#inquiry-filter-status"),
    reset: document.querySelector("#inquiry-reset-filter-btn"),
    pendingPrev: document.querySelector("#pending-inquiry-prev-page"),
    pendingNext: document.querySelector("#pending-inquiry-next-page"),
    pendingPageNumbers: document.querySelector("#pending-inquiry-page-numbers"),
    handledPrev: document.querySelector("#handled-inquiry-prev-page"),
    handledNext: document.querySelector("#handled-inquiry-next-page"),
    handledPageNumbers: document.querySelector("#handled-inquiry-page-numbers"),
    modal: document.querySelector("#inquiry-modal"),
    modalTitle: document.querySelector("#inquiry-modal-title"),
    form: document.querySelector("#inquiry-form"),
    newButton: document.querySelector("#new-inquiry-btn"),
    closeButton: document.querySelector("#close-inquiry-modal"),
    deleteButton: document.querySelector("#delete-inquiry-btn"),
    completeButton: document.querySelector("#complete-inquiry-btn"),
    replyButton: document.querySelector("#reply-inquiry-btn")
  };
  const trashElements = {
    tbody: document.querySelector("#trash-tbody"),
    resultCount: document.querySelector("#trash-result-count"),
    prev: document.querySelector("#trash-prev-page"),
    next: document.querySelector("#trash-next-page"),
    pageNumbers: document.querySelector("#trash-page-numbers")
  };

  if (!reservationElements.upcomingTbody || !reservationElements.visitedTbody || !inquiryElements.pendingTbody || !inquiryElements.handledTbody || !trashElements.tbody) {
    return;
  }

  function normalizeArray(raw, seed) {
    if (!raw) return [...seed];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [...seed];
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

  function loadReservationTrash() {
    return normalizeArray(localStorage.getItem(reservationTrashStorageKey), []);
  }

  function saveReservationTrash(items) {
    localStorage.setItem(reservationTrashStorageKey, JSON.stringify(items));
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
    const todayItems = items
      .filter((item) => item.date === getToday() && item.status !== reservationStatusCancelled)
      .sort((left, right) => `${left.date} ${left.time}`.localeCompare(`${right.date} ${right.time}`));

    if (sidebarCount) {
      sidebarCount.textContent = `${todayItems.length}件`;
    }

    if (sidebarCaption) {
      sidebarCaption.textContent = todayItems.length > 0
        ? `${todayItems[0].time} から予約あり`
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

  function sortReservations(items, sortMode) {
    return [...items].sort((left, right) => {
      const leftKey = `${left.date} ${left.time}`;
      const rightKey = `${right.date} ${right.time}`;
      if (sortMode === "reservation-date-asc") return leftKey.localeCompare(rightKey);
      if (sortMode === "oldest") return left.id - right.id;
      return rightKey.localeCompare(leftKey) || right.id - left.id;
    });
  }

  function renderReservationTable(items, tbody, countLabel, prevButton, nextButton, pageNumbers, currentPage, onPageMove) {
    const visibleItems = items.slice(0, reservationMaxItems);
    const totalPages = Math.max(1, Math.ceil(visibleItems.length / reservationPageSize));
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * reservationPageSize;
    const pagedItems = visibleItems.slice(start, start + reservationPageSize);

    if (pagedItems.length === 0) {
      tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="7">該当する予約はありません</td>
        </tr>
      `;
    } else {
      tbody.innerHTML = pagedItems.map((item) => `
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
    }

    countLabel.textContent = `${visibleItems.length}件を表示中`;
    prevButton.disabled = safePage <= 1;
    nextButton.disabled = safePage >= totalPages;
    buildPagination(pageNumbers, totalPages, safePage, onPageMove);

    return { safePage, visibleItems };
  }

  function renderReservations() {
    const allItems = loadReservations();
    const keyword = reservationElements.keyword.value.trim().toLowerCase();
    const filterDate = reservationElements.date.value;
    const filterStatus = reservationElements.status.value;
    const sortMode = reservationElements.sort.value;

    const filteredItems = allItems.filter((item) => {
      const matchedKeyword = !keyword || [item.reservationCode, item.name, item.email, item.phone]
        .some((value) => String(value ?? "").toLowerCase().includes(keyword));
      const matchedDate = !filterDate || item.date === filterDate;
      const matchedStatus = !filterStatus || item.status === filterStatus;
      return matchedKeyword && matchedDate && matchedStatus;
    });

    const sortedItems = sortReservations(filteredItems, sortMode);
    const upcomingItems = sortedItems.filter((item) => item.status !== reservationStatusVisited);
    const visitedItems = sortedItems.filter((item) => item.status === reservationStatusVisited);

    reservationState.upcomingItems = upcomingItems;
    reservationState.visitedItems = visitedItems;

    const upcomingRender = renderReservationTable(
      upcomingItems,
      reservationElements.upcomingTbody,
      reservationElements.upcomingResultCount,
      reservationElements.upcomingPrev,
      reservationElements.upcomingNext,
      reservationElements.upcomingPageNumbers,
      reservationState.upcomingPage,
      (page) => {
        reservationState.upcomingPage = page;
        renderReservations();
      }
    );
    reservationState.upcomingPage = upcomingRender.safePage;

    const visitedRender = renderReservationTable(
      visitedItems,
      reservationElements.visitedTbody,
      reservationElements.visitedResultCount,
      reservationElements.visitedPrev,
      reservationElements.visitedNext,
      reservationElements.visitedPageNumbers,
      reservationState.visitedPage,
      (page) => {
        reservationState.visitedPage = page;
        renderReservations();
      }
    );
    reservationState.visitedPage = visitedRender.safePage;

    updateSidebarSummary(allItems);
  }

  function renderTrashReservations() {
    const items = loadReservationTrash()
      .sort((left, right) => String(right.deletedAt ?? "").localeCompare(String(left.deletedAt ?? "")) || right.id - left.id);

    const visibleItems = items.slice(0, reservationMaxItems);
    trashState.items = visibleItems;
    const totalPages = Math.max(1, Math.ceil(visibleItems.length / reservationPageSize));
    trashState.page = Math.min(trashState.page, totalPages);
    const start = (trashState.page - 1) * reservationPageSize;
    const pagedItems = visibleItems.slice(start, start + reservationPageSize);

    if (pagedItems.length === 0) {
      trashElements.tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="6">ゴミ箱に予約はありません</td>
        </tr>
      `;
    } else {
      trashElements.tbody.innerHTML = pagedItems.map((item) => `
        <tr>
          <td class="reservation-code-cell">${escapeHtml(item.reservationCode)}</td>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.date)}</td>
          <td>${escapeHtml(item.time)}</td>
          <td>${escapeHtml(item.deletedAtLabel ?? item.deletedAt ?? "")}</td>
          <td><button type="button" class="secondary-btn trash-delete-btn" data-delete-trash="${item.id}">完全に削除</button></td>
        </tr>
      `).join("");
    }

    trashElements.resultCount.textContent = `${visibleItems.length}件を表示中`;
    trashElements.prev.disabled = trashState.page <= 1;
    trashElements.next.disabled = trashState.page >= totalPages;
    buildPagination(trashElements.pageNumbers, totalPages, trashState.page, (page) => {
      trashState.page = page;
      renderTrashReservations();
    });
  }

  function setReservationPanel(panelName) {
    reservationElements.viewPanels.forEach((panel) => {
      const isActive = panel.dataset.reservationPanel === panelName;
      panel.classList.toggle("is-active", isActive);
      panel.classList.toggle("hidden", !isActive);
    });

    reservationElements.viewToggles.forEach((toggle) => {
      const isActive = toggle.dataset.reservationToggle === panelName;
      toggle.classList.toggle("is-active", isActive);
      toggle.setAttribute("aria-pressed", String(isActive));
    });
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

    const pendingItems = items.filter((item) => item.status === "未対応");
    const handledItems = items.filter((item) => item.status !== "未対応");
    inquiryState.pendingItems = pendingItems;
    inquiryState.handledItems = handledItems;

    const renderInquiryTable = (sourceItems, tbody, countLabel, prevButton, nextButton, pageNumbers, currentPage, onPageMove) => {
      const visibleItems = sourceItems.slice(0, inquiryMaxItems);
      const totalPages = Math.max(1, Math.ceil(visibleItems.length / inquiryPageSize));
      const safePage = Math.min(currentPage, totalPages);
      const start = (safePage - 1) * inquiryPageSize;
      const pagedItems = visibleItems.slice(start, start + inquiryPageSize);

      if (pagedItems.length === 0) {
        tbody.innerHTML = `
        <tr class="empty-row">
          <td colspan="5">該当するお問い合わせはありません</td>
        </tr>
      `;
      } else {
        tbody.innerHTML = pagedItems.map((item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.date)}</td>
          <td>${escapeHtml(item.subject)}</td>
          <td>${escapeHtml(item.status)}</td>
          <td><button type="button" class="secondary-btn" data-open-inquiry="${item.id}">詳細</button></td>
        </tr>
      `).join("");
      }

      countLabel.textContent = `${visibleItems.length}件を表示中`;
      prevButton.disabled = safePage <= 1;
      nextButton.disabled = safePage >= totalPages;
      buildPagination(pageNumbers, totalPages, safePage, onPageMove);
      return safePage;
    };

    inquiryState.pendingPage = renderInquiryTable(
      pendingItems,
      inquiryElements.pendingTbody,
      inquiryElements.pendingResultCount,
      inquiryElements.pendingPrev,
      inquiryElements.pendingNext,
      inquiryElements.pendingPageNumbers,
      inquiryState.pendingPage,
      (page) => {
        inquiryState.pendingPage = page;
        renderInquiries();
      }
    );

    inquiryState.handledPage = renderInquiryTable(
      handledItems,
      inquiryElements.handledTbody,
      inquiryElements.handledResultCount,
      inquiryElements.handledPrev,
      inquiryElements.handledNext,
      inquiryElements.handledPageNumbers,
      inquiryState.handledPage,
      (page) => {
        inquiryState.handledPage = page;
        renderInquiries();
      }
    );
  }

  function setInquiryPanel(panelName) {
    inquiryElements.viewPanels.forEach((panel) => {
      const isActive = panel.dataset.inquiryPanel === panelName;
      panel.classList.toggle("is-active", isActive);
      panel.classList.toggle("hidden", !isActive);
    });

    inquiryElements.viewToggles.forEach((toggle) => {
      const isActive = toggle.dataset.inquiryToggle === panelName;
      toggle.classList.toggle("is-active", isActive);
      toggle.setAttribute("aria-pressed", String(isActive));
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
    document.querySelector("#inquiry-reply-message").value = item.replyMessage ?? "お問い合わせありがとうございます。\n\n内容を確認のうえ、順次ご連絡いたします。\nしばらくお待ちください。";
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

  function saveReservationFromForm(overrides = {}) {
    const nextItem = { ...getReservationFormValue(), ...overrides };
    const items = upsertById(loadReservations(), nextItem);
    saveReservations(items);
    return nextItem;
  }

  function moveReservationToTrash(id) {
    const reservations = loadReservations();
    const target = reservations.find((item) => item.id === id);
    if (!target) return;

    const now = new Date();
    const trashItems = loadReservationTrash();
    trashItems.unshift({
      ...target,
      deletedAt: now.toISOString(),
      deletedAtLabel: `${now.toLocaleDateString("ja-JP")} ${now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}`
    });

    saveReservationTrash(trashItems);
    saveReservations(reservations.filter((item) => item.id !== id));
  }

  function openReservationById(id) {
    const item = loadReservations().find((entry) => entry.id === id);
    if (!item) return;
    reservationElements.modalTitle.textContent = "予約詳細";
    fillReservationForm(item);
    openModal(reservationElements.modal);
  }

  reservationElements.upcomingTbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-reservation]");
    if (!button) return;
    openReservationById(Number(button.dataset.openReservation));
  });

  reservationElements.visitedTbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-reservation]");
    if (!button) return;
    openReservationById(Number(button.dataset.openReservation));
  });

  inquiryElements.pendingTbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-inquiry]");
    if (!button) return;
    const id = Number(button.dataset.openInquiry);
    const item = loadInquiries().find((entry) => entry.id === id);
    if (!item) return;
    inquiryElements.modalTitle.textContent = "お問い合わせ詳細";
    fillInquiryForm(item);
    openModal(inquiryElements.modal);
  });

  inquiryElements.handledTbody.addEventListener("click", (event) => {
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
    saveReservationFromForm();
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
    moveReservationToTrash(id);
    closeModal(reservationElements.modal);
    trashState.page = 1;
    renderReservations();
    renderTrashReservations();
  });

  inquiryElements.deleteButton.addEventListener("click", () => {
    const id = Number(document.querySelector("#inquiry-id").value);
    if (!id) return;
    const items = loadInquiries().filter((item) => item.id !== id);
    saveInquiries(items);
    closeModal(inquiryElements.modal);
    renderInquiries();
  });

  trashElements.tbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-trash]");
    if (!button) return;
    const id = Number(button.dataset.deleteTrash);
    const items = loadReservationTrash().filter((item) => item.id !== id);
    saveReservationTrash(items);
    renderTrashReservations();
  });

  reservationElements.completeButton.addEventListener("click", () => {
    saveReservationFromForm({ status: reservationStatusVisited });
    closeModal(reservationElements.modal);
    reservationState.visitedPage = 1;
    setReservationPanel("visited");
    renderReservations();
  });

  inquiryElements.completeButton.addEventListener("click", () => {
    document.querySelector("#inquiry-status").value = "完了";
    setInquiryPanel("handled");
  });

  reservationElements.viewToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setReservationPanel(toggle.dataset.reservationToggle);
    });
  });

  inquiryElements.viewToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setInquiryPanel(toggle.dataset.inquiryToggle);
    });
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

  reservationElements.upcomingPrev.addEventListener("click", () => {
    reservationState.upcomingPage = Math.max(1, reservationState.upcomingPage - 1);
    renderReservations();
  });

  reservationElements.upcomingNext.addEventListener("click", () => {
    reservationState.upcomingPage += 1;
    renderReservations();
  });

  reservationElements.visitedPrev.addEventListener("click", () => {
    reservationState.visitedPage = Math.max(1, reservationState.visitedPage - 1);
    renderReservations();
  });

  reservationElements.visitedNext.addEventListener("click", () => {
    reservationState.visitedPage += 1;
    renderReservations();
  });

  inquiryElements.pendingPrev.addEventListener("click", () => {
    inquiryState.pendingPage = Math.max(1, inquiryState.pendingPage - 1);
    renderInquiries();
  });

  inquiryElements.pendingNext.addEventListener("click", () => {
    inquiryState.pendingPage += 1;
    renderInquiries();
  });

  inquiryElements.handledPrev.addEventListener("click", () => {
    inquiryState.handledPage = Math.max(1, inquiryState.handledPage - 1);
    renderInquiries();
  });

  inquiryElements.handledNext.addEventListener("click", () => {
    inquiryState.handledPage += 1;
    renderInquiries();
  });

  trashElements.prev.addEventListener("click", () => {
    trashState.page = Math.max(1, trashState.page - 1);
    renderTrashReservations();
  });

  trashElements.next.addEventListener("click", () => {
    trashState.page += 1;
    renderTrashReservations();
  });

  [reservationElements.keyword, reservationElements.date, reservationElements.status, reservationElements.sort].forEach((element) => {
    element.addEventListener("input", () => {
      reservationState.upcomingPage = 1;
      reservationState.visitedPage = 1;
      renderReservations();
    });
    element.addEventListener("change", () => {
      reservationState.upcomingPage = 1;
      reservationState.visitedPage = 1;
      renderReservations();
    });
  });

  [inquiryElements.keyword, inquiryElements.date, inquiryElements.status].forEach((element) => {
    element.addEventListener("input", () => {
      inquiryState.pendingPage = 1;
      inquiryState.handledPage = 1;
      renderInquiries();
    });
    element.addEventListener("change", () => {
      inquiryState.pendingPage = 1;
      inquiryState.handledPage = 1;
      renderInquiries();
    });
  });

  reservationElements.reset.addEventListener("click", () => {
    reservationElements.keyword.value = "";
    reservationElements.date.value = "";
    reservationElements.status.value = "";
    reservationElements.sort.value = "newest";
    reservationState.upcomingPage = 1;
    reservationState.visitedPage = 1;
    renderReservations();
  });

  inquiryElements.reset.addEventListener("click", () => {
    inquiryElements.keyword.value = "";
    inquiryElements.date.value = "";
    inquiryElements.status.value = "";
    inquiryState.pendingPage = 1;
    inquiryState.handledPage = 1;
    renderInquiries();
  });

  navLinks.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  todayReservationsCard?.addEventListener("click", () => {
    setActiveView("reservations");
    reservationElements.date.value = getToday();
    reservationState.upcomingPage = 1;
    reservationState.visitedPage = 1;
    renderReservations();
  });

  if (!localStorage.getItem(reservationStorageKey)) {
    saveReservations(reservationSeed);
  }

  if (!localStorage.getItem(inquiryStorageKey)) {
    saveInquiries(inquirySeed);
  }

  setReservationPanel("upcoming");
  setInquiryPanel("pending");
  renderReservations();
  renderInquiries();
  renderTrashReservations();
});
