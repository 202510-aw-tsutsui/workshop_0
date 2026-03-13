document.addEventListener("DOMContentLoaded", () => {
    const mainPhoto = document.querySelector(".main-photo");
    const leftArrow = document.querySelector(".slider-arrow.left");
    const rightArrow = document.querySelector(".slider-arrow.right");
    const thumbnails = Array.from(document.querySelectorAll(".thumbnail-row img"));
    const pageDots = Array.from(document.querySelectorAll(".page-dot"));
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
        "photo-thumb3.png",
        "photo-thumb4.png",
        "photo-thumb5.png",
        "photo-thumb6.png"
    ];

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

    const monthFormatter = new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long" });
    const dateFormatter = new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "numeric", day: "numeric", weekday: "short" });
    const today = new Date();
    let currentPhotoIndex = 0;
    let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDateKey = "";

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

        reviewList.innerHTML = reviewPages[pageIndex].map(createReviewCard).join("");
        pageDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === pageIndex);
        });
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
            dayButton.innerHTML += `<span class="calendar-note">対象外</span>`;
            dayButton.disabled = true;
            return dayButton;
        }

        const dayStatus = getDayStatus(date);
        const dayLabel = dayStatus === "available" ? "空き" : dayStatus === "few" ? "残り僅か" : "満席";

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

        calendarCurrent.textContent = monthFormatter.format(currentMonth);
        calendarRoot.innerHTML = `
            <div class="calendar-weekdays">
                <span>日</span>
                <span>月</span>
                <span>火</span>
                <span>水</span>
                <span>木</span>
                <span>金</span>
                <span>土</span>
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
        timeslotTitle.textContent = `${dateFormatter.format(date)} の予約枠`;
        timeslotList.innerHTML = slotTimes.map((time, index) => {
            const status = getSlotStatus(dateKey, index);
            const label = status === "available" ? "空き" : status === "few" ? "残り僅か" : "満席";

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
                    bookingForm?.querySelector("input, textarea")?.focus();
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

    calendarPrev?.addEventListener("click", () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        renderCalendar();
    });

    calendarNext?.addEventListener("click", () => {
        currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        renderCalendar();
    });

    updateMainPhoto();
    renderReviewPage(0);
    renderCalendar();
});
