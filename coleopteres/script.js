/**
 * ENTOMASTER – Coléoptères – Script (version améliorée)
 * Fonctionnalités :
 * - Rendu dynamique des espèces par famille
 * - Filtrage par nom, famille, plante hôte (temps réel)
 * - Tooltip enrichi au survol
 * - Particules d'arrière-plan
 * - Retour en haut
 */

'use strict';

/* ============================================================
   Initialisation des particules
   ============================================================ */
function initializeParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 600 ? 20 : 40;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
        p.style.animationDuration = `${(Math.random() * 4 + 5).toFixed(2)}s`;
        frag.appendChild(p);
    }
    container.appendChild(frag);
}

/* ============================================================
   Rendu des espèces
   ============================================================ */
const FAMILY_ORDER = [
    'buprestidae', 'curculionidae', 'scolytidae', 'chrysomelidae',
    'cerambycidae', 'meloidae', 'coccinelidae', 'bostrychidae',
    'elateridae', 'scarabaeidae', 'carabidae', 'dryophthoridae', 'nitidulidae'
];

const FAMILY_NAMES = {
    buprestidae:   'Buprestidae',
    curculionidae: 'Curculionidae',
    scolytidae:    'Scolytidae (Scolytes)',
    chrysomelidae: 'Chrysomelidae',
    cerambycidae:  'Cerambycidae',
    meloidae:      'Meloidae',
    coccinelidae:  'Coccinelidae',
    bostrychidae:  'Bostrychidae',
    elateridae:    'Elateridae',
    scarabaeidae:  'Scarabaeidae',
    carabidae:     'Carabidae',
    dryophthoridae:'Dryophthoridae',
    nitidulidae:   'Nitidulidae',
};

let allCards = [];  // pour le filtrage

function renderSpecies() {
    const container = document.getElementById('species-container');
    if (!container || !window.speciesData) return;

    const frag = document.createDocumentFragment();
    allCards = [];

    FAMILY_ORDER.forEach(familyKey => {
        const species = window.speciesData[familyKey];
        if (!species || !species.length) return;

        const section = document.createElement('section');
        section.className = 'family-section';
        section.dataset.family = familyKey;

        const header = document.createElement('div');
        header.className = 'family-header';
        header.innerHTML = `
            <h2 class="family-title">Famille : <em>${FAMILY_NAMES[familyKey] || familyKey}</em></h2>
            <span class="family-count">${species.length} espèce${species.length > 1 ? 's' : ''}</span>
        `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'species-grid';
        grid.setAttribute('role', 'list');

        species.forEach(sp => {
            const card = createSpeciesCard(sp, familyKey);
            grid.appendChild(card);
            allCards.push({ el: card, sp, familyKey });
        });

        section.appendChild(grid);
        frag.appendChild(section);
    });

    container.appendChild(frag);
    updateFilterCount();
}

