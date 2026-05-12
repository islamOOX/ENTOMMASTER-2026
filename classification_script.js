/**
 * ENTOMASTER – Classification par Culture – Script (version améliorée)
 * - Rendu dynamique des cartes d'espèces par culture
 * - Onglets accessibles (ARIA)
 * - Recherche en direct avec highlight
 * - Retour en haut
 * - Navigation mobile
 */

'use strict';

/* ============================================================
   Emojis par ordre (pour badges visuels)
   ============================================================ */
const ORDER_ICONS = {
    'Coléoptères':   '🪲',
    'Lépidoptères':  '🦋',
    'Diptères':      '🪰',
    'Hémiptères':    '🐛',
    'Thysanoptères': '🔬',
    'Hyménoptères':  '🐝',
    'Orthoptères':   '🦗',
    'Acariens':      '🕷️',
};

/* ============================================================
   Mapping culture → id du conteneur
   ============================================================ */
const GRID_MAP = {
    cruciferes:      'cruciferes-grid',
    solanacees:      'solanacees-grid',
    cucurbitacees:   'cucurbitacees-grid',
    legumineuses:    'legumineuses-grid',
    betterave:       'betterave-grid',
    olivier:         'olivier-grid',
    agrumes:         'agrumes-grid',
    rosacees:        'rosacees-grid',
    vigne:           'vigne-grid',
    palmier:         'palmier-grid',
    ornementales:    'ornementales-grid',
    cereales:        'cereales-grid',
    oleagineux:      'oleagineux-grid',
};

/* ============================================================
   Rendu des cartes
   ============================================================ */
function renderAllSpecies() {
    if (!window.speciesData) return;

    Object.entries(GRID_MAP).forEach(([key, gridId]) => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        const species = window.speciesData[key];
        if (!species || !species.length) {
            grid.innerHTML = '<p class="empty-group">Aucune espèce répertoriée pour cette culture.</p>';
            return;
        }
        const frag = document.createDocumentFragment();
        species.forEach(sp => frag.appendChild(createCard(sp)));
        grid.appendChild(frag);
    });
}

function createCard(sp) {
    const card = document.createElement('article');
    card.className = 'species-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${sp.name}${sp.cultures ? ' – ' + sp.cultures : ''}`);
    card.dataset.name = (sp.name || '').toLowerCase();
    card.dataset.cultures = (sp.cultures || '').toLowerCase();
    card.dataset.order = (sp.order || '').toLowerCase();
    card.dataset.family = (sp.family || '').toLowerCase();

    const icon = ORDER_ICONS[sp.order] || '🐛';
    const imgSrc = sp.image || '../images/placeholder.jpg';

    card.innerHTML = `
        <div class="species-img-wrap">
            <img src="${escHtml(imgSrc)}"
                 alt="${escHtml(sp.name)}"
                 loading="lazy"
                 width="240" height="180"
                 onerror="this.src='images/placeholder.jpg'">
            <span class="species-order-icon" aria-hidden="true">${icon}</span>
        </div>
        <div class="species-card-body">
            <p class="species-name">${escHtml(sp.name)}</p>
            ${sp.author ? `<small style="color:var(--color-text-muted);font-size:0.7rem;">${escHtml(sp.author)}</small>` : ''}
            ${sp.order ? `<span class="species-order-badge">${escHtml(sp.order)}</span>` : ''}
            ${sp.family ? `<p class="species-family-label">${escHtml(sp.family)}</p>` : ''}
            ${sp.description ? `<p class="species-desc-short">${escHtml(sp.description)}</p>` : ''}
            ${sp.cultures ? `<p style="font-size:0.72rem;color:var(--color-accent);margin-top:0.35rem;">🌿 ${escHtml(sp.cultures)}</p>` : ''}
        </div>
    `;

    return card;
}

