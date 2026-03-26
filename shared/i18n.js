(function () {
  const storageKey = "inoriLanguage";
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const pageIdMatch = currentPath.match(/\/(\d{2})\/[^/]+\.html$/);
  const pageId = pageIdMatch ? pageIdMatch[1] : "";
  const pageFileMatch = currentPath.match(/\/([^/]+\.html)$/);
  const pageFile = pageFileMatch ? pageFileMatch[1] : "";
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
    setTextList(".mobile-menu-nav a", ["Workshop", "Access", "Reservation", "FAQ", "Contact", "About inori"]);
    setTextList(".mobile-menu-actions .pill-btn", ["Book Workshop", "Jalan"]);
    setTextList(".footer-links a", ["ー Workshop", "ー Access", "ー Reservation", "ー FAQ", "ー Contact", "ー About inori"]);
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
    setTextList(".hero-highlight", ["About 1 hour", "JPY 5,500", "2 min from Asakusa Station", "Solo guests welcome"]);
    setText(".flow-section .section-sub", "Experience Flow");
    setText(".price-section .section-sub", "Pricing");
    setText(".schedule-section .section-sub", "Schedule");
    setText(".photos-section .section-sub", "Photos");
    setText(".reviews-section .section-sub", "Reviews");
    setText(".reservation-section .section-sub", "Reservation");
    setText(".reserve-heading", "Reservation Form");
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
    setText(".shop-info h3", "inori Asakusa");
    setTextList(".shop-info p", [
      "2-1-5 Asakusa, Taito-ku, Tokyo 111-0032",
      "2 min walk from Asakusa Station on the Tokyo Metro Ginza Line",
      "Hours: 10:30-18:30 Closed on Mondays",
      "TEL: 000-0000-0000"
    ]);
    setText(".attractions .section-sub", "Nearby Attractions");
    setText(".map-open-btn", "Open Google Maps");
  }

  function apply03() {
    if (pageFile === "check.html") {
      document.title = isEnglish() ? "inori | Reservation Lookup" : "inori | ご予約確認";
      setText(".reserve-title", "Reservation Lookup");
      setText(".reserve-heading", "Reservation Lookup");
      setTextList(".lookup-form .field-group label", ["Reservation Code", "Name"]);
      setAttr("#lookup-code", "placeholder", "INR-260401-ABC123");
      setAttr("#lookup-name", "placeholder", "Taro Yamada");
      setText(".lookup-form .next-btn", "Search");
      setText("#lookup-result-lead", "Matching reservation details are shown below.");
      setTextList(".lookup-result dt", ["Reservation Code", "Name", "Email", "Phone", "Date & Time", "Guests", "Status", "Notes"]);
      return;
    }

    document.title = isEnglish() ? "inori | Reservation" : "inori | ご予約";
    setText(".reserve-title", "Reservation");
    setText(".lookup-entry-btn", "Check Your Reservation");
    setTextList(".step", ["1. Details", "2. Payment", "3. Review", "4. Complete"]);
    setTextList(".reserve-heading", ["Reservation Form", "Payment Method", "Final Review", "Reservation Complete"]);
    setTextList(".reserve-form .field-group label", ["Name (Kana)", "Name", "Email", "Phone", "Select Date", "Guests", "Notes"]);
    setAttr("#name-kana", "placeholder", "YAMADA TARO");
    setAttr("#name", "placeholder", "Taro Yamada");
    setOptionList("#email-domain", ["gmail.com", "yahoo.co.jp", "icloud.com", "outlook.com", "hotmail.com", "Other"]);
    setTextList(".mini-label", ["Date", "Time"]);
    setOptionList("#reservation-time", ["Select", "11:00", "13:00", "15:00"]);
    setOptionList("#people", ["Select", "1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests"]);
    setHtml(".policy-text", "<strong>Cancellation Policy</strong><br>To welcome as many guests as possible, the following policy applies.<br>Cancellation the day before: 50%<br>Same-day cancellation: 100%<br>No-show: 100%<br>If you have unavoidable circumstances, please contact us in advance.");
    setText(".policy-agree", "I agree to the cancellation policy.");
    setText(".submit-wrap .next-btn", "Next");
    setText(".payment-layout .panel-lead", "Choose your payment method while reviewing your reservation details. You can check everything once more before confirming.");
    setTextList(".payment-name", ["Amazon Pay", "PayPay", "Credit Card", "Bank Transfer"]);
    setTextList(".payment-note", [
      "Proceed to Amazon Pay on the next screen.",
      "Proceed to the PayPay app on the next screen.",
      "Instant online payment with major card brands.",
      "Your reservation is confirmed after payment is received."
    ]);
    setTextList(".payment-detail label", ["Card Number", "Name on Card", "Expiry Date", "Security Code", "Account Name", "Account Number", "Planned Transfer Date"]);
    setOptionList("#card-expiry-month", ["Month", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
    setOptionList("#card-expiry-year", ["Year", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"]);
    setTextList(".button-row .back-btn", ["Back", "Back"]);
    setTextList(".button-row .next-btn", ["Next", "Confirm Reservation"]);
    setText(".payment-side-card h3", "This Reservation");
    setTextList(".mini-summary dt", ["Date & Time", "Guests", "Contact"]);
    setText(".payment-tip", "We will email you instructions based on the payment method you selected.");
    setText(".confirm-layout .panel-lead", "Please review the details below and confirm that the date, number of guests, and payment method are correct.");
    setTextList(".confirm-list dt", ["Name (Kana)", "Name", "Email", "Phone", "Date", "Guests", "Payment Method", "Notes"]);
    setText(".confirm-side-card h3", "Before You Confirm");
    setTextList(".check-list li", [
      "Please make sure your email address is correct. If there is an error, contact us by form or phone.",
      "A confirmation email and reservation code will be sent after your reservation is completed.",
      "Bank transfer reservations are finalized after payment is confirmed.",
      "If you need to make changes, you can go back and edit your details."
    ]);
    setText(".complete-message-line:first-child", "Thank you for your reservation.");
    setText(".complete-message-line:last-child", "We have received your booking.");
    setText(".complete-sub", "We will send your confirmation email shortly. Please wait a moment.");
    setTextList(".complete-summary span", ["Reservation Code", "Date & Time", "Guests", "Payment Method"]);
    setText(".top-link-btn", "Back to Top");
  }
  function apply04() {}
  function apply05() {
    document.title = isEnglish() ? "inori | FAQ" : "inori | よくあるご質問";
    setText(".faq-title", "FAQ");
  }
  function apply06() {
    document.title = isEnglish() ? "inori | Contact" : "inori | お問い合わせ";
    setText(".contact-title", "Contact");
    setText(".section-heading", "Contact Form");
    setTextList(".contact-inputs .field-group label", ["Name (Kana)", "Name", "Email", "Phone", "Message"]);
    setAttr("#name-kana", "placeholder", "YAMADA TARO");
    setAttr("#name", "placeholder", "Taro Yamada");
    setOptionList("#email-domain", ["gmail.com", "yahoo.co.jp", "icloud.com", "outlook.com", "hotmail.com", "Other"]);
    setText(".confirm-lead", "Please review the details below before sending.");
    setTextList(".confirm-list dt", ["Name (Kana)", "Name", "Email", "Phone", "Message"]);
    setTextList(".send-btn", ["Review", "Back", "Send"]);
  }
  function apply07() {
    document.title = isEnglish() ? "inori | About inori" : "inori | inoriについて";
    setText(".about-title", "About inori");
    setText(".intro .section-sub", "What is Koucho?");
    setText(".intro-lead", "# A brand built around the joy of playing with fragrance");
    setHtml(".intro-text", "Different fragrance balances create very different impressions.<br>At inori, we offer 12 carefully selected signature scents.<br>We want more people to discover that creating fragrance is easier and more enjoyable than expected.<br>That idea is at the heart of our brand.");
    setText(".scents .section-sub", "The Scent Lineup of Koucho");
    setTextList(".block-title-sub", ["12 signature scents", "4 limited seasonal scents"]);
    setTextList(".note-line", [
      "Limited scents may change depending on the season and timing.",
      "Because quantities are limited, some scents may sell out.",
      "Please check with the store or our social media for the latest updates."
    ]);
    setText(".reserve-btn", "Book Workshop");
  }

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
