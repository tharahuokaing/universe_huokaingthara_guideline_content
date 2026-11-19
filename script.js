document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const searchInput = document.getElementById("guidelineSearch");
    const pillButtons = document.querySelectorAll(".pill-btn");
    const ruleCards = document.querySelectorAll(".rule-card");
    const checkboxes = document.querySelectorAll(".comp-cb");
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");
    const readyBanner = document.getElementById("readyBanner");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'
    let activeCategory = "all";

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Combined Category Filter & Live Search
    function filterRules() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

        ruleCards.forEach(card => {
            const cat = card.getAttribute("data-cat");
            const text = card.textContent.toLowerCase();
            const matchesCat = activeCategory === "all" || cat === activeCategory;
            const matchesText = !query || text.includes(query);

            if (matchesCat && matchesText) {
                card.classList.remove("hidden-card");
            } else {
                card.classList.add("hidden-card");
            }
        });
    }

    pillButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            pillButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.getAttribute("data-cat");
            filterRules();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterRules);
    }

    // 4. Pre-Publish Compliance Checklist Progress
    function updateChecklist() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const pct = Math.round((checked / total) * 100);

        if (progressText) progressText.textContent = `${checked} / ${total} Verified`;
        if (progressFill) progressFill.style.width = `${pct}%`;

        if (readyBanner) {
            if (checked === total) {
                readyBanner.classList.remove("hidden");
            } else {
                readyBanner.classList.add("hidden");
            }
        }
    }

    checkboxes.forEach(cb => cb.addEventListener("change", updateChecklist));
});
