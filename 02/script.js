document.addEventListener("DOMContentLoaded", () => {
  const spotGrid = document.querySelector("#spot-grid");
  const pagerLinks = Array.from(document.querySelectorAll(".pager a"));
  const pagerPrev = document.querySelector(".pager-btn.prev");
  const pagerNext = document.querySelector(".pager-btn.next");

  const attractionPages = [
    [
      {
        image: "spot-sensoji.png",
        alt: "浅草寺",
        title: "浅草寺",
        text: "雷門・仲見世通りが有名。<br>浅草観光の中心。"
      },
      {
        image: "spot-nakamise.png",
        alt: "仲見世通り",
        title: "仲見世商店街",
        text: "和菓子・雑貨・お土産が並ぶ定番<br>ストリート。"
      },
      {
        image: "spot-hanayashiki.png",
        alt: "浅草花やしき",
        title: "浅草花やしき",
        text: "日本最古の遊園地。レトロ体験。"
      },
      {
        image: "spot-sumida.png",
        alt: "隅田公園",
        title: "隅田公園",
        text: "川沿い散歩・桜が映える名所。<br>香り体験後の余韻に◎"
      }
    ],
    [
      {
        image: "spot-sensoji.png",
        alt: "雷門",
        title: "雷門",
        text: "浅草の象徴的な門。<br>写真スポットとしても人気。"
      },
      {
        image: "spot-nakamise.png",
        alt: "伝法院通り",
        title: "伝法院通り",
        text: "江戸情緒を感じる街並みで、<br>食べ歩きにもぴったり。"
      },
      {
        image: "spot-sumida.png",
        alt: "吾妻橋周辺",
        title: "吾妻橋周辺",
        text: "隅田川と街並みを一望できる<br>散策ルート。"
      },
      {
        image: "spot-hanayashiki.png",
        alt: "西参道商店街",
        title: "西参道商店街",
        text: "落ち着いた雰囲気で、<br>浅草らしい小店巡りが楽しめます。"
      }
    ],
    [
      {
        image: "spot-sumida.png",
        alt: "隅田川テラス",
        title: "隅田川テラス",
        text: "川風を感じながら歩ける、<br>開放感のある散歩道。"
      },
      {
        image: "spot-sensoji.png",
        alt: "浅草神社",
        title: "浅草神社",
        text: "浅草寺のすぐ隣にある静かな神社。<br>落ち着いた参拝におすすめ。"
      },
      {
        image: "spot-nakamise.png",
        alt: "ホッピー通り",
        title: "ホッピー通り",
        text: "下町らしい賑わいを感じられる、<br>グルメ散策の定番。"
      },
      {
        image: "spot-hanayashiki.png",
        alt: "浅草演芸ホール",
        title: "浅草演芸ホール",
        text: "落語や色物が楽しめる、<br>浅草ならではの文化スポット。"
      }
    ],
    [
      {
        image: "spot-nakamise.png",
        alt: "かっぱ橋道具街",
        title: "かっぱ橋道具街",
        text: "器やキッチン用品が並ぶ、<br>見て歩くだけでも楽しい商店街。"
      },
      {
        image: "spot-sumida.png",
        alt: "東京ミズマチ周辺",
        title: "東京ミズマチ周辺",
        text: "カフェやショップが点在する、<br>水辺の新しい散策エリア。"
      },
      {
        image: "spot-sensoji.png",
        alt: "二天門",
        title: "二天門",
        text: "浅草寺境内の歴史ある門。<br>比較的人が少なく穴場です。"
      },
      {
        image: "spot-hanayashiki.png",
        alt: "奥浅草エリア",
        title: "奥浅草",
        text: "落ち着いた路地や個人店が広がる、<br>ゆっくり歩きたいエリア。"
      }
    ],
    [
      {
        image: "spot-sumida.png",
        alt: "隅田川リバーサイド",
        title: "隅田川リバーサイド",
        text: "夕方の景色が美しく、<br>体験後の余韻を楽しめます。"
      },
      {
        image: "spot-nakamise.png",
        alt: "浅草地下商店街",
        title: "浅草地下商店街",
        text: "どこか懐かしい雰囲気が残る、<br>レトロ好きに人気のスポット。"
      },
      {
        image: "spot-sensoji.png",
        alt: "雷門通り",
        title: "雷門通り",
        text: "カフェや老舗が点在し、<br>浅草らしい街歩きを満喫できます。"
      },
      {
        image: "spot-hanayashiki.png",
        alt: "浅草六区",
        title: "浅草六区",
        text: "映画館や劇場文化の名残を感じる、<br>エンタメ色の強いエリア。"
      }
    ]
  ];

  function renderAttractionPage(index) {
    if (!spotGrid) return;

    spotGrid.innerHTML = attractionPages[index]
      .map(
        (spot) => `
          <article class="spot-card">
            <img src="${spot.image}" alt="${spot.alt}" class="spot-image" />
            <h3>${spot.title}</h3>
            <p>${spot.text}</p>
          </article>
        `
      )
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

  pagerLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      setActivePage(index);
    });
  });

  pagerPrev?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex > 0) {
      setActivePage(currentIndex - 1);
    }
  });

  pagerNext?.addEventListener("click", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    if (currentIndex < pagerLinks.length - 1) {
      setActivePage(currentIndex + 1);
    }
  });

  const initialIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
  setActivePage(initialIndex >= 0 ? initialIndex : 0);
});
