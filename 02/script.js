document.addEventListener("DOMContentLoaded", () => {
  const shopInfo = document.querySelector(".shop-info");
  const mapFrame = document.querySelector(".map-placeholder iframe");
  const mapOpenButton = document.querySelector(".map-open-btn");
  const spotGrid = document.querySelector("#spot-grid");
  const attractionsSection = document.querySelector(".attractions");
  const pagerLinks = Array.from(document.querySelectorAll(".pager a"));
  const pagerPrev = document.querySelector(".pager-btn.prev");
  const pagerNext = document.querySelector(".pager-btn.next");
  const i18n = window.InoriI18n;

  const attractionPages = {
    ja: [
      [
        { image: "spot-sensoji.jpg", alt: "浅草寺", title: "浅草寺", text: "雷門・仲見世通りが有名。<br>浅草観光の中心。" },
        { image: "spot-nakamise.jpg", alt: "仲見世通り", title: "仲見世商店街", text: "和菓子・雑貨・お土産が並ぶ定番<br>ストリート。" },
        { image: "spot-hanayashiki.jpg", alt: "浅草花やしき", title: "浅草花やしき", text: "日本最古の遊園地。レトロ体験。" },
        { image: "spot-sumida.jpg", alt: "隅田公園", title: "隅田公園", text: "川沿い散歩・桜が映える名所。<br>香り体験後の余韻に◎" }
      ],
      [
        { image: "雷門 2026-03-30 142333.png", alt: "雷門", title: "雷門", text: "浅草の象徴的な門。<br>写真スポットとしても人気。" },
        { image: "伝法寺2026-03-30 144507.png", alt: "伝法院通り", title: "伝法院通り", text: "江戸情緒を感じる街並みで、<br>食べ歩きにもぴったり。" },
        { image: "吾妻橋 2026-03-30 144259.png", alt: "吾妻橋周辺", title: "吾妻橋周辺", text: "隅田川と街並みを一望できる<br>散策ルート。" },
        { image: "西参道商店街2026-03-30 145225.png", alt: "西参道商店街", title: "西参道商店街", text: "落ち着いた雰囲気で、<br>浅草らしい小店巡りが楽しめます。" }
      ],
      [
        { image: "隅田川テラス2026-03-30 142413.png", alt: "隅田川テラス", title: "隅田川テラス", text: "川風を感じながら歩ける、<br>開放感のある散歩道。" },
        { image: "浅草神社2026-03-30 142158.png", alt: "浅草神社", title: "浅草神社", text: "浅草寺のすぐ隣にある静かな神社。<br>落ち着いた参拝におすすめ。" },
        { image: "ホッピー通り 2026-03-30 142003.png", alt: "ホッピー通り", title: "ホッピー通り", text: "下町らしい賑わいを感じられる、<br>グルメ散策の定番。" },
        { image: "演芸ホール2026-03-30 141536.png", alt: "浅草演芸ホール", title: "浅草演芸ホール", text: "落語や色物が楽しめる、<br>浅草ならではの文化スポット。" }
      ]
    ],
    en: [
      [
        { image: "spot-sensoji.jpg", alt: "Senso-ji", title: "Senso-ji Temple", text: "Famous for Kaminarimon and Nakamise.<br>The heart of Asakusa sightseeing." },
        { image: "spot-nakamise.jpg", alt: "Nakamise", title: "Nakamise Street", text: "A classic shopping street filled with<br>sweets, crafts, and souvenirs." },
        { image: "spot-hanayashiki.jpg", alt: "Hanayashiki", title: "Asakusa Hanayashiki", text: "Japan's oldest amusement park<br>with retro charm." },
        { image: "spot-sumida.jpg", alt: "Sumida Park", title: "Sumida Park", text: "A scenic riverside park perfect for<br>a stroll after your fragrance workshop." }
      ],
      [
        { image: "雷門 2026-03-30 142333.png", alt: "Kaminarimon", title: "Kaminarimon", text: "An iconic Asakusa landmark<br>popular for photos." },
        { image: "伝法寺2026-03-30 144507.png", alt: "Denboin Street", title: "Denboin Street", text: "A charming street with Edo atmosphere,<br>great for casual food walks." },
        { image: "吾妻橋 2026-03-30 144259.png", alt: "Azumabashi Area", title: "Azumabashi Area", text: "A walking route with wide views<br>of the Sumida River and city." },
        { image: "西参道商店街2026-03-30 145225.png", alt: "Nishi-Sando", title: "Nishi-Sando Street", text: "A quieter shopping area where you can<br>enjoy a slower side of Asakusa." }
      ],
      [
        { image: "隅田川テラス2026-03-30 142413.png", alt: "Sumida River Terrace", title: "Sumida River Terrace", text: "An open riverside promenade<br>with a fresh breeze." },
        { image: "浅草神社2026-03-30 142158.png", alt: "Asakusa Shrine", title: "Asakusa Shrine", text: "A peaceful shrine next to Senso-ji,<br>ideal for a calm visit." },
        { image: "ホッピー通り 2026-03-30 142003.png", alt: "Hoppy Street", title: "Hoppy Street", text: "A lively downtown strip loved for<br>its local food scene." },
        { image: "演芸ホール2026-03-30 141536.png", alt: "Engei Hall", title: "Asakusa Engei Hall", text: "A classic venue for rakugo and variety acts,<br>full of local culture." }
      ]
    ]
  };

  async function loadShopInfo() {
    if (!shopInfo || !mapFrame || !mapOpenButton) return;

    try {
      const response = await fetch("/api/shop");
      if (!response.ok) return;

      const shop = await response.json();
      const heading = shopInfo.querySelector("h3");
      const infoLines = shopInfo.querySelectorAll("p");
      const isEnglish = i18n?.getLanguage?.() === "en";

      if (heading && shop.name) {
        heading.textContent = isEnglish ? "inori Asakusa" : shop.name;
      }

      if (infoLines[0] && shop.postalCode && shop.address) {
        infoLines[0].textContent = isEnglish
          ? "2-1-5 Asakusa, Taito-ku, Tokyo 111-0032"
          : `〒${shop.postalCode} ${shop.address}`;
      }

      if (infoLines[1] && shop.stationAccess) {
        infoLines[1].textContent = isEnglish
          ? "2 min walk from Asakusa Station on the Tokyo Metro Ginza Line"
          : shop.stationAccess;
      }

      if (infoLines[2] && shop.businessHours) {
        if (isEnglish) {
          infoLines[2].textContent = "Hours: 10:30-18:30 Closed on Mondays";
        } else {
          const closed = shop.closedDays ? ` ※${shop.closedDays}定休日` : "";
          infoLines[2].textContent = `営業時間：${shop.businessHours}${closed}`;
        }
      }

      if (infoLines[3] && shop.tel) {
        infoLines[3].textContent = `TEL: ${shop.tel}`;
      }

      if (shop.mapEmbedUrl) {
        mapFrame.src = shop.mapEmbedUrl;
      }

      if (shop.mapLinkUrl) {
        mapOpenButton.href = shop.mapLinkUrl;
      }
    } catch {
      // Keep static content when the API is unavailable.
    }
  }

  function renderAttractionPage(index) {
    if (!spotGrid) return;
    const lang = i18n?.getLanguage?.() === "en" ? "en" : "ja";

    spotGrid.innerHTML = attractionPages[lang][index]
      .map((spot) => `
          <article class="spot-card">
            <img src="${spot.image}" alt="${spot.alt}" class="spot-image" />
            <h3>${spot.title}</h3>
            <p>${spot.text}</p>
          </article>
        `)
      .join("");
  }

  function setActivePage(index) {
    pagerLinks.forEach((link, linkIndex) => {
      link.classList.toggle("active", linkIndex === index);
    });

    renderAttractionPage(index);

    if (pagerPrev) {
      pagerPrev.disabled = index === 0;
    }

    if (pagerNext) {
      pagerNext.disabled = index === pagerLinks.length - 1;
    }
  }

  function scrollToSectionTop(section, maxWidth) {
    if (!section || window.innerWidth > maxWidth) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  pagerLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setActivePage(index);
      scrollToSectionTop(attractionsSection, 768);
    });
  });

  pagerPrev?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex > 0) {
      setActivePage(currentIndex - 1);
      scrollToSectionTop(attractionsSection, 768);
    }
  });

  pagerNext?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex < pagerLinks.length - 1) {
      setActivePage(currentIndex + 1);
      scrollToSectionTop(attractionsSection, 768);
    }
  });

  document.addEventListener("inori-language-change", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    renderAttractionPage(currentIndex >= 0 ? currentIndex : 0);
    loadShopInfo();
  });

  const initialIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
  setActivePage(initialIndex >= 0 ? initialIndex : 0);
  loadShopInfo();
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuPanel = document.querySelector("#mobile-menu-panel");
  const mobileMenuLinks = Array.from(document.querySelectorAll(".mobile-menu-panel a"));

  if (!header || !mobileMenuToggle || !mobileMenuPanel) return;

  function closeMobileMenu() {
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuPanel.hidden = true;
    header.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuPanel.hidden = isOpen;
    header.classList.toggle("menu-open", !isOpen);
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

  document.addEventListener("click", (event) => {
    if (mobileMenuPanel.hidden) return;
    const target = event.target;
    if (!(target instanceof Node) || header.contains(target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMobileMenu();
  });
});