/* ============================================================
   Gestion des onglets (ARIA)
   ============================================================ */
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            buttons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => {
                p.classList.remove('active');
                p.hidden = true;
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const panel = document.getElementById(target);
            if (panel) { panel.classList.add('active'); panel.hidden = false; }
        });

        // Navigation clavier dans les onglets
        btn.addEventListener('keydown', (e) => {
            const btns = [...document.querySelectorAll('.tab-btn')];
            const idx = btns.indexOf(btn);
            if (e.key === 'ArrowRight') { e.preventDefault(); btns[(idx + 1) % btns.length].focus(); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); btns[(idx - 1 + btns.length) % btns.length].focus(); }
        });
    });
}

/* ============================================================
   Recherche en direct
   ============================================================ */
function initSearch() {
    const input = document.getElementById('cultureSearch');
    const searchBtn = document.getElementById('searchBtn');
    const liveResults = document.getElementById('liveSearchResults');
    const resultCount = document.getElementById('resultCount');
    if (!input) return;

    let debounce;

    const doSearch = () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) {
            if (liveResults) { liveResults.innerHTML = ''; liveResults.classList.remove('active'); }
            resetSearch();
            return;
        }
        showLiveResults(q);
        filterCards(q);
    };

    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(doSearch, 150);
    });
    searchBtn?.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });

    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !liveResults?.contains(e.target)) {
            liveResults?.classList.remove('active');
        }
    });
}

function getAllCards() {
    return [...document.querySelectorAll('.species-card')];
}

function filterCards(q) {
    const cards = getAllCards();
    let count = 0;
    cards.forEach(card => {
        const match = card.dataset.name.includes(q) ||
                      card.dataset.cultures.includes(q) ||
                      card.dataset.order.includes(q) ||
                      card.dataset.family.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) count++;
    });

    // Activer tous les onglets pour chercher partout
    document.querySelectorAll('.tab-content').forEach(p => {
        p.classList.add('active');
        p.hidden = false;
    });
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });

    const rc = document.getElementById('resultCount');
    if (rc) rc.textContent = `${count} résultat${count !== 1 ? 's' : ''} trouvé${count !== 1 ? 's' : ''}`;
}

function resetSearch() {
    getAllCards().forEach(c => { c.style.display = ''; });
    // Réactiver le premier onglet
    const first = document.querySelector('.tab-btn');
    if (first) first.click();
    const rc = document.getElementById('resultCount');
    if (rc) rc.textContent = '';
}

function showLiveResults(q) {
    const liveResults = document.getElementById('liveSearchResults');
    if (!liveResults || !window.speciesData) return;

    const matches = [];
    Object.values(window.speciesData).forEach(arr => {
        if (!Array.isArray(arr)) return;
        arr.forEach(sp => {
            if (
                (sp.name || '').toLowerCase().includes(q) ||
                (sp.cultures || '').toLowerCase().includes(q) ||
                (sp.order || '').toLowerCase().includes(q)
            ) {
                matches.push(sp);
            }
        });
    });

    const top = matches.slice(0, 6);
    if (!top.length) {
        liveResults.innerHTML = '<div class="live-result-item" style="color:var(--color-text-muted)">Aucun résultat</div>';
        liveResults.classList.add('active');
        return;
    }

    liveResults.innerHTML = top.map(sp =>
        `<div class="live-result-item" tabindex="0" role="option">
            <strong>${escHtml(sp.name)}</strong>
            <em> – ${escHtml(sp.order || '')}${sp.cultures ? ' | ' + sp.cultures : ''}</em>
        </div>`
    ).join('');
    liveResults.classList.add('active');

    liveResults.querySelectorAll('.live-result-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.getElementById('cultureSearch').value = top[i].name;
            filterCards(top[i].name.toLowerCase());
            liveResults.classList.remove('active');
        });
    });
}

/* ============================================================
   Navigation mobile
   ============================================================ */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================================
   Retour en haut
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
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
   Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const waitData = setInterval(() => {
        if (window.speciesData) {
            clearInterval(waitData);
            renderAllSpecies();
            initTabs();
            initSearch();
            initMobileNav();
            initBackToTop();
        }
    }, 50);
    setTimeout(() => clearInterval(waitData), 5000);
});
