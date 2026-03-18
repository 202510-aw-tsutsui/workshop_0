document.addEventListener("DOMContentLoaded", () => {
  const faqCategories = document.querySelector("#faq-categories");
  const i18n = window.InoriI18n;

  const faqGroups = {
    ja: [
      {
        tag: "Category 01",
        title: "\u57fa\u672c\u60c5\u5831",
        items: [
          { question: "inori\u6d45\u8349\u5e97\u306e\u304a\u3059\u3059\u3081\u30d7\u30e9\u30f3\u306f\uff1f", answer: "\uff3c\u6d45\u8349\u3067\u9999\u6c34\u3065\u304f\u308a\uff0f<br>\u9999\u308a\u3092\u9078\u3093\u3067\u81ea\u5206\u3067\u30d6\u30ec\u30f3\u30c9\u266a\u4e16\u754c\u306b\u4e00\u3064\u3060\u3051\u306e\u30aa\u30ea\u30b8\u30ca\u30eb\u9999\u6c34\u3092\u3064\u304f\u308d\u3046\u266a<br>\uff1c\u30ab\u30c3\u30d7\u30eb\u30fb\u5973\u6027\u306b\u304a\u3059\u3059\u3081\uff1e\u306e\u30d7\u30e9\u30f3\u8a73\u7d30", open: true },
          { question: "inori\u6d45\u8349\u5e97\u306e\u6599\u91d1\u30fb\u5024\u6bb5\u306f\uff1f", answer: "inori\u6d45\u8349\u5e97\u306e\u6599\u91d1\u30fb\u5024\u6bb5\u306f5,500\u5186\u301c\u3067\u3059\u3002" },
          { question: "inori\u6d45\u8349\u5e97\u306e\u5e74\u9f62\u5c64\u306f\uff1f", answer: "\u30fbinori\u6d45\u8349\u5e97\u306e\u5e74\u9f62\u5c64\u306f20\u4ee3\u304c\u6700\u3082\u591a\u3044\u3067\u3059\u3002<br>\u30fb\u203b\u30af\u30c1\u30b3\u30df\u60c5\u5831\u304b\u3089\u3001\u5e74\u9f62\u5c64\u3092\u63b2\u8f09\u3057\u3066\u3044\u307e\u3059\u3002\u53c2\u52a0\u8005\u5e74\u9f62\u306e\u76ee\u5b89\u3068\u3057\u3066\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002\u203b\u8a73\u7d30\u306f\u5404\u30d7\u30e9\u30f3\u306e\u5185\u5bb9\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" },
          { question: "inori\u6d45\u8349\u5e97\u306e\u5b50\u4f9b\u306e\u5e74\u9f62\u306f\u4f55\u6b73\u304c\u591a\u3044\uff1f", answer: "\u30fbinori\u6d45\u8349\u5e97\u306e\u5b50\u4f9b\u306e\u5e74\u9f62\u306f13\u6b73\u4ee5\u4e0a\u304c\u6700\u3082\u591a\u3044\u3067\u3059\u3002<br>\u30fb\u203b\u30af\u30c1\u30b3\u30df\u60c5\u5831\u304b\u3089\u3001\u5272\u5408\u304c\u591a\u3044\u5b50\u4f9b\u306e\u5e74\u9f62\u3092\u63b2\u8f09\u3057\u3066\u3044\u307e\u3059\u3002\u53c2\u52a0\u8005\u5e74\u9f62\u306e\u76ee\u5b89\u3068\u3057\u3066\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002\u203b\u8a73\u7d30\u306f\u5404\u30d7\u30e9\u30f3\u306e\u5185\u5bb9\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }
        ]
      },
      {
        tag: "Category 02",
        title: "\u4f53\u9a13\u306b\u3064\u3044\u3066",
        items: [
          { question: "\u9999\u308a\u3065\u304f\u308a\u304c\u521d\u3081\u3066\u3067\u3082\u53c2\u52a0\u3067\u304d\u307e\u3059\u304b\uff1f", answer: "\u306f\u3044\u3002\u30b9\u30bf\u30c3\u30d5\u304c\u9999\u308a\u306e\u9078\u3073\u65b9\u3084\u30d6\u30ec\u30f3\u30c9\u306e\u9032\u3081\u65b9\u3092\u4e00\u3064\u305a\u3064\u3054\u6848\u5185\u3059\u308b\u306e\u3067\u3001\u521d\u3081\u3066\u306e\u65b9\u3067\u3082\u5b89\u5fc3\u3057\u3066\u3054\u53c2\u52a0\u3044\u305f\u3060\u3051\u307e\u3059\u3002", open: true },
          { question: "\u3069\u306e\u304f\u3089\u3044\u306e\u7a2e\u985e\u306e\u9999\u308a\u304b\u3089\u9078\u3079\u307e\u3059\u304b\uff1f", answer: "\u5b9a\u756a12\u7a2e\u985e\u3092\u4e2d\u5fc3\u306b\u3001\u305d\u306e\u6642\u671f\u306a\u3089\u3067\u306f\u306e\u9650\u5b9a\u306e\u9999\u308a\u3082\u3054\u7528\u610f\u3057\u3066\u3044\u307e\u3059\u3002\u7d44\u307f\u5408\u308f\u305b\u6b21\u7b2c\u3067\u3001\u81ea\u5206\u3060\u3051\u306e\u5370\u8c61\u306b\u4ed5\u4e0a\u3052\u3089\u308c\u307e\u3059\u3002" },
          { question: "\u5b8c\u6210\u3057\u305f\u9999\u6c34\u306f\u5f53\u65e5\u6301\u3061\u5e30\u308c\u307e\u3059\u304b\uff1f", answer: "\u306f\u3044\u3001\u5b8c\u6210\u3057\u305f\u30aa\u30ea\u30b8\u30ca\u30eb\u9999\u6c34\u306f\u305d\u306e\u307e\u307e\u5f53\u65e5\u304a\u6301\u3061\u5e30\u308a\u3044\u305f\u3060\u3051\u307e\u3059\u3002\u65c5\u306e\u601d\u3044\u51fa\u3084\u30ae\u30d5\u30c8\u306b\u3082\u304a\u3059\u3059\u3081\u3067\u3059\u3002" },
          { question: "\u3072\u3068\u308a\u3067\u53c2\u52a0\u3057\u3066\u3082\u5927\u4e08\u592b\u3067\u3059\u304b\uff1f", answer: "\u3082\u3061\u308d\u3093\u3067\u3059\u3002\u304a\u3072\u3068\u308a\u3067\u3086\u3063\u304f\u308a\u9999\u308a\u3068\u5411\u304d\u5408\u3044\u305f\u3044\u65b9\u306e\u3054\u53c2\u52a0\u3082\u591a\u304f\u3001\u843d\u3061\u7740\u3044\u305f\u96f0\u56f2\u6c17\u3067\u4f53\u9a13\u3057\u3066\u3044\u305f\u3060\u3051\u307e\u3059\u3002" }
        ]
      },
      {
        tag: "Category 03",
        title: "\u4e88\u7d04\u30fb\u53c2\u52a0",
        items: [
          { question: "\u30ab\u30c3\u30d7\u30eb\u3084\u53cb\u4eba\u540c\u58eb\u3067\u5225\u3005\u306e\u9999\u308a\u3092\u4f5c\u308c\u307e\u3059\u304b\uff1f", answer: "\u306f\u3044\u3002\u540c\u3058\u56de\u306b\u3054\u53c2\u52a0\u3067\u3082\u3001\u305d\u308c\u305e\u308c\u304a\u597d\u307f\u306e\u9999\u308a\u3092\u9078\u3093\u3067\u5225\u3005\u306e\u30ec\u30b7\u30d4\u3067\u304a\u4f5c\u308a\u3044\u305f\u3060\u3051\u307e\u3059\u3002", open: true },
          { question: "\u4e88\u7d04\u6642\u9593\u306e\u4f55\u5206\u524d\u306b\u884c\u3051\u3070\u3088\u3044\u3067\u3059\u304b\uff1f", answer: "\u958b\u59cb10\u5206\u524d\u3092\u76ee\u5b89\u306b\u3054\u6765\u5e97\u304f\u3060\u3055\u3044\u3002\u53d7\u4ed8\u5f8c\u3001\u30b9\u30e0\u30fc\u30ba\u306b\u3054\u6848\u5185\u3067\u304d\u308b\u3088\u3046\u6e96\u5099\u3057\u3066\u3044\u307e\u3059\u3002" },
          { question: "\u670d\u88c5\u3084\u6301\u3061\u7269\u306b\u6c7a\u307e\u308a\u306f\u3042\u308a\u307e\u3059\u304b\uff1f", answer: "\u7279\u5225\u306a\u6301\u3061\u7269\u306f\u5fc5\u8981\u3042\u308a\u307e\u305b\u3093\u3002\u9999\u308a\u3092\u8a66\u3059\u306e\u3067\u3001\u5f37\u3044\u9999\u6c34\u306e\u3054\u4f7f\u7528\u306f\u63a7\u3048\u3081\u306b\u3057\u3066\u3044\u305f\u3060\u304f\u3068\u3001\u3088\u308a\u7e4a\u7d30\u306a\u9055\u3044\u3092\u697d\u3057\u3081\u307e\u3059\u3002" },
          { question: "\u9999\u308a\u306e\u597d\u307f\u304c\u6c7a\u307e\u3063\u3066\u3044\u306a\u304f\u3066\u3082\u76f8\u8ac7\u3067\u304d\u307e\u3059\u304b\uff1f", answer: "\u306f\u3044\u3002\u3055\u3063\u3071\u308a\u7cfb\u3001\u3084\u308f\u3089\u304b\u3044\u82b1\u306e\u9999\u308a\u3001\u843d\u3061\u7740\u3044\u305f\u30a6\u30c3\u30c7\u30a3\u7cfb\u306a\u3069\u3001\u597d\u307f\u306b\u5408\u308f\u305b\u3066\u30b9\u30bf\u30c3\u30d5\u304c\u3054\u63d0\u6848\u3057\u307e\u3059\u3002" }
        ]
      }
    ],
    en: [
      {
        tag: "Category 01",
        title: "Basic Information",
        items: [
          { question: "What is the recommended plan at inori Asakusa?", answer: "Create your own perfume in Asakusa.<br>Select your favorite notes and blend a scent that is uniquely yours.<br>A popular choice for couples and women travelers.", open: true },
          { question: "How much does the workshop cost?", answer: "The inori Asakusa workshop starts from JPY 5,500." },
          { question: "What age group usually joins?", answer: "Guests in their twenties are the most common.<br>This is based on customer review trends and should be used only as a general reference." },
          { question: "What age range is common for children?", answer: "Among family guests, ages 13 and up are the most common.<br>This is based on review trends and may vary by plan." }
        ]
      },
      {
        tag: "Category 02",
        title: "About the Experience",
        items: [
          { question: "Can beginners join the fragrance workshop?", answer: "Yes. Our staff guides you through each step, from choosing notes to blending, so first-time guests can join with confidence.", open: true },
          { question: "How many scents can I choose from?", answer: "We offer 12 signature scents plus a selection of limited seasonal scents. The combinations allow you to create a very personal fragrance." },
          { question: "Can I take the finished perfume home on the same day?", answer: "Yes. Your original perfume can be taken home immediately after the workshop, making it a great travel memory or gift." },
          { question: "Is it okay to join alone?", answer: "Absolutely. Many guests join solo to enjoy a calm and personal fragrance-making experience." }
        ]
      },
      {
        tag: "Category 03",
        title: "Reservations and Visit",
        items: [
          { question: "Can couples or friends make different scents in the same session?", answer: "Yes. Even in the same session, each guest can choose different notes and create a completely different recipe.", open: true },
          { question: "How early should I arrive?", answer: "Please arrive about 10 minutes before your reservation time so we can guide you smoothly." },
          { question: "Is there any dress code or anything I should bring?", answer: "No special items are required. To enjoy subtle scent differences more clearly, we recommend avoiding strong perfume on the day." },
          { question: "Can I ask for advice if I am not sure what kind of scent I like?", answer: "Yes. Our staff can suggest blends based on your preferences, whether you like fresh, floral, soft, or woody notes." }
        ]
      }
    ]
  };

  function bindFaqToggle() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const btn = item.querySelector(".faq-q");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  function renderFaq() {
    if (!faqCategories) return;
    const lang = i18n?.getLanguage?.() === "en" ? "en" : "ja";
    const groups = faqGroups[lang];

    faqCategories.innerHTML = groups.map((group) => `
      <section class="faq-category">
        <div class="faq-category-head">
          <span class="faq-category-tag">${group.tag}</span>
          <h2 class="faq-category-title">${group.title}</h2>
        </div>
        <div class="faq-list">
          ${group.items.map((item) => `
            <article class="faq-item${item.open ? " open" : ""}">
              <button class="faq-q" type="button" aria-expanded="${item.open ? "true" : "false"}">
                <span class="faq-q-text"><span class="q-badge">Q</span>${item.question}</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-a">
                <p>${item.answer}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");

    bindFaqToggle();
  }

  document.addEventListener("inori-language-change", renderFaq);

  renderFaq();
});