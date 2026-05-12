/**
 * ENTOMASTER – Script principal (version améliorée)
 * Fonctionnalités : navigation mobile, recherche globale,
 * compteurs animés, retour en haut, navigation clavier.
 */

'use strict';

/* ============================================================
   Données pour la recherche globale (noms + urls)
   ============================================================ */
const SEARCH_INDEX = [
    // Coléoptères
    { name: 'Capnodis tenebrionis', common: 'Bupreste du pêcher', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Hypera postica', common: 'Charançon de la luzerne', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Otiorhynchus cribricollis', common: 'Otiorhynque de la vigne', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Rhynchophorus ferrugineus', common: 'Charançon rouge du palmier', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Agriotes lineatus', common: 'Taupin des céréales', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Sitona lineatus', common: 'Sitone des légumineuses', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Epilachna chrysomelina', common: 'Coccinelle des cucurbitacées', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Phyllotreta nemorum', common: 'Altise des crucifères', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Zabrus tenebrionides', common: 'Zabrus des céréales', url: 'coleopteres/index.html', order: 'Coléoptères' },
    { name: 'Tropinotа hirta', common: 'Tropinote hérissée', url: 'coleopteres/index.html', order: 'Coléoptères' },
    // Lépidoptères
    { name: 'Prays oleae', common: 'Teigne de l\'olivier', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Lobesia botrana', common: 'Tordeuse de la grappe', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Tuta absoluta', common: 'Mineuse de la tomate', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Cydia pomonella', common: 'Carpocapse des pommes', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Spodoptera exigua', common: 'Légionnaire', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Agrotis ipsilon', common: 'Ver gris', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Cossus cossus', common: 'Cossus gâte-bois', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Zeuzera pyrina', common: 'Zeuzère du poirier', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Phthorimaea operculella', common: 'Teigne de la pomme de terre', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    { name: 'Anarsia lineatella', common: 'Anarsia du pêcher', url: 'lepidopteres/index.html', order: 'Lépidoptères' },
    // Diptères
    { name: 'Ceratitis capitata', common: 'Mouche méditerranéenne des fruits', url: 'dipteres/index.html', order: 'Diptères' },
    { name: 'Bactrocera oleae', common: 'Mouche de l\'olivier', url: 'dipteres/index.html', order: 'Diptères' },
    { name: 'Delia radicum', common: 'Mouche du chou', url: 'dipteres/index.html', order: 'Diptères' },
    { name: 'Liriomyza trifolii', common: 'Mineuse américaine', url: 'dipteres/index.html', order: 'Diptères' },
    // Orthoptères
    { name: 'Locusta migratoria', common: 'Criquet migrateur', url: 'orthopteres/index.html', order: 'Orthoptères' },
    { name: 'Dociostaurus maroccanus', common: 'Criquet marocain', url: 'orthopteres/index.html', order: 'Orthoptères' },
    { name: 'Calliptamus barbarus', common: 'Criquet barbare', url: 'orthopteres/index.html', order: 'Orthoptères' },
    { name: 'Oedaleus senegalensis', common: 'Criquet sénégalais', url: 'orthopteres/index.html', order: 'Orthoptères' },
    // Thysanoptères
    { name: 'Frankliniella occidentalis', common: 'Thrips californien', url: 'thysanopteres/index.html', order: 'Thysanoptères' },
    { name: 'Thrips tabaci', common: 'Thrips du tabac', url: 'thysanopteres/index.html', order: 'Thysanoptères' },
    { name: 'Pezothrips kellyanus', common: 'Thrips des agrumes', url: 'thysanopteres/index.html', order: 'Thysanoptères' },
];

/* ============================================================
   Navigation mobile
   ============================================================ */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fermer en cliquant sur un lien
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Navigation clavier : Échap ferme le menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

/* ============================================================
   Smooth scroll pour ancres internes
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const navH = document.querySelector('.navbar')?.offsetHeight || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
                window.scrollTo({ top, behavior: 'smooth' });
                // Accessibilité : focus sur la cible
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
}

/* ============================================================
   Clics sur les cartes d'ordres
   ============================================================ */
function initOrderCards() {
    const urlMap = {
        'coleopteres':   './coleopteres/index.html',
        'hemipteres':    './hemipteres/index.html',
        'lepidopteres':  './lepidopteres/index.html',
        'dipteres':      './dipteres/index.html',
        'thysanopteres': './thysanopteres/index.html',
        'hymenopteres':  './hymenopteres/index.html',
        'orthopteres':   './orthopteres/index.html',
    };

    document.querySelectorAll('.order-card').forEach(card => {
        const go = () => {
            const order = card.dataset.order;
            if (urlMap[order]) window.location.href = urlMap[order];
        };
        card.addEventListener('click', go);
        // Clavier : Entrée ou Espace
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
        });
    });
}