function createSpeciesCard(sp, familyKey) {
    const card = document.createElement('article');
    card.className = 'species-card';
    card.dataset.family = familyKey;
    card.dataset.name = (sp.scientificName || '').toLowerCase();
    card.dataset.common = (sp.commonName || '').toLowerCase();
    card.dataset.host = (sp.host || '').toLowerCase();
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${sp.scientificName}${sp.commonName ? ' – ' + sp.commonName : ''}`);

    const imgSrc = sp.image || 'placeholder.jpg';
    const commonNameHTML = sp.commonName
        ? `<p class="species-common-name">${escHtml(sp.commonName)}</p>`
        : '';
    const hostHTML = sp.host
        ? `<p class="species-host">🌿 ${escHtml(sp.host)}</p>`
        : '';
    const sizeHTML = sp.size
        ? `<p class="species-size">📏 ${escHtml(sp.size)}</p>`
        : '';
    const authorHTML = sp.author
        ? `<small style="color:var(--color-text-muted);font-size:0.7rem;">${escHtml(sp.author)}</small>`
        : '';

    card.innerHTML = `
        <div class="species-image" data-family="${escHtml(FAMILY_NAMES[familyKey] || familyKey)}">
            <img src="${escHtml(imgSrc)}"
                 alt="${escHtml(sp.scientificName)}"
                 loading="lazy"
                 width="300" height="225"
                 onerror="this.src='../images/placeholder.jpg'">
        </div>
        <div class="species-info">
            <h3 class="species-info h4" style="font-family:var(--font-display);font-style:italic;font-size:0.95rem;color:var(--color-text);font-weight:700;">
                ${escHtml(sp.scientificName)}
            </h3>
            ${authorHTML}
            ${commonNameHTML}
            <p class="species-family" style="font-size:0.75rem;color:var(--color-text-muted);font-style:italic;">
                ${escHtml(FAMILY_NAMES[familyKey] || familyKey)}
            </p>
            ${hostHTML}
            ${sizeHTML}
        </div>
        <button class="species-btn" aria-expanded="false">Détails morphologiques ▸</button>
    `;

    // Tooltip au survol
    card.addEventListener('mouseenter', (e) => showTooltip(e, sp));
    card.addEventListener('mousemove', positionTooltip);
    card.addEventListener('mouseleave', hideTooltip);
    card.addEventListener('focus', (e) => showTooltip(e, sp));
    card.addEventListener('blur', hideTooltip);

    // Bouton détails
    const btn = card.querySelector('.species-btn');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDetails(card, sp, btn);
    });

    return card;
}

/* ============================================================
   Tooltip
   ============================================================ */
function showTooltip(e, sp) {
    const tooltip = document.getElementById('species-tooltip');
    if (!tooltip) return;

    tooltip.querySelector('.tooltip-title').textContent = `${sp.scientificName}${sp.author ? ' ' + sp.author : ''}`;
    tooltip.querySelector('.tooltip-content').innerHTML = buildTooltipContent(sp);
    tooltip.classList.add('visible');
    positionTooltip(e);
}

function buildTooltipContent(sp) {
    const rows = [];
    if (sp.commonName) rows.push(['Nom commun', sp.commonName]);
    if (sp.suborder) rows.push(['Sous-ordre', sp.suborder]);
    if (sp.color) rows.push(['Couleur', sp.color]);
    if (sp.size) rows.push(['Taille', sp.size]);
    if (sp.host) rows.push(['Plante hôte', sp.host]);
    if (sp.description) rows.push(['Description', sp.description]);

    return rows.map(([label, val]) =>
        `<div class="tooltip-row"><span class="tooltip-label">${escHtml(label)} :</span><span>${escHtml(val)}</span></div>`
    ).join('');
}

function positionTooltip(e) {
    const tooltip = document.getElementById('species-tooltip');
    if (!tooltip || !tooltip.classList.contains('visible')) return;
    const margin = 16;
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    let x = (e.clientX || 0) + margin;
    let y = (e.clientY || 0) + margin;
    if (x + tw > window.innerWidth - margin) x = (e.clientX || 0) - tw - margin;
    if (y + th > window.innerHeight - margin) y = (e.clientY || 0) - th - margin;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('species-tooltip');
    if (tooltip) tooltip.classList.remove('visible');
}

/* ============================================================
   Détails inline (toggle)
   ============================================================ */
function toggleDetails(card, sp, btn) {
    let detailsEl = card.querySelector('.species-details');
    if (detailsEl) {
        const open = detailsEl.style.display !== 'none';
        detailsEl.style.display = open ? 'none' : 'block';
        btn.setAttribute('aria-expanded', !open);
        btn.textContent = open ? 'Détails morphologiques ▸' : 'Masquer les détails ▾';
    } else {
        detailsEl = document.createElement('div');
        detailsEl.className = 'species-details';
        detailsEl.style.cssText = 'padding:0 1rem 1rem;font-size:0.84rem;color:var(--color-text-muted);line-height:1.55;border-top:1px solid var(--color-border);margin-top:0.5rem;';
        detailsEl.innerHTML = `
            ${sp.description ? `<p style="margin:0.5rem 0">${escHtml(sp.description)}</p>` : ''}
            ${sp.color ? `<p><strong>Couleur :</strong> ${escHtml(sp.color)}</p>` : ''}
            ${sp.size ? `<p><strong>Taille :</strong> ${escHtml(sp.size)}</p>` : ''}
            ${sp.host ? `<p><strong>Plante hôte :</strong> ${escHtml(sp.host)}</p>` : ''}
            <p style="margin-top:0.5rem;font-style:italic;font-size:0.75rem;color:rgba(138,171,146,0.5)">
                Nomenclature conforme au <a href="https://www.catalogueoflife.org" target="_blank" rel="noopener noreferrer" style="color:var(--color-gold)">Catalogue of Life</a>
            </p>
        `;
        card.insertBefore(detailsEl, btn);
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Masquer les détails ▾';
    }
}

/* ============================================================
   Filtrage
   ============================================================ */
function initFilters() {
    const searchInput = document.getElementById('speciesSearch');
    const familySelect = document.getElementById('familyFilter');
    const noResults = document.getElementById('no-results');
    const resetBtn = document.getElementById('resetFilters');

    let debounce;
    const applyFilters = () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const query = (searchInput?.value || '').toLowerCase().trim();
            const family = (familySelect?.value || '').toLowerCase();

            let visible = 0;
            const familySections = {};

            allCards.forEach(({ el, sp, familyKey }) => {
                const matchSearch = !query ||
                    el.dataset.name.includes(query) ||
                    el.dataset.common.includes(query) ||
                    el.dataset.host.includes(query);
                const matchFamily = !family || familyKey === family;
                const show = matchSearch && matchFamily;
                el.style.display = show ? '' : 'none';
                if (show) {
                    visible++;
                    familySections[familyKey] = true;
                }
            });

            // Masquer les sections de famille vides
            document.querySelectorAll('.family-section').forEach(sec => {
                sec.style.display = familySections[sec.dataset.family] ? '' : 'none';
            });

            if (noResults) noResults.hidden = visible > 0;
            updateFilterCount(visible);
        }, 120);
    };

    searchInput?.addEventListener('input', applyFilters);
    familySelect?.addEventListener('change', applyFilters);
    resetBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (familySelect) familySelect.value = '';
        applyFilters();
    });
}

function updateFilterCount(visible) {
    const countEl = document.getElementById('filterCount');
    if (!countEl) return;
    const total = allCards.length;
    const shown = visible !== undefined ? visible : total;
    countEl.textContent = shown === total
        ? `${total} espèces`
        : `${shown} / ${total} espèces`;
}

/* ============================================================
   Retour en haut
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   Utilitaires
   ============================================================ */
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ============================================================
   Init global
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();

    // Attendre speciesData (chargé en tant que script séparé)
    const waitForData = setInterval(() => {
        if (window.speciesData) {
            clearInterval(waitForData);
            renderSpecies();
            initFilters();
            initBackToTop();
        }
    }, 50);

    // Timeout de sécurité
    setTimeout(() => clearInterval(waitForData), 5000);
});
