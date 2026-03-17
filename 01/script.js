document.addEventListener("DOMContentLoaded", () => {
    const i18n = window.InoriI18n;
    const mainPhoto = document.querySelector(".main-photo");
    const leftArrow = document.querySelector(".slider-arrow.left");
    const rightArrow = document.querySelector(".slider-arrow.right");
    const thumbnails = Array.from(document.querySelectorAll(".thumbnail-row img"));
    const pageDots = Array.from(document.querySelectorAll(".page-dot"));
    const reviewPrev = document.querySelector(".page-arrow.prev");
    const reviewNext = document.querySelector(".page-arrow.next");
    const reviewList = document.querySelector(".review-list");
    const calendarRoot = document.querySelector("#booking-calendar");
    const calendarCurrent = document.querySelector("#calendar-current");
    const calendarPrev = document.querySelector(".calendar-nav.prev");
    const calendarNext = document.querySelector(".calendar-nav.next");
    const timeslotPanel = document.querySelector("#timeslot-panel");
    const timeslotTitle = document.querySelector("#timeslot-title");
    const timeslotList = document.querySelector("#timeslot-list");
    const reservationDate = document.querySelector("#reservation-date");
    const reservationTime = document.querySelector("#reservation-time");
    const reservationSection = document.querySelector("#reservation");
    const bookingForm = document.querySelector("#reserve-form");

    const photoList = [
        "photo-main.png",
        "photo-thumb1.png",
        "photo-thumb2.png",
        "photo-thumb3.jpg",
        "photo-thumb4.png",
        "photo-thumb5.png",
        "photo-thumb6.png"
    ];

    const reviewPages = {
        ja: [
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
        ],
        en: [
            [
                {
                    nickname: "Yuri",
                    text: "It was my first time blending fragrances, but the staff explained everything so kindly that I felt at ease. Thinking about the combinations was so much fun and became a wonderful memory.",
                    rating: "★★★★★",
                    meta: "Female / 20s"
                },
                {
                    nickname: "mika",
                    text: "I loved being able to choose from so many scents. I joined with my partner and it turned into such a nice anniversary experience.",
                    rating: "★★★★★",
                    meta: "Female / Teens"
                }
            ],
            [
                {
                    nickname: "hana",
                    text: "The atmosphere in the shop was calm, so I could take my time choosing scents. It was easy to understand even as a beginner.",
                    rating: "★★★★★",
                    meta: "Female / 30s"
                },
                {
                    nickname: "kei",
                    text: "I joined with a friend, and it was fun to see how different our final scents turned out.",
                    rating: "★★★★★",
                    meta: "Male / 20s"
                }
            ],
            [
                {
                    nickname: "saya",
                    text: "The explanations were clear, and I could really feel the differences between the fragrance materials. I was very happy with the final scent.",
                    rating: "★★★★★",
                    meta: "Female / 20s"
                },
                {
                    nickname: "rina",
                    text: "I joined as part of my trip to Asakusa. It was short enough to fit into the day, but still felt rich and memorable.",
                    rating: "★★★★★",
                    meta: "Female / 20s"
                }
            ],
            [
                {
                    nickname: "momo",
                    text: "I enjoyed being able to fine-tune the fragrance in detail. Even the process of choosing was exciting, and I loved the result.",
                    rating: "★★★★★",
                    meta: "Female / 40s"
                },
                {
                    nickname: "eri",
                    text: "The service was very thoughtful and made the whole experience comfortable. I want to come back and make another scent next time.",
                    rating: "★★★★★",
                    meta: "Female / 30s"
                }
            ],
            [
                {
                    nickname: "noa",
                    text: "The communication after booking was smooth, and I felt reassured from start to finish. The support during the workshop was also excellent.",
                    rating: "★★★★★",
                    meta: "Female / 20s"
                },
                {
                    nickname: "aki",
                    text: "I joined with my child, and the schedule was easy to arrange. The explanations were kind and easy to follow, so we could enjoy it with confidence.",
                    rating: "★★★★★",
                    meta: "Female / 30s"
                }
            ]
        ]
    };

    const slotTimes = ["11:00", "13:00", "15:00"];
    const holidayDates = new Set([
        "2026-03-20",
        "2026-04-29",
        "2026-05-03",
        "2026-05-04",
        "2026-05-05",
        "2026-05-06",
        "2026-07-20",
        "2026-08-11",
        "2026-09-21",
        "2026-09-22",
        "2026-09-23",
        "2026-10-12",
        "2026-11-03",
        "2026-11-23",
        "2027-01-01",
        "2027-01-11",
        "2027-02-11",
        "2027-02-23",
        "2027-03-20"
    ]);

    const today = new Date();
    let currentPhotoIndex = 0;
    let currentReviewPage = 0;
    let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDateKey = "";

    function getLanguage() {
        return i18n?.getLanguage?.() === "en" ? "en" : "ja";
    }

    function getMonthFormatter() {
        return new Intl.DateTimeFormat(getLanguage() === "en" ? "en-US" : "ja-JP", {
            year: "numeric",
            month: "long"
        });
    }

    function getDateFormatter() {
        return new Intl.DateTimeFormat(getLanguage() === "en" ? "en-US" : "ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "short"
        });
    }

    function t(ja, en) {
        return i18n?.t?.(ja, en) ?? ja;
    }

    function formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function isHoliday(date) {
        return holidayDates.has(formatDateKey(date));
    }

    function isReservableDate(date) {
        const day = date.getDay();
        return day === 0 || day === 6 || isHoliday(date);
    }

    function getSlotStatus(dateKey, slotIndex) {
        const seed = Array.from(`${dateKey}-${slotIndex}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const statusIndex = seed % 6;

        if (statusIndex === 0) {
            return "full";
        }

        if (statusIndex <= 2) {
            return "few";
        }

        return "available";
    }

    function getDayStatus(date) {
        const dateKey = formatDateKey(date);
        const statuses = slotTimes.map((_, index) => getSlotStatus(dateKey, index));

        if (statuses.every((status) => status === "full")) {
            return "full";
        }

        if (statuses.some((status) => status === "available")) {
            return "available";
        }

        return "few";
    }

    function updateMainPhoto() {
        if (!mainPhoto) return;

        mainPhoto.src = photoList[currentPhotoIndex];
        const targetThumb = currentPhotoIndex > 0 ? thumbnails[currentPhotoIndex - 1] : null;
        mainPhoto.classList.toggle("zoom-out-image", Boolean(targetThumb?.classList.contains("zoom-out-image")));

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle("is-active", index + 1 === currentPhotoIndex);
        });
    }

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

        currentReviewPage = pageIndex;
        reviewList.innerHTML = reviewPages[getLanguage()][pageIndex].map(createReviewCard).join("");
        pageDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === pageIndex);
        });
        if (reviewPrev) {
            reviewPrev.disabled = pageIndex === 0;
        }
        if (reviewNext) {
            reviewNext.disabled = pageIndex === reviewPages[getLanguage()].length - 1;
        }
    }

    function createEmptyDay() {
        const empty = document.createElement("button");
        empty.type = "button";
        empty.className = "calendar-day is-empty";
        empty.disabled = true;
        return empty;
    }

    function createCalendarDay(date, currentMonthIndex) {
        const dayButton = document.createElement("button");
        dayButton.type = "button";
        dayButton.className = "calendar-day";

        if (date.getMonth() !== currentMonthIndex) {
            dayButton.classList.add("is-empty");
            dayButton.disabled = true;
            return dayButton;
        }

        const dateKey = formatDateKey(date);
        dayButton.innerHTML = `<span class="calendar-date">${date.getDate()}</span>`;

        if (!isReservableDate(date)) {
            dayButton.classList.add("is-disabled");
            dayButton.innerHTML += `<span class="calendar-note">${t("対象外", "Closed")}</span>`;
            dayButton.disabled = true;
            return dayButton;
        }

        const dayStatus = getDayStatus(date);
        const dayLabel = dayStatus === "available" ? t("空き", "Available") : dayStatus === "few" ? t("残り僅か", "Few left") : t("満席", "Full");

        dayButton.classList.add("is-selectable");
        if (selectedDateKey === dateKey) {
            dayButton.classList.add("is-selected");
        }

        dayButton.innerHTML += `
            <span class="calendar-status ${dayStatus}">${dayLabel}</span>
            <span class="calendar-note">11:00 / 13:00 / 15:00</span>
        `;

        dayButton.addEventListener("click", () => {
            selectedDateKey = dateKey;
            renderCalendar();
            renderTimeslots(date);
        });

        return dayButton;
    }

    function renderCalendar() {
        if (!calendarRoot || !calendarCurrent) return;

        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const leadingDays = firstDay.getDay();
        const trailingDays = 6 - lastDay.getDay();
        const dayCells = [];

        for (let index = 0; index < leadingDays; index += 1) {
            dayCells.push(createEmptyDay());
        }

        for (let day = 1; day <= lastDay.getDate(); day += 1) {
            dayCells.push(createCalendarDay(new Date(year, month, day), month));
        }

        for (let index = 0; index < trailingDays; index += 1) {
            dayCells.push(createEmptyDay());
        }

        const weekdays = getLanguage() === "en" ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["日", "月", "火", "水", "木", "金", "土"];
        calendarCurrent.textContent = getMonthFormatter().format(currentMonth);
        calendarRoot.innerHTML = `
            <div class="calendar-weekdays">
                ${weekdays.map((day) => `<span>${day}</span>`).join("")}
            </div>
        `;

        const grid = document.createElement("div");
        grid.className = "calendar-grid";
        dayCells.forEach((dayCell) => {
            grid.appendChild(dayCell);
        });
        calendarRoot.appendChild(grid);
    }

    function renderTimeslots(date) {
        if (!timeslotPanel || !timeslotTitle || !timeslotList) return;

        const dateKey = formatDateKey(date);
        timeslotPanel.hidden = false;
        timeslotTitle.textContent = getLanguage() === "en" ? `${getDateFormatter().format(date)} Availability` : `${getDateFormatter().format(date)} の予約枠`;
        timeslotList.innerHTML = slotTimes.map((time, index) => {
            const status = getSlotStatus(dateKey, index);
            const label = status === "available" ? t("空き", "Available") : status === "few" ? t("残り僅か", "Few left") : t("満席", "Full");

            return `
                <button type="button" class="timeslot-btn" data-date="${dateKey}" data-time="${time}" ${status === "full" ? "disabled" : ""}>
                    <strong>${time}</strong>
                    <span class="${status}">${label}</span>
                </button>
            `;
        }).join("");

        timeslotList.querySelectorAll(".timeslot-btn:not(:disabled)").forEach((button) => {
            button.addEventListener("click", () => {
                if (reservationDate) {
                    reservationDate.value = button.dataset.date ?? "";
                }

                if (reservationTime) {
                    reservationTime.value = button.dataset.time ?? "";
                }

                reservationSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                window.setTimeout(() => {
                    bookingForm?.querySelector("input, textarea, select")?.focus();
                }, 500);
            });
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

    pageDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            renderReviewPage(index);
        });
    });

    reviewPrev?.addEventListener("click", () => {
        if (currentReviewPage > 0) {
            renderReviewPage(currentReviewPage - 1);
        }
    });

    reviewNext?.addEventListener("click", () => {
        if (currentReviewPage < reviewPages[getLanguage()].length - 1) {
            renderReviewPage(currentReviewPage + 1);
        }
    });

    bookingForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const policyCheck = bookingForm.querySelector("#policy-check");
        if (policyCheck && !policyCheck.checked) {
            alert(t("キャンセルポリシーに同意してください。", "Please agree to the cancellation policy."));
            return;
        }

        const reservationDraft = {
            lastNameKana: document.querySelector("#last-name-kana")?.value.trim() ?? "",
            firstNameKana: document.querySelector("#first-name-kana")?.value.trim() ?? "",
            lastName: document.querySelector("#last-name")?.value.trim() ?? "",
            firstName: document.querySelector("#first-name")?.value.trim() ?? "",
            email: document.querySelector("#email")?.value.trim() ?? "",
            emailConfirm: document.querySelector("#email-confirm")?.value.trim() ?? "",
            tel: document.querySelector("#tel")?.value.trim() ?? "",
            reservationDate: document.querySelector("#reservation-date")?.value.trim() ?? "",
            reservationTime: document.querySelector("#reservation-time")?.value.trim() ?? "",
            people: document.querySelector("#people")?.value.trim() ?? "",
            note: document.querySelector("#note")?.value.trim() ?? ""
        };

        sessionStorage.setItem("inoriReservationDraft", JSON.stringify(reservationDraft));
        window.location.href = "../03/index.html?step=2";
    });

    calendarPrev?.addEventListener("click", () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        renderCalendar();
    });

    calendarNext?.addEventListener("click", () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        renderCalendar();
    });

    document.addEventListener("inori-language-change", () => {
        renderReviewPage(currentReviewPage);
        renderCalendar();
        if (selectedDateKey) {
            renderTimeslots(new Date(`${selectedDateKey}T00:00:00`));
        }
    });

    updateMainPhoto();
    renderReviewPage(0);
    renderCalendar();
});