/* ============================================================
   Recherche globale
   ============================================================ */
function initGlobalSearch() {
    const input = document.getElementById('globalSearch');
    const dropdown = document.getElementById('searchResults');
    if (!input || !dropdown) return;

    let debounceTimer;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => performSearch(input.value.trim()), 150);
    });

    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2) dropdown.classList.add('active');
    });

    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Navigation clavier dans les résultats
    input.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); items[0].focus(); }
        if (e.key === 'Escape') { dropdown.classList.remove('active'); input.blur(); }
    });
}

function performSearch(query) {
    const dropdown = document.getElementById('searchResults');
    if (query.length < 2) { dropdown.classList.remove('active'); return; }

    const q = query.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.common.toLowerCase().includes(q) ||
        item.order.toLowerCase().includes(q)
    ).slice(0, 8);

    dropdown.innerHTML = '';
    if (results.length === 0) {
        dropdown.innerHTML = '<div class="search-result-item" style="color:var(--color-text-muted)">Aucun résultat trouvé</div>';
    } else {
        results.forEach((item, i) => {
            const el = document.createElement('div');
            el.className = 'search-result-item';
            el.setAttribute('role', 'option');
            el.setAttribute('tabindex', '0');
            el.innerHTML = `<strong>${item.name}</strong> <em>${item.common}</em>`;
            el.addEventListener('click', () => { window.location.href = item.url; });
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') window.location.href = item.url;
                if (e.key === 'ArrowDown') {
                    const next = dropdown.querySelectorAll('.search-result-item')[i + 1];
                    if (next) next.focus();
                }
                if (e.key === 'ArrowUp') {
                    const prev = dropdown.querySelectorAll('.search-result-item')[i - 1];
                    if (prev) prev.focus();
                    else document.getElementById('globalSearch').focus();
                }
                if (e.key === 'Escape') { dropdown.classList.remove('active'); document.getElementById('globalSearch').focus(); }
            });
            dropdown.appendChild(el);
        });
    }
    dropdown.classList.add('active');
}

/* ============================================================
   Compteurs animés (stats-bar)
   ============================================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1200;
            const step = 16;
            const increment = target / (duration / step);
            let current = 0;

            const timer = setInterval(() => {
                current = Math.min(current + increment, target);
                el.textContent = Math.floor(current);
                if (current >= target) { el.textContent = target; clearInterval(timer); }
            }, step);

            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ============================================================
   Bouton Retour en haut
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   Masquer/afficher la navbar au scroll
   ============================================================ */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        // Ne masquer qu'après 100px de scroll et seulement si le menu mobile est fermé
        if (y > 100 && y > lastY && !document.getElementById('navMenu')?.classList.contains('active')) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = '';
        }
        lastY = y;
    }, { passive: true });
    navbar.style.transition = 'transform 0.3s ease';
}

/* ============================================================
   Init global
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initOrderCards();
    initGlobalSearch();
    initCounters();
    initBackToTop();
    initNavbarScroll();
});
