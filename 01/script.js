document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       Photos Slider
    ========================= */
    const mainPhoto = document.querySelector(".main-photo");
    const leftArrow = document.querySelector(".slider-arrow.left");
    const rightArrow = document.querySelector(".slider-arrow.right");
    const thumbnails = document.querySelectorAll(".thumbnail-row img");

    const photoList = [
        "images/main-photo.jpg",
        "images/thumb01.jpg",
        "images/thumb02.jpg",
        "images/thumb03.jpg",
        "images/thumb04.jpg",
        "images/thumb05.jpg",
        "images/thumb06.jpg",
        "images/thumb07.jpg"
    ];

    let currentPhotoIndex = 0;

    function updateMainPhoto() {
        if (!mainPhoto) return;
        mainPhoto.src = photoList[currentPhotoIndex];
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            currentPhotoIndex =
                (currentPhotoIndex - 1 + photoList.length) % photoList.length;
            updateMainPhoto();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
            updateMainPhoto();
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
            // thumb01〜07に対応させるため +1
            currentPhotoIndex = index + 1;
            updateMainPhoto();
        });
    });

    /* =========================
       Reviews Pagination
    ========================= */
    const reviewList = document.querySelector(".review-list");
    const paginationLinks = document.querySelectorAll(".pagination a");

    const reviewPages = [
        [
            {
                text: "初めて香水を作ってみましたがスタッフの方が丁寧に説明をしてくれて、楽しく体験できました。香りの組み合わせを考える時間もとても楽しく、旅の思い出になりました。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "たくさんの香りから好きなものを選べるのが良かったです。友人と一緒に参加してとてもいい思い出になりました。",
                meta: "★★★★★<br>女性 / 10代"
            }
        ],
        [
            {
                text: "お店の雰囲気がとても落ち着いていて、ゆっくり香りを選べました。完成した香水もお気に入りです。",
                meta: "★★★★★<br>女性 / 30代"
            },
            {
                text: "浅草観光の途中で立ち寄りましたが、大満足でした。プレゼントにもよさそうです。",
                meta: "★★★★☆<br>男性 / 20代"
            }
        ],
        [
            {
                text: "説明がわかりやすく、初心者でも安心して体験できました。自分だけの香りが作れて嬉しかったです。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "店内もきれいで写真映えしました。友達と一緒に参加してとても楽しかったです。",
                meta: "★★★★★<br>女性 / 20代"
            }
        ],
        [
            {
                text: "香りの種類が豊富で選ぶ時間も含めて楽しめました。完成後すぐ持ち帰れるのも良かったです。",
                meta: "★★★★☆<br>女性 / 40代"
            },
            {
                text: "接客が丁寧で心地よく過ごせました。また別の香りでも作ってみたいです。",
                meta: "★★★★★<br>女性 / 30代"
            }
        ],
        [
            {
                text: "旅行の記念にぴったりでした。自分の好みに合わせて作れるのが魅力だと思います。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "予約もスムーズで、当日も安心して体験できました。香りが長持ちして嬉しいです。",
                meta: "★★★★☆<br>女性 / 30代"
            }
        ]
    ];

    function createReviewCard(review) {
        return `
      <article class="review-card">
        <div class="review-icon">👤</div>
        <div class="review-body">
          <p class="review-text">${review.text}</p>
          <p class="review-meta">${review.meta}</p>
        </div>
      </article>
    `;
    }

    function renderReviewPage(pageIndex) {
        if (!reviewList) return;

        const pageData = reviewPages[pageIndex];
        reviewList.innerHTML = pageData.map(createReviewCard).join("");

        paginationLinks.forEach((link, index) => {
            if (index === pageIndex) {
                link.style.textDecoration = "underline";
                link.style.fontWeight = "700";
            } else {
                link.style.textDecoration = "none";
                link.style.fontWeight = "600";
            }
        });
    }

    paginationLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            renderReviewPage(index);
        });
    });

    renderReviewPage(0);

    /* =========================
       Reservation Form Validation
    ========================= */
    const form = document.querySelector(".reservation-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const lastName = document.querySelector("#last-name")?.value.trim() || "";
            const firstName = document.querySelector("#first-name")?.value.trim() || "";
            const tel = document.querySelector("#tel")?.value.trim() || "";
            const email = document.querySelector("#email")?.value.trim() || "";
            const emailConfirm =
                document.querySelector("#email-confirm")?.value.trim() || "";
            const people = document.querySelector("#people")?.value.trim() || "";
            const date = document.querySelector('input[type="date"]')?.value || "";
            const time = document.querySelector('input[type="time"]')?.value || "";

            const errors = [];

            if (!lastName) errors.push("姓を入力してください。");
            if (!firstName) errors.push("名を入力してください。");
            if (!tel) errors.push("お電話番号を入力してください。");
            if (!email) errors.push("メールアドレスを入力してください。");
            if (!emailConfirm) errors.push("確認用メールアドレスを入力してください。");
            if (email && emailConfirm && email !== emailConfirm) {
                errors.push("メールアドレスと確認用メールアドレスが一致しません。");
            }
            if (!people) errors.push("参加人数を入力してください。");
            if (!date) errors.push("日付を選択してください。");
            if (!time) errors.push("時間を選択してください。");

            if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
            }

            alert("予約内容を送信しました。");
            form.reset();
        });
    }
});