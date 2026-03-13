document.addEventListener("DOMContentLoaded", () => {
    const mainPhoto = document.querySelector(".main-photo");
    const leftArrow = document.querySelector(".slider-arrow.left");
    const rightArrow = document.querySelector(".slider-arrow.right");
    const thumbnails = Array.from(document.querySelectorAll(".thumbnail-row img"));
    const pageDots = Array.from(document.querySelectorAll(".page-dot"));
    const reviewList = document.querySelector(".review-list");

    const photoList = [
        "photo-main.png",
        "photo-thumb1.png",
        "photo-thumb2.png",
        "photo-thumb3.png",
        "photo-thumb4.png",
        "photo-thumb5.png",
        "photo-thumb6.png"
    ];

    let currentPhotoIndex = 0;

    function updateMainPhoto() {
        if (!mainPhoto) return;

        mainPhoto.src = photoList[currentPhotoIndex];
        const targetThumb = currentPhotoIndex > 0 ? thumbnails[currentPhotoIndex - 1] : null;
        mainPhoto.classList.toggle("zoom-out-image", Boolean(targetThumb?.classList.contains("zoom-out-image")));

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle("is-active", index + 1 === currentPhotoIndex);
        });
    }

    leftArrow?.addEventListener("click", () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
        updateMainPhoto();
    });

    rightArrow?.addEventListener("click", () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
        updateMainPhoto();
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            currentPhotoIndex = index + 1;
            updateMainPhoto();
        });
    });

    const reviewPages = [
        [
            {
                nickname: "ゆり",
                text: "初めての調香でしたが、スタッフの方が丁寧に説明してくださり、安心して体験できました。香りの組み合わせを考える時間もとても楽しく、思い出に残りました。",
                rating: "★★★★★",
                meta: "女性 / 20代"
            },
            {
                nickname: "mika",
                text: "たくさんの香りから好きなものを選べるのが魅力的でした。恋人と一緒に参加して、良い記念日になりました。",
                rating: "★★★★★",
                meta: "女性 / 10代"
            }
        ],
        [
            {
                nickname: "hana",
                text: "店内の雰囲気が落ち着いていて、ゆっくり香りを選べました。初心者でも分かりやすかったです。",
                rating: "★★★★★",
                meta: "女性 / 30代"
            },
            {
                nickname: "kei",
                text: "友人と一緒に参加しましたが、それぞれ違う香りになって面白かったです。",
                rating: "★★★★★",
                meta: "男性 / 20代"
            }
        ],
        [
            {
                nickname: "saya",
                text: "説明がわかりやすく、香料の違いをしっかり体感できました。完成後の香りにも満足です。",
                rating: "★★★★★",
                meta: "女性 / 20代"
            },
            {
                nickname: "rina",
                text: "旅行の思い出として参加しました。短時間で体験できるのに内容が濃くてよかったです。",
                rating: "★★★★★",
                meta: "女性 / 20代"
            }
        ],
        [
            {
                nickname: "momo",
                text: "香りの調整が細かくできて、選ぶ時間そのものが楽しかったです。仕上がりにもとても満足しています。",
                rating: "★★★★★",
                meta: "女性 / 40代"
            },
            {
                nickname: "eri",
                text: "接客が丁寧で心地よく過ごせました。次は別の香りでもう一度作ってみたいです。",
                rating: "★★★★★",
                meta: "女性 / 30代"
            }
        ],
        [
            {
                nickname: "noa",
                text: "予約後の連絡もスムーズで安心できました。体験中のサポートも十分で良かったです。",
                rating: "★★★★★",
                meta: "女性 / 20代"
            },
            {
                nickname: "aki",
                text: "親子で参加しましたが、日程も調整しやすく、説明も丁寧で安心して楽しめました。",
                rating: "★★★★★",
                meta: "女性 / 30代"
            }
        ]
    ];

    function createReviewCard(review) {
        return `
            <article class="review-card">
                <div class="review-user">
                    <div class="review-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" role="img">
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
                        </svg>
                    </div>
                    <p class="review-nickname">${review.nickname}</p>
                    <p class="review-meta">${review.meta}</p>
                </div>
                <div class="review-body">
                    <p class="review-rating">${review.rating}</p>
                    <p class="review-text">${review.text}</p>
                </div>
            </article>
        `;
    }

    function renderReviewPage(pageIndex) {
        if (!reviewList) return;

        reviewList.innerHTML = reviewPages[pageIndex].map(createReviewCard).join("");
        pageDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === pageIndex);
        });
    }

    pageDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            renderReviewPage(index);
        });
    });

    updateMainPhoto();
    renderReviewPage(0);
});
