(function () {
  const storageKey = "inoriLanguage";
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const pageIdMatch = currentPath.match(/\/(\d{2})\/index\.html$/);
  const pageId = pageIdMatch ? pageIdMatch[1] : "";
  const textCache = new WeakMap();
  const htmlCache = new WeakMap();
  const attrCache = new WeakMap();

  function getLanguage() {
    return localStorage.getItem(storageKey) === "en" ? "en" : "ja";
  }

  function isEnglish() {
    return getLanguage() === "en";
  }

  function setLanguage(lang) {
    localStorage.setItem(storageKey, lang === "en" ? "en" : "ja");
    applyLanguage();
    document.dispatchEvent(new CustomEvent("inori-language-change", { detail: { lang: getLanguage() } }));
  }

  function t(ja, en) {
    return isEnglish() ? en : ja;
  }

  function getPrimaryTextNode(node) {
    const textNodes = Array.from(node.childNodes).filter((child) => child.nodeType === Node.TEXT_NODE);
    if (textNodes.length === 0) {
      return null;
    }
    return node.querySelector("input") ? textNodes[textNodes.length - 1] : textNodes[0];
  }

  function setText(selector, enText) {
    const node = document.querySelector(selector);
    if (!node) return;

    const textNode = getPrimaryTextNode(node);
    if (textNode) {
      if (!textCache.has(textNode)) {
        textCache.set(textNode, textNode.textContent);
      }
      textNode.textContent = isEnglish() ? enText : textCache.get(textNode);
      return;
    }

    if (!textCache.has(node)) {
      textCache.set(node, node.textContent);
    }
    node.textContent = isEnglish() ? enText : textCache.get(node);
  }

  function setHtml(selector, enHtml) {
    const node = document.querySelector(selector);
    if (!node) return;

    if (!htmlCache.has(node)) {
      htmlCache.set(node, node.innerHTML);
    }
    node.innerHTML = isEnglish() ? enHtml : htmlCache.get(node);
  }

  function setAttr(selector, attr, enValue) {
    const node = document.querySelector(selector);
    if (!node) return;

    let cache = attrCache.get(node);
    if (!cache) {
      cache = {};
      attrCache.set(node, cache);
    }
    if (!(attr in cache)) {
      cache[attr] = node.getAttribute(attr) ?? "";
    }
    node.setAttribute(attr, isEnglish() ? enValue : cache[attr]);
  }

  function setTextList(selector, enList) {
    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach((node, index) => {
      if (enList[index] === undefined) return;
      if (!node.dataset.i18nKey) {
        node.dataset.i18nKey = `${selector}:${index}`;
      }
      setText(`[data-i18n-key="${node.dataset.i18nKey}"]`, enList[index]);
    });
  }

  function setOptionList(selector, enList) {
    const nodes = Array.from(document.querySelectorAll(`${selector} option`));
    nodes.forEach((node, index) => {
      if (enList[index] === undefined) return;
      if (!textCache.has(node)) {
        textCache.set(node, node.textContent);
      }
      node.textContent = isEnglish() ? enList[index] : textCache.get(node);
    });
  }

  function injectToggle() {
    const snsIcons = document.querySelector(".sns-icons");
    if (!snsIcons || snsIcons.querySelector(".lang-toggle")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "lang-toggle";
    button.textContent = "JP/EN";
    button.setAttribute("aria-label", "Toggle language");
    button.addEventListener("click", () => {
      setLanguage(isEnglish() ? "ja" : "en");
    });
    snsIcons.appendChild(button);
  }

  function applyCommon() {
    if (!document.body) return;
    document.body.dataset.lang = getLanguage();

    setText(".header-actions .pill-btn.white", "Book Workshop");
    setText(".header-actions .pill-btn.orange", "Jalan");
    setTextList(".gnav a", ["Workshop", "Access", "Reservation", "FAQ", "Contact", "About inori"]);
    setTextList(".footer-links a", ["Workshop", "Access", "Contact", "Reservation", "FAQ", "About inori"]);
    setText(".footer-actions .pill-btn.white", "Book Workshop");
    setText(".footer-actions .pill-btn.orange", "Contact");
    setTextList(".required", new Array(12).fill("Required"));
    setTextList(".optional", new Array(4).fill("Optional"));
  }

  function apply01() {
    document.title = isEnglish() ? "inori | Workshop" : "inori | ワークショップ";
    setText(".access-title", "Workshop");
    setText(".hero-heading", "Create a one-of-a-kind scent in Asakusa.");
    setText(".hero-subcopy", "-Craft your own original perfume in Asakusa-");
    setText(".hero-cta", "Book Workshop");
    setText(".flow-section .section-sub", "Experience Flow");
    setText(".price-section .section-sub", "Pricing");
    setText(".schedule-section .section-sub", "Schedule");
    setText(".photos-section .section-sub", "Photos");
    setText(".reviews-section .section-sub", "Reviews");
    setText(".reservation-section .section-sub", "Reservation");
    setText(".reserve-heading", "Reservation Form");
    setTextList(".flow-text strong", ["1. Check-in", "2. Prepare & Move", "3. Blending", "4. Finish & Take Home"]);
    setHtml(".flow-list article:nth-child(1) .flow-text", "<strong>1. Check-in</strong><br>Please check in at the front counter.");
    setHtml(".flow-list article:nth-child(2) .flow-text", "<strong>2. Prepare & Move</strong><br>Select your favorite notes from a curated scent lineup.");
    setHtml(".flow-list article:nth-child(3) .flow-text", "<strong>3. Blending</strong><br>Blend the notes you selected.");
    setHtml(".flow-list article:nth-child(4) .flow-text", "<strong>4. Finish & Take Home</strong><br>Take home your own original perfume.");
    setTextList(".price-label", ["Price", "Item", "Take Home", "Lesson", "Photo Service", "Quantity"]);
    setHtml(".price-row:nth-child(1) .price-value", "Per person <strong>JPY 5,500</strong>");
    setText(".price-row:nth-child(2) .price-value", "Eau de Toilette");
    setText(".price-row:nth-child(3) .price-value", "Available");
    setText(".price-row:nth-child(4) .price-value", "Included");
    setText(".price-row:nth-child(5) .price-value", "Not included");
    setText(".price-row:nth-child(6) .price-value", "Up to 1 bottle");
    setHtml(".schedule-box:nth-child(1)", "Available Days<br>Sat / Sun / Holidays");
    setHtml(".schedule-box:nth-child(2)", "Time Slots<br>11:00 / 13:00 / 15:00");
    setHtml(".schedule-box:nth-child(3)", "Duration<br>About 1 hour");
    setTextList(".legend-item", ["Available", "Few left", "Full"]);
    setHtml(".schedule-note", "Please arrive 10 minutes before your reservation.<br>The workshop starts on time even if all guests have not arrived yet.<br><br>Companions who do not join the workshop are not allowed due to limited seating.");
    setTextList(".field-group label", ["Name (Kana)", "Name", "Email", "Confirm Email", "Phone", "Reservation Date", "Guests", "Notes"]);
    setTextList(".mini-label", ["Last", "First", "Last", "First", "Date", "Time"]);
    setAttr("#last-name-kana", "placeholder", "YAMADA");
    setAttr("#first-name-kana", "placeholder", "TARO");
    setAttr("#last-name", "placeholder", "Yamada");
    setAttr("#first-name", "placeholder", "Taro");
    setAttr("#people", "placeholder", "Guests");
    setOptionList("#reservation-time", ["Select", "11:00", "13:00", "15:00"]);
    setHtml(".policy-text", "<strong>Cancellation Policy</strong><br>To welcome as many guests as possible, the following policy applies.<br>Cancellation the day before: 50%<br>Same-day cancellation: 100%<br>No-show: 100%");
    setText(".policy-agree", "I agree to the cancellation policy.");
    setText(".submit-wrap .next-btn", "Next");
  }

  function apply02() {
    document.title = isEnglish() ? "inori | Access" : "inori | アクセス";
    setText(".access-title", "Access");
    setText(".attractions .section-sub", "Nearby Attractions");
    setText(".map-open-btn", "Open Google Maps");
  }

  function apply03() {}
  function apply04() {}
  function apply05() {}
  function apply06() {}
  function apply07() {}

  function applyLanguage() {
    applyCommon();
    if (pageId === "01") apply01();
    if (pageId === "02") apply02();
    if (pageId === "03") apply03();
    if (pageId === "04") apply04();
    if (pageId === "05") apply05();
    if (pageId === "06") apply06();
    if (pageId === "07") apply07();
  }

  window.InoriI18n = {
    getLanguage,
    setLanguage,
    t,
    applyLanguage
  };

  document.addEventListener("DOMContentLoaded", () => {
    injectToggle();
    applyLanguage();
  });
})();
