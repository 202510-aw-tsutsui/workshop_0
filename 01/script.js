document.addEventListener("DOMContentLoaded", () => {
    // Photos slider
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
            currentPhotoIndex = index + 1;
            updateMainPhoto();
        });
    });

    // Reviews pagination
    const reviewList = document.querySelector(".review-list");
    const paginationLinks = document.querySelectorAll(".pagination a");

    const reviewPages = [
        [
            {
                text: "初めての調香でしたが、スタッフの方が丁寧に説明してくださり、安心して体験できました。香りの組み合わせを考える時間もとても楽しく、思い出に残りました。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "たくさんの香りから好きなものを選べるのが魅力的でした。恋人と一緒に参加して、良い記念日になりました。",
                meta: "★★★★★<br>女性 / 10代"
            }
        ],
        [
            {
                text: "店内の雰囲気が落ち着いていて、ゆっくり香りを選べました。初心者でも分かりやすかったです。",
                meta: "★★★★★<br>女性 / 30代"
            },
            {
                text: "友人と一緒に参加しましたが、それぞれ違う香りになって面白かったです。",
                meta: "★★★★★<br>男性 / 20代"
            }
        ],
        [
            {
                text: "説明がわかりやすく、香料の違いをしっかり体感できました。完成後の香りにも満足です。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "旅行の思い出として参加しました。短時間で体験できるのに内容が濃くてよかったです。",
                meta: "★★★★★<br>女性 / 20代"
            }
        ],
        [
            {
                text: "香りの調整が細かくできて、選ぶ時間そのものが楽しかったです。仕上がりにもとても満足しています。",
                meta: "★★★★★<br>女性 / 40代"
            },
            {
                text: "接客が丁寧で心地よく過ごせました。次は別の香りでもう一度作ってみたいです。",
                meta: "★★★★★<br>女性 / 30代"
            }
        ],
        [
            {
                text: "予約後の連絡もスムーズで安心できました。体験中のサポートも十分で良かったです。",
                meta: "★★★★★<br>女性 / 20代"
            },
            {
                text: "親子で参加しましたが、日程も調整しやすく、説明も丁寧で安心して楽しめました。",
                meta: "★★★★★<br>女性 / 30代"
            }
        ]
    ];

    function createReviewCard(review) {
        return `
      <article class="review-card">
        <div class="review-icon">★</div>
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

    // Booking calendar
    const calendarDays = document.querySelector("#calendar-days");
    const calendarMonth = document.querySelector("#calendar-month");
    const calendarPrev = document.querySelector("#calendar-prev");
    const calendarNext = document.querySelector("#calendar-next");
    const selectedDateText = document.querySelector("#selected-date-text");
    const selectedDateStatus = document.querySelector("#selected-date-status");
    const reserveBtn = document.querySelector("#calendar-reserve-btn");
    const timeSlots = document.querySelector("#time-slots");
    const reservationDateInput = document.querySelector("#reservation-date");
    const reservationTimeInput = document.querySelector("#reservation-time");
    const reservationSection = document.querySelector("#reservation");

    if (
        calendarDays &&
        calendarMonth &&
        calendarPrev &&
        calendarNext &&
        selectedDateText &&
        selectedDateStatus &&
        reserveBtn &&
        timeSlots
    ) {
        const monthFormatter = new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "long"
        });
        const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short"
        });
        const statusLabel = {
            available: "空きあり",
            limited: "残りわずか",
            full: "満席",
            closed: "休業日"
        };
        const slotTimes = ["11:00", "13:00", "15:00"];
        const holidaySet = new Set([
            // 2026 (JP)
            "2026-01-01", "2026-01-12", "2026-02-11", "2026-02-23", "2026-03-20",
            "2026-04-29", "2026-05-03", "2026-05-04", "2026-05-05", "2026-05-06",
            "2026-07-20", "2026-08-11", "2026-09-21", "2026-09-23", "2026-10-12",
            "2026-11-03", "2026-11-23",
            // 2027 (JP)
            "2027-01-01", "2027-01-11", "2027-02-11", "2027-02-23", "2027-03-21", "2027-03-22",
            "2027-04-29", "2027-05-03", "2027-05-04", "2027-05-05",
            "2027-07-19", "2027-08-11", "2027-09-20", "2027-09-23", "2027-10-11",
            "2027-11-03", "2027-11-23"
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
        let selectedDateKey = "";
        let selectedStatus = "";
        let selectedTime = "";

        function toDateKey(dateObj) {
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, "0");
            const d = String(dateObj.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        }

        function getAvailability(dateObj) {
            const dateKey = toDateKey(dateObj);
            const day = dateObj.getDay();
            const isHoliday = holidaySet.has(dateKey);
            const isOpenDay = day === 0 || day === 6 || isHoliday;

            if (!isOpenDay) return "closed";

            const seed = dateObj.getDate() + (dateObj.getMonth() + 1) * 7;
            if (seed % 6 === 0) return "full";
            if (seed % 2 === 0) return "limited";
            return "available";
        }

        function getSlotState(dateKey, time) {
            const seed = Number(dateKey.replaceAll("-", "")) + Number(time.replace(":", ""));
            if (seed % 7 === 0) return "full";
            if (seed % 3 === 0) return "limited";
            return "available";
        }

        function renderTimeSlots(dateKey, dayStatus) {
            timeSlots.innerHTML = "";
            selectedTime = "";

            if (!dateKey || dayStatus === "closed") return;

            slotTimes.forEach((time) => {
                const state = dayStatus === "full" ? "full" : getSlotState(dateKey, time);
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "time-slot-btn";
                btn.textContent = `${time} (${statusLabel[state]})`;

                if (state === "full") {
                    btn.disabled = true;
                } else {
                    btn.addEventListener("click", () => {
                        const all = timeSlots.querySelectorAll(".time-slot-btn");
                        all.forEach((el) => el.classList.remove("selected"));
                        btn.classList.add("selected");
                        selectedTime = time;
                        reserveBtn.setAttribute("aria-disabled", "false");
                    });
                }

                timeSlots.appendChild(btn);
            });
        }

        function updateSelectionInfo(dateObj, status) {
            selectedDateText.textContent = `${dateFormatter.format(dateObj)} を選択中`;
            selectedDateStatus.textContent = `空き状況: ${statusLabel[status]}`;
            selectedStatus = status;
            renderTimeSlots(toDateKey(dateObj), status);

            if (status === "full" || status === "closed") {
                reserveBtn.setAttribute("aria-disabled", "true");
            } else {
                reserveBtn.setAttribute("aria-disabled", "true");
            }
        }

        function renderCalendar() {
            const year = viewDate.getFullYear();
            const month = viewDate.getMonth();

            calendarMonth.textContent = monthFormatter.format(viewDate);
            calendarDays.innerHTML = "";

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i += 1) {
                const emptyCell = document.createElement("button");
                emptyCell.type = "button";
                emptyCell.className = "calendar-day empty";
                emptyCell.disabled = true;
                calendarDays.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day += 1) {
                const dateObj = new Date(year, month, day);
                const dateKey = toDateKey(dateObj);
                const isPast = dateObj < today;
                const status = getAvailability(dateObj);

                const dayButton = document.createElement("button");
                dayButton.type = "button";
                dayButton.className = `calendar-day ${status}`;
                dayButton.innerHTML = `<span class="date">${day}</span><span class="status">${statusLabel[status]}</span>`;

                if (selectedDateKey === dateKey) {
                    dayButton.classList.add("selected");
                }

                if (isPast) {
                    dayButton.classList.add("past");
                    dayButton.querySelector(".status").textContent = "受付終了";
                    dayButton.disabled = true;
                } else {
                    if (status === "closed") {
                        dayButton.disabled = true;
                    }
                    dayButton.addEventListener("click", () => {
                        selectedDateKey = dateKey;
                        updateSelectionInfo(dateObj, status);
                        renderCalendar();
                    });
                }

                calendarDays.appendChild(dayButton);
            }
        }

        calendarPrev.addEventListener("click", () => {
            viewDate.setMonth(viewDate.getMonth() - 1);
            renderCalendar();
        });

        calendarNext.addEventListener("click", () => {
            viewDate.setMonth(viewDate.getMonth() + 1);
            renderCalendar();
        });

        reserveBtn.addEventListener("click", (e) => {
            if (!selectedDateKey || !selectedTime || selectedStatus === "full" || selectedStatus === "closed") {
                e.preventDefault();
                return;
            }

            if (reservationDateInput) {
                reservationDateInput.value = selectedDateKey;
            }
            if (reservationTimeInput) {
                reservationTimeInput.value = selectedTime;
            }

            if (reservationSection) {
                reservationSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        renderCalendar();
    }

    // Reservation form validation
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
            const date = document.querySelector("#reservation-date")?.value || "";
            const time = document.querySelector("#reservation-time")?.value || "";

            const errors = [];

            if (!lastName) errors.push("姓を入力してください。");
            if (!firstName) errors.push("名を入力してください。");
            if (!tel) errors.push("電話番号を入力してください。");
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
