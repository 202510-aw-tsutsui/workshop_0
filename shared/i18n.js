(function () {
  const storageKey = "inoriLanguage";
  const currentPath = window.location.pathname.replace(/\\/g, "/");
  const pageIdMatch = currentPath.match(/\/(\d{2})\/index\.html$/);
  const pageId = pageIdMatch ? pageIdMatch[1] : "";

  function getLanguage() {
    return localStorage.getItem(storageKey) === "en" ? "en" : "ja";
  }

  function setLanguage(lang) {
    localStorage.setItem(storageKey, lang);
    applyLanguage();
    document.dispatchEvent(new CustomEvent("inori-language-change", { detail: { lang } }));
  }

  function text(ja, en) {
    return getLanguage() === "en" ? en : ja;
  }

  function setText(selector, ja, en) {
    const node = document.querySelector(selector);
    if (!node) return;
    const textNodes = Array.from(node.childNodes).filter((child) => child.nodeType === Node.TEXT_NODE);
    if (textNodes.length > 0) {
      const target = node.querySelector("input") ? textNodes[textNodes.length - 1] : textNodes[0];
      target.textContent = text(ja, en);
      return;
    }
    node.textContent = text(ja, en);
  }

  function setHtml(selector, ja, en) {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = text(ja, en);
  }

  function setAttr(selector, attr, ja, en) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute(attr, text(ja, en));
  }

  function setTextList(selector, jaList, enList) {
    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach((node, index) => {
      const ja = jaList[index];
      const en = enList[index];
      if (ja !== undefined && en !== undefined) {
        const textNodes = Array.from(node.childNodes).filter((child) => child.nodeType === Node.TEXT_NODE);
        if (textNodes.length > 0) {
          const target = node.querySelector("input") ? textNodes[textNodes.length - 1] : textNodes[0];
          target.textContent = text(ja, en);
        } else {
          node.textContent = text(ja, en);
        }
      }
    });
  }

  function setOptionList(selector, jaList, enList) {
    const nodes = Array.from(document.querySelectorAll(`${selector} option`));
    nodes.forEach((node, index) => {
      const ja = jaList[index];
      const en = enList[index];
      if (ja !== undefined && en !== undefined) {
        node.textContent = text(ja, en);
      }
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
      setLanguage(getLanguage() === "ja" ? "en" : "ja");
    });
    snsIcons.appendChild(button);
  }

  function applyCommon() {
    document.body.dataset.lang = getLanguage();
    setText(".header-actions .pill-btn.white", "体験予約はこちら", "Book Workshop");
    setText(".header-actions .pill-btn.orange", "じゃらん", "Jalan");
    setTextList(".gnav a",
      ["ワークショップ", "アクセス", "ご予約", "よくあるご質問", "お問い合わせ", "inoriについて"],
      ["Workshop", "Access", "Reservation", "FAQ", "Contact", "About inori"]);
    setTextList(".footer-links a",
      ["ワークショップ", "アクセス", "お問い合わせ", "ご予約", "よくあるご質問", "inoriについて"],
      ["Workshop", "Access", "Contact", "Reservation", "FAQ", "About inori"]);
    setText(".footer-actions .pill-btn.white", "体験予約はこちら", "Book Workshop");
    setText(".footer-actions .pill-btn.orange", "お問い合わせ", "Contact");
    setTextList(".required", ["必須", "必須", "必須", "必須", "必須", "必須", "必須", "必須", "必須", "必須", "必須", "必須"], ["Required", "Required", "Required", "Required", "Required", "Required", "Required", "Required", "Required", "Required", "Required", "Required"]);
    setTextList(".optional", ["任意", "任意", "任意", "任意"], ["Optional", "Optional", "Optional", "Optional"]);
  }

  function apply01() {
    document.title = text("inori | ワークショップ", "inori | Workshop");
    setText(".access-title", "ワークショップ", "Workshop");
    setText(".hero-heading", "浅草で、世界にひとつの香りを。", "Create a one-of-a-kind scent in Asakusa.");
    setText(".hero-subcopy", "-浅草で叶える、わたしだけのオリジナル香水づくり-", "-Craft your own original perfume in Asakusa-");
    setText(".hero-cta", "体験予約はこちら", "Book Workshop");
    setText(".flow-section .section-sub", "ご体験の流れ", "Experience Flow");
    setText(".price-section .section-sub", "料金", "Pricing");
    setText(".schedule-section .section-sub", "日程", "Schedule");
    setText(".photos-section .section-sub", "写真", "Photos");
    setText(".reviews-section .section-sub", "レビュー", "Reviews");
    setText(".reservation-section .section-sub", "予約", "Reservation");
    setText(".reserve-heading", "予約フォーム", "Reservation Form");
    setTextList(".flow-text strong",
      ["① 集合・受付の様子", "② 体験準備・移動", "③ 体験中①", "④ 体験中②"],
      ["1. Check-in", "2. Prepare & Move", "3. Blending", "4. Finish & Take Home"]);
    setHtml(".flow-list article:nth-child(1) .flow-text", "<strong>① 集合・受付の様子</strong><br>レジカウンターにて受付をお願いします", "<strong>1. Check-in</strong><br>Please check in at the front counter.");
    setHtml(".flow-list article:nth-child(2) .flow-text", "<strong>② 体験準備・移動</strong><br>数種類の香料からお好きな香りをセレクト", "<strong>2. Prepare & Move</strong><br>Select your favorite notes from a curated scent lineup.");
    setHtml(".flow-list article:nth-child(3) .flow-text", "<strong>③ 体験中①</strong><br>選んだ香料をブレンド", "<strong>3. Blending</strong><br>Blend the notes you selected.");
    setHtml(".flow-list article:nth-child(4) .flow-text", "<strong>④ 体験中②</strong><br>あなただけのオリジナル香水として<br>お持ち帰りいただけます", "<strong>4. Finish & Take Home</strong><br>Take home your own original perfume.");
    setTextList(".price-label",
      ["料金", "制作物", "当日持ち帰り", "レクチャー", "写真サービス", "制作個数"],
      ["Price", "Item", "Take Home", "Lesson", "Photo Service", "Quantity"]);
    setHtml(".price-row:nth-child(1) .price-value", "おひとりさま <strong>￥５５００</strong>", "Per person <strong>JPY 5,500</strong>");
    setText(".price-row:nth-child(2) .price-value", "オードトワレ", "Eau de Toilette");
    setText(".price-row:nth-child(3) .price-value", "あり", "Available");
    setText(".price-row:nth-child(4) .price-value", "あり", "Included");
    setText(".price-row:nth-child(5) .price-value", "なし", "Not included");
    setText(".price-row:nth-child(6) .price-value", "1個まで", "Up to 1 bottle");
    setHtml(".schedule-box:nth-child(1)", "ご体験日<br>土・日・祝", "Available Days<br>Sat / Sun / Holidays");
    setHtml(".schedule-box:nth-child(2)", "ご予約時間<br>11:00 / 13:00 / 15:00", "Time Slots<br>11:00 / 13:00 / 15:00");
    setHtml(".schedule-box:nth-child(3)", "所要時間<br>約1時間", "Duration<br>About 1 hour");
    setTextList(".legend-item", ["空き", "残り僅か", "満席"], ["Available", "Few left", "Full"]);
    setHtml(".schedule-note", "※10分前にはお店にて受付をお願いいたします。<br>お客様が揃っていなくても開始時間にはワークを始めます。<br><br>※ワークショップ不参加での同伴はお席の都合上お断りしております。", "Please arrive 10 minutes before your reservation.<br>The workshop starts on time even if all guests have not arrived yet.<br><br>Companions who do not join the workshop are not allowed due to limited seating.");
    setTextList(".field-group label",
      ["お名前（フリガナ）", "お名前", "メールアドレス", "メールアドレス(確認のため再度ご入力ください)", "電話番号", "日程選択", "参加人数", "備考欄"],
      ["Name (Kana)", "Name", "Email", "Confirm Email", "Phone", "Reservation Date", "Guests", "Notes"]);
    setTextList(".mini-label",
      ["セイ", "メイ", "姓", "名", "日程", "時間"],
      ["Last", "First", "Last", "First", "Date", "Time"]);
    setAttr("#last-name-kana", "placeholder", "ヤマダ", "YAMADA");
    setAttr("#first-name-kana", "placeholder", "タロウ", "TARO");
    setAttr("#last-name", "placeholder", "山田", "Yamada");
    setAttr("#first-name", "placeholder", "太郎", "Taro");
    setAttr("#people", "placeholder", "〇人", "Guests");
    setOptionList("#reservation-time", ["選択してください", "11:00", "13:00", "15:00"], ["Select", "11:00", "13:00", "15:00"]);
    setHtml(".policy-text", "<strong>キャンセルポリシー</strong><br>多くのお客様に体験いただくため、以下の規定を設けております。<br>・前日キャンセル：50％<br>・当日キャンセル：100％<br>・無断キャンセル：100％", "<strong>Cancellation Policy</strong><br>To welcome as many guests as possible, the following policy applies.<br>Cancellation the day before: 50%<br>Same-day cancellation: 100%<br>No-show: 100%");
    setText(".policy-agree", "キャンセルポリシーに同意します。", "I agree to the cancellation policy.");
    setText(".submit-wrap .next-btn", "次へ", "Next");
  }

  function apply02() {
    document.title = text("inori | アクセス", "inori | Access");
    setText(".access-title", "アクセス", "Access");
    setHtml(".shop-info h3", text("inori 浅草店", "inori Asakusa"), text("inori 浅草店", "inori Asakusa"));
    setText(".attractions .section-sub", "周辺観光スポット", "Nearby Attractions");
    setText(".map-open-btn", "Google Mapを開く", "Open Google Maps");
  }

  function apply03() {
    document.title = text("inori | ご予約", "inori | Reservation");
    setText(".reserve-title", "ご予約", "Reservation");
    setTextList(".step", ["①入力", "②決済", "③確認", "④完了"], ["1. Details", "2. Payment", "3. Review", "4. Done"]);
    setText(".flow-panel[data-panel='1'] .reserve-heading", "予約フォーム", "Reservation Form");
    setText(".flow-panel[data-panel='2'] .reserve-heading", "お支払方法", "Payment Method");
    setText(".flow-panel[data-panel='3'] .reserve-heading", "最終確認画面", "Final Review");
    setText(".flow-panel[data-panel='4'] .reserve-heading", "ご予約完了画面", "Reservation Complete");
    setText(".payment-side-card h3", "今回のご予約", "Reservation Summary");
    setText(".confirm-side-card h3", "確定前のご案内", "Before You Confirm");
    setTextList(".flow-panel[data-panel='1'] .field-group label",
      ["お名前（フリガナ）", "お名前", "メールアドレス", "メールアドレス(確認のため再度ご入力ください)", "電話番号", "日程選択", "参加人数", "備考欄"],
      ["Name (Kana)", "Name", "Email", "Confirm Email", "Phone", "Reservation Date", "Guests", "Notes"]);
    setTextList(".flow-panel[data-panel='1'] .mini-label",
      ["セイ", "メイ", "姓", "名", "日程", "時間"],
      ["Last", "First", "Last", "First", "Date", "Time"]);
    setAttr("#last-name-kana", "placeholder", "ヤマダ", "YAMADA");
    setAttr("#first-name-kana", "placeholder", "タロウ", "TARO");
    setAttr("#last-name", "placeholder", "山田", "Yamada");
    setAttr("#first-name", "placeholder", "太郎", "Taro");
    setAttr("#people", "placeholder", "〇人", "Guests");
    setOptionList("#reservation-time", ["選択してください", "11:00", "13:00", "15:00"], ["Select", "11:00", "13:00", "15:00"]);
    setHtml(".flow-panel[data-panel='1'] .policy-text", "<strong>キャンセルポリシー</strong><br>多くのお客様に体験いただくため、以下の規定を設けております。<br>・前日キャンセル：50％<br>・当日キャンセル：100％<br>・無断キャンセル：100％<br>やむを得ない事情がある場合は、事前にご相談ください。", "<strong>Cancellation Policy</strong><br>To welcome as many guests as possible, the following policy applies.<br>Cancellation the day before: 50%<br>Same-day cancellation: 100%<br>No-show: 100%<br>Please contact us in advance if unavoidable circumstances arise.");
    setText(".flow-panel[data-panel='1'] .policy-agree", "キャンセルポリシーに同意します。", "I agree to the cancellation policy.");
    setText(".flow-panel[data-panel='1'] .submit-wrap .next-btn", "次へ", "Next");
    setText(".flow-panel[data-panel='2'] .panel-lead", "予約内容を確認しながら、お支払方法を選択してください。確定前に最終確認画面でもう一度見直せます。", "Please choose your payment method while reviewing your reservation. You can check everything once more before confirming.");
    setTextList(".flow-panel[data-panel='2'] .payment-name",
      ["Amazon Pay", "PayPay", "クレジットカード", "銀行振込"],
      ["Amazon Pay", "PayPay", "Credit Card", "Bank Transfer"]);
    setTextList(".flow-panel[data-panel='2'] .payment-note",
      ["次の画面でAmazon Payへ遷移してお支払い", "次の画面でPayPayアプリへ遷移してお支払い", "オンラインで即時決済。主要ブランド対応", "事前入金の確認後に予約確定となります"],
      ["Pay on the next screen via Amazon Pay", "Pay on the next screen via the PayPay app", "Instant online payment with major card brands", "Reservation is confirmed after payment is received"]);
    setText(".flow-panel[data-panel='2'] .back-btn", "戻る", "Back");
    setText(".flow-panel[data-panel='2'] .next-btn", "次へ", "Next");
    setText(".flow-panel[data-panel='3'] .panel-lead", "以下の内容でご予約を確定します。日時・人数・お支払方法にお間違いがないかご確認ください。", "Please confirm your reservation details below, including date, number of guests, and payment method.");
    setText(".flow-panel[data-panel='3'] .back-btn", "戻る", "Back");
    setText("#complete-btn", "予約を確定する", "Confirm Reservation");
    setText(".top-link-btn", "トップへ戻る", "Back to Top");
  }

  function apply04() {
    document.title = text("inori | ご予約（決済）", "inori | Reservation");
    setText(".reserve-title", "ご予約", "Reservation");
    setTextList(".step", ["①入力", "②決済", "③確認", "④完了"], ["1. Details", "2. Payment", "3. Review", "4. Done"]);
    setText(".flow-panel[data-panel='1'] .section-heading", "予約フォーム", "Reservation Form");
    setText(".flow-panel[data-panel='2'] .section-heading", "お支払方法", "Payment Method");
    setText(".flow-panel[data-panel='3'] .section-heading", "最終確認", "Final Review");
    setText(".flow-panel[data-panel='4'] .section-heading", "予約完了", "Reservation Complete");
    setTextList(".flow-panel[data-panel='1'] .field-group label",
      ["お名前（フリガナ）", "お名前", "メールアドレス", "メールアドレス(確認のため再度ご入力ください)", "電話番号", "日程選択", "参加人数", "備考欄"],
      ["Name (Kana)", "Name", "Email", "Confirm Email", "Phone", "Reservation Date", "Guests", "Notes"]);
    setTextList(".flow-panel[data-panel='1'] .mini-label",
      ["セイ", "メイ", "姓", "名", "日程", "時間"],
      ["Last", "First", "Last", "First", "Date", "Time"]);
    setAttr("#last-name-kana", "placeholder", "ヤマダ", "YAMADA");
    setAttr("#first-name-kana", "placeholder", "タロウ", "TARO");
    setAttr("#last-name", "placeholder", "山田", "Yamada");
    setAttr("#first-name", "placeholder", "太郎", "Taro");
    setAttr("#people", "placeholder", "2人", "2 guests");
    setText(".flow-panel[data-panel='1'] .policy-agree", "キャンセルポリシーに同意します。", "I agree to the cancellation policy.");
    setText(".flow-panel[data-panel='1'] .submit-wrap .next-btn", "次へ", "Next");
    setTextList(".flow-panel[data-panel='2'] .payment-name",
      ["Amazon Pay", "PayPay", "クレジットカード", "銀行振込"],
      ["Amazon Pay", "PayPay", "Credit Card", "Bank Transfer"]);
    setText(".flow-panel[data-panel='2'] .back-btn", "戻る", "Back");
    setText(".flow-panel[data-panel='2'] .next-btn", "次へ", "Next");
    setText(".flow-panel[data-panel='3'] .back-btn", "戻る", "Back");
    setText("#complete-btn", "予約を確定する", "Confirm Reservation");
    setText(".top-link-btn", "トップへ戻る", "Back to Top");
  }

  function apply05() {
    document.title = text("inori | よくあるご質問", "inori | FAQ");
    setText(".faq-title", "よくあるご質問", "FAQ");
  }

  function apply06() {
    document.title = text("inori | お問い合わせ", "inori | Contact");
    setText(".contact-title", "お問い合わせ", "Contact");
    setText(".section-heading", "お問い合わせフォーム", "Contact Form");
    setTextList(".field-group label",
      ["お名前（フリガナ）", "お名前", "メールアドレス", "メールアドレス(確認のため再度ご入力ください)", "電話番号", "お問い合わせ内容"],
      ["Name (Kana)", "Name", "Email", "Confirm Email", "Phone", "Message"]);
    setTextList(".mini-label", ["セイ", "メイ", "姓", "名"], ["Last", "First", "Last", "First"]);
    setAttr("#last-kana", "placeholder", "ヤマダ", "YAMADA");
    setAttr("#first-kana", "placeholder", "タロウ", "TARO");
    setAttr("#last-name", "placeholder", "山田", "Yamada");
    setAttr("#first-name", "placeholder", "太郎", "Taro");
    setHtml(".policy-text", "<strong>キャンセルポリシー</strong><br>多くのお客様に体験いただくため、以下の規定を設けております。<br>・前日キャンセル：50％<br>・当日キャンセル：100％<br>・無断キャンセル：100％<br>やむを得ない事情がある場合は、事前にご相談ください。", "<strong>Cancellation Policy</strong><br>To welcome as many guests as possible, the following policy applies.<br>Cancellation the day before: 50%<br>Same-day cancellation: 100%<br>No-show: 100%<br>Please contact us in advance if unavoidable circumstances arise.");
    setText(".policy-agree", "キャンセルポリシーに同意します。", "I agree to the cancellation policy.");
    setText(".send-btn", "送信", "Send");
  }

  function apply07() {
    document.title = text("inori | inoriについて", "inori | About inori");
    setText(".about-title", "inoriについて", "About inori");
    setText(".intro .section-sub", "コウチョウってなぁに？", "What is Koucho?");
    setText(".intro-lead", "# 香りであそぼをテーマにしたブランド", "# A brand themed around playful fragrance");
    setHtml(".intro-text", "香りのバランスによって、それぞれ異なる印象が生まれます。<br>inoriでは、厳選した香料を用いて12種類の香りをご用意しています。<br>「香り作りって、意外と簡単で、楽しい！」ということを<br>より知って楽しんでもらえる、そんなブランドです。", "Different balances of fragrance create completely different impressions.<br>At inori, we offer 12 carefully selected scents for blending.<br>We want more people to discover that creating fragrance can be easy and enjoyable.<br>That is the spirit behind our brand.");
    setHtml(".block-title", "<span class='accent'>コウチョウ</span>香調　定番１２種類の香り", "<span class='accent'>Koucho</span> Signature 12 Scents");
    setHtml(".block-title.second", "<span class='accent'>コウチョウ</span>香調　限定４種類の香り", "<span class='accent'>Koucho</span> Limited 4 Scents");
    setHtml(".note", "※限定の香りは、季節や時期により内容が変更となる場合がございます。<br>また、数量に限りがあるため、売り切れとなる場合もございます。<br>最新の情報や各種情報は店舗またはSNSにてご確認ください。", "Limited scents may change depending on the season and availability.<br>They may also sell out once stock runs out.<br>Please check the latest updates in-store or on social media.");
    setText(".reserve-btn", "体験予約はこちら", "Book Workshop");
  }

  function applyLanguage() {
    if (!document.body) return;
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
    t: text,
    applyLanguage
  };

  document.addEventListener("DOMContentLoaded", () => {
    injectToggle();
    applyLanguage();
  });
})();
