document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const contactInputs = document.querySelector("#contact-inputs");
  const confirmPanel = document.querySelector("#confirm-panel");
  const confirmBtn = document.querySelector("#confirm-btn");
  const backBtn = document.querySelector("#back-btn");
  const submitBtn = document.querySelector("#submit-btn");
  const inquiryStorageKey = "inoriAdminInquiries";

  if (!form) return;

  const confirmFields = {
    nameKana: document.querySelector("#confirm-name-kana"),
    name: document.querySelector("#confirm-name"),
    email: document.querySelector("#confirm-email"),
    tel: document.querySelector("#confirm-tel"),
    message: document.querySelector("#confirm-message")
  };

  function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function loadInquiries() {
    try {
      const raw = localStorage.getItem(inquiryStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  const emailFields = {
    local: document.querySelector("#email-local"),
    domain: document.querySelector("#email-domain"),
    custom: document.querySelector("#email-domain-custom")
  };

  function getEmailValue() {
    const local = emailFields.local?.value.trim() || "";
    const domain = emailFields.domain?.value === "other"
      ? emailFields.custom?.value.trim() || ""
      : emailFields.domain?.value.trim() || "";
    return local && domain ? `${local}@${domain}` : "";
  }

  function syncEmailDomainInput() {
    if (!emailFields.domain || !emailFields.custom) return;
    emailFields.custom.classList.toggle("hidden", emailFields.domain.value !== "other");
  }

  function getPayload() {
    return {
      nameKana: document.querySelector("#name-kana")?.value.trim() || "",
      name: document.querySelector("#name")?.value.trim() || "",
      email: getEmailValue(),
      tel: document.querySelector("#tel")?.value.trim() || "",
      message: document.querySelector("#message")?.value.trim() || ""
    };
  }

  function validatePayload(payload) {
    if (!payload.name || !payload.email) {
      alert("\u304a\u540d\u524d\u3068\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
      return false;
    }
    return true;
  }

  function setConfirmMode(enabled, payload) {
    contactInputs?.classList.toggle("hidden", enabled);
    confirmPanel?.classList.toggle("hidden", !enabled);
    confirmBtn?.classList.toggle("hidden", enabled);
    backBtn?.classList.toggle("hidden", !enabled);
    submitBtn?.classList.toggle("hidden", !enabled);

    if (enabled && payload) {
      confirmFields.nameKana.textContent = payload.nameKana || "\u672a\u5165\u529b";
      confirmFields.name.textContent = payload.name || "\u672a\u5165\u529b";
      confirmFields.email.textContent = payload.email || "\u672a\u5165\u529b";
      confirmFields.tel.textContent = payload.tel || "\u672a\u5165\u529b";
      confirmFields.message.textContent = payload.message || "\u672a\u5165\u529b";
      window.scrollTo({ top: form.offsetTop - 40, behavior: "smooth" });
    }
  }

  confirmBtn?.addEventListener("click", () => {
    const payload = getPayload();
    if (!validatePayload(payload)) return;
    setConfirmMode(true, payload);
  });

  backBtn?.addEventListener("click", () => {
    setConfirmMode(false);
  });

  emailFields.domain?.addEventListener("change", syncEmailDomainInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = getPayload();
    if (!validatePayload(payload)) {
      setConfirmMode(false);
      return;
    }

    const inquiries = loadInquiries();
    inquiries.unshift({
      id: Date.now(),
      name: payload.name,
      nameKana: payload.nameKana,
      email: payload.email,
      phone: payload.tel,
      date: getToday(),
      subject: "Web\u304a\u554f\u3044\u5408\u308f\u305b",
      status: "\u672a\u5bfe\u5fdc",
      message: payload.message || "\u304a\u554f\u3044\u5408\u308f\u305b\u30d5\u30a9\u30fc\u30e0\u304b\u3089\u9001\u4fe1"
    });

    localStorage.setItem(inquiryStorageKey, JSON.stringify(inquiries));
    alert("\u304a\u554f\u3044\u5408\u308f\u305b\u3092\u9001\u4fe1\u3057\u307e\u3057\u305f\u3002");
    form.reset();
    syncEmailDomainInput();
    setConfirmMode(false);
  });

  syncEmailDomainInput();
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
