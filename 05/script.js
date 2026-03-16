document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.querySelector("#faq-list");
  const pagerLinks = Array.from(document.querySelectorAll(".pager a"));
  const pagerPrev = document.querySelector(".pager-btn.prev");
  const pagerNext = document.querySelector(".pager-btn.next");
  const i18n = window.InoriI18n;

  const faqPages = {
    ja: [
      [
        { question: "inori浅草店のおすすめプランは？", answer: "＼浅草で香水づくり／<br>香りを選んで自分でブレンド♪世界に一つだけのオリジナル香水をつくろう♪<br>＜カップル・女性におすすめ＞のプラン詳細", open: true },
        { question: "inori浅草店の料金・値段は？", answer: "inori浅草店の料金・値段は5,500円〜です。" },
        { question: "inori浅草店の年齢層は？", answer: "・inori浅草店の年齢層は20代が最も多いです。<br>・※クチコミ情報から、年齢層を掲載しています。参加者年齢の目安としてご利用ください。※詳細は各プランの内容をご確認ください。" },
        { question: "inori浅草店の子供の年齢は何歳が多い？", answer: "・inori浅草店の子供の年齢は13歳以上が最も多いです。<br>・※クチコミ情報から、割合が多い子供の年齢を掲載しています。参加者年齢の目安としてご利用ください。※詳細は各プランの内容をご確認ください。" }
      ],
      [
        { question: "香りづくりが初めてでも参加できますか？", answer: "はい。スタッフが香りの選び方やブレンドの進め方を一つずつご案内するので、初めての方でも安心してご参加いただけます。", open: true },
        { question: "どのくらいの種類の香りから選べますか？", answer: "定番12種類を中心に、その時期ならではの限定の香りもご用意しています。組み合わせ次第で、自分だけの印象に仕上げられます。" },
        { question: "完成した香水は当日持ち帰れますか？", answer: "はい、完成したオリジナル香水はそのまま当日お持ち帰りいただけます。旅の思い出やギフトにもおすすめです。" },
        { question: "ひとりで参加しても大丈夫ですか？", answer: "もちろんです。おひとりでゆっくり香りと向き合いたい方のご参加も多く、落ち着いた雰囲気で体験していただけます。" }
      ],
      [
        { question: "カップルや友人同士で別々の香りを作れますか？", answer: "はい。同じ回にご参加でも、それぞれお好みの香りを選んで別々のレシピでお作りいただけます。", open: true },
        { question: "予約時間の何分前に行けばよいですか？", answer: "開始10分前を目安にご来店ください。受付後、スムーズにご案内できるよう準備しています。" },
        { question: "服装や持ち物に決まりはありますか？", answer: "特別な持ち物は必要ありません。香りを試すので、強い香水のご使用は控えめにしていただくと、より繊細な違いを楽しめます。" },
        { question: "香りの好みが決まっていなくても相談できますか？", answer: "はい。さっぱり系、やわらかい花の香り、落ち着いたウッディ系など、好みに合わせてスタッフがご提案します。" }
      ]
    ],
    en: [
      [
        { question: "What is the recommended plan at inori Asakusa?", answer: "Create your own perfume in Asakusa.<br>Select your favorite notes and blend a scent that is uniquely yours.<br>A popular choice for couples and women travelers.", open: true },
        { question: "How much does the workshop cost?", answer: "The inori Asakusa workshop starts from JPY 5,500." },
        { question: "What age group usually joins?", answer: "Guests in their twenties are the most common.<br>This is based on customer review trends and should be used only as a general reference." },
        { question: "What age range is common for children?", answer: "Among family guests, ages 13 and up are the most common.<br>This is based on review trends and may vary by plan." }
      ],
      [
        { question: "Can beginners join the fragrance workshop?", answer: "Yes. Our staff guides you through each step, from choosing notes to blending, so first-time guests can join with confidence.", open: true },
        { question: "How many scents can I choose from?", answer: "We offer 12 signature scents plus a selection of limited seasonal scents. The combinations allow you to create a very personal fragrance." },
        { question: "Can I take the finished perfume home on the same day?", answer: "Yes. Your original perfume can be taken home immediately after the workshop, making it a great travel memory or gift." },
        { question: "Is it okay to join alone?", answer: "Absolutely. Many guests join solo to enjoy a calm and personal fragrance-making experience." }
      ],
      [
        { question: "Can couples or friends make different scents in the same session?", answer: "Yes. Even in the same session, each guest can choose different notes and create a completely different recipe.", open: true },
        { question: "How early should I arrive?", answer: "Please arrive about 10 minutes before your reservation time so we can guide you smoothly." },
        { question: "Is there any dress code or anything I should bring?", answer: "No special items are required. To enjoy subtle scent differences more clearly, we recommend avoiding strong perfume on the day." },
        { question: "Can I ask for advice if I am not sure what kind of scent I like?", answer: "Yes. Our staff can suggest blends based on your preferences, whether you like fresh, floral, soft, or woody notes." }
      ]
    ]
  };

  function bindFaqToggle() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const btn = item.querySelector(".faq-q");
      if (!btn) return;

      btn.addEventListener("click", () => {
        item.classList.toggle("open");
      });
    });
  }

  function renderFaqPage(index) {
    if (!faqList) return;
    const lang = i18n?.getLanguage?.() === "en" ? "en" : "ja";
    const page = faqPages[lang][index];
    if (!page) return;

    faqList.innerHTML = page.map((item) => `
      <article class="faq-item${item.open ? " open" : ""}">
        <button class="faq-q" type="button"><span class="q-badge">Q</span>${item.question}</button>
        <div class="faq-a">
          <p>${item.answer}</p>
        </div>
      </article>
    `).join("");

    bindFaqToggle();
  }

  function setActivePage(index) {
    pagerLinks.forEach((link, linkIndex) => {
      link.classList.toggle("active", linkIndex === index);
    });

    if (pagerPrev) {
      pagerPrev.disabled = index === 0;
    }

    if (pagerNext) {
      pagerNext.disabled = index === pagerLinks.length - 1;
    }

    renderFaqPage(index);
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

  document.addEventListener("inori-language-change", () => {
    const currentIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
    renderFaqPage(currentIndex >= 0 ? currentIndex : 0);
  });

  const initialIndex = pagerLinks.findIndex((link) => link.classList.contains("active"));
  setActivePage(initialIndex >= 0 ? initialIndex : 0);
});
