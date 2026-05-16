/**
 * ENTOMASTER – Classification par Culture – Script v2
 *
 * Corrections / améliorations :
 * 1. Onglets VRAIMENT cliquables (event delegation robuste)
 * 2. Cartes cliquables → modal détaillé
 * 3. Tooltip au survol
 * 4. Recherche en direct dans la page (pas seulement dans la navbar)
 * 5. Compteur de résultats
 * 6. Grilles vides remplacées par un message
 */
'use strict';

const ORDER_ICONS_CLF = {
    'Coléoptères':'🪲','Lépidoptères':'🦋','Diptères':'🪰',
    'Hémiptères':'🐛','Thysanoptères':'🔬','Hyménoptères':'🐝',
    'Orthoptères':'🦗','Acariens':'🕷️'
};

/* ============================================================
   MAPPING clé → id de la grille
   ============================================================ */
const GRID_MAP = {
    cruciferes:     'g-cruciferes',
    solanacees:     'g-solanacees',
    cucurbitacees:  'g-cucurbitacees',
    legumineuses:   'g-legumineuses',
    betterave:      'g-betterave',
    rosacees_noyaux:'g-rosacees_noyaux',
    rosacees_pepins:'g-rosacees_pepins',
    agrumes:        'g-agrumes',
    vigne:          'g-vigne',
    fruits_rouges:  'g-fruits_rouges',
    olivier:        'g-olivier',
    ornementaux:    'g-ornementaux',
    palmiers:       'g-palmiers',
    cereales:       'g-cereales',
    cotonnier:      'g-cotonnier',
    luzerne:        'g-luzerne',
};

let allCards = [];   // {el, sp} pour le filtrage

/* ============================================================
   RENDU DES CARTES
   ============================================================ */
function renderAllCultures() {
    const data = window.speciesData;
    if (!data) { console.warn('speciesData non chargé'); return; }

    allCards = [];

    Object.entries(GRID_MAP).forEach(([key, gridId]) => {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const species = data[key];
        if (!species || !species.length) {
            grid.innerHTML = '<p style="font-size:.84rem;font-style:italic;color:var(--text-d);padding:.5rem 0">Aucune espèce répertoriée.</p>';
            return;
        }

        species.forEach(sp => {
            const card = createCultureCard(sp, key);
            grid.appendChild(card);
            allCards.push({ el: card, sp });
        });
    });

    updateCount();
}

function createCultureCard(sp, culturKey) {
    const card = document.createElement('article');
    card.className = 'sp-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${sp.name} – cliquer pour détails`);
    card.dataset.name    = (sp.name    || '').toLowerCase();
    card.dataset.order   = (sp.order   || '').toLowerCase();
    card.dataset.family  = (sp.family  || '').toLowerCase();
    card.dataset.culture = (sp.cultures|| '').toLowerCase();

    const icon  = ORDER_ICONS_CLF[sp.order] || '🐛';
    const img   = sp.image || '../images/placeholder.jpg';

    card.innerHTML = `
        <div class="sp-img">
            <img src="${e(img)}" alt="${e(sp.name)}" loading="lazy"
                 onerror="this.src='images/placeholder.jpg'">
            <span class="sp-img-badge">${e(sp.family || sp.order || '')}</span>
        </div>
        <div class="sp-body">
            <p class="sp-name">${e(sp.name)}</p>
            ${sp.author  ? `<p class="sp-author">${e(sp.author)}</p>` : ''}
            <span class="card-badge" style="width:fit-content">${icon} ${e(sp.order||'')}</span>
            ${sp.description ? `<p class="sp-family" style="font-size:.75rem;color:var(--text-m);line-height:1.35;margin-top:.25rem">${e(sp.description.slice(0,80))}…</p>` : ''}
            ${sp.cultures ? `<p class="sp-host">🌿 ${e(sp.cultures)}</p>` : ''}
        </div>
        <span class="sp-more">Voir détails →</span>
    `;

    /* Tooltip au survol */
    card.addEventListener('mouseenter', ev => showTooltip(ev, sp));
    card.addEventListener('mousemove',  posTooltip);
    card.addEventListener('mouseleave', hideTooltip);
    card.addEventListener('focus',      ev => showTooltip(ev, sp));
    card.addEventListener('blur',       hideTooltip);

    /* Modal au clic */
    const openModal = () => openCultureModal(sp);
    card.addEventListener('click', openModal);
    card.addEventListener('keydown', ev => { if (ev.key==='Enter'||ev.key===' '){ev.preventDefault();openModal();} });

    return card;
}

/* ============================================================
   TOOLTIP
   ============================================================ */
function showTooltip(ev, sp) {
    const tt = document.getElementById('spTooltip');
    if (!tt) return;
    tt.innerHTML = buildTooltip(sp);
    tt.classList.add('show');
    posTooltipAt(ev.clientX, ev.clientY);
}

function posTooltip(ev) {
    posTooltipAt(ev.clientX, ev.clientY);
}

function posTooltipAt(cx, cy) {
    const tt = document.getElementById('spTooltip');
    if (!tt || !tt.classList.contains('show')) return;
    const mg = 14;
    let x = cx + mg, y = cy + mg;
    if (x + 300 > window.innerWidth  - mg) x = cx - 300 - mg;
    if (y + 200 > window.innerHeight - mg) y = cy - 200 - mg;
    tt.style.left = x + 'px';
    tt.style.top  = y + 'px';
}

function hideTooltip() {
    const tt = document.getElementById('spTooltip');
    if (tt) tt.classList.remove('show');
}

function buildTooltip(sp) {
    const icon = ORDER_ICONS_CLF[sp.order] || '🐛';
    const rows = [];
    if (sp.author)   rows.push(['Auteur', sp.author]);
    if (sp.family)   rows.push(['Famille', sp.family]);
    if (sp.order)    rows.push(['Ordre', `${icon} ${sp.order}`]);
    if (sp.cultures) rows.push(['Culture', sp.cultures]);
    if (sp.description) rows.push(['Info', sp.description.slice(0,100)+(sp.description.length>100?'…':'')]);

    return `
        <div class="sp-tt-title">${e(sp.name)}</div>
        ${rows.map(([l,v]) => `<div class="sp-tt-row"><span class="sp-tt-label">${l} :</span><span class="sp-tt-val">${e(v)}</span></div>`).join('')}
        <p style="font-size:.68rem;color:var(--text-d);margin-top:.5rem">Cliquez pour la fiche complète</p>
    `;
}

/* ============================================================
   MODAL AU CLIC
   ============================================================ */
function openCultureModal(sp) {
    const modal = document.getElementById('speciesModal');
    const body  = document.getElementById('modalBody');
    if (!modal || !body) return;

    const icon = ORDER_ICONS_CLF[sp.order] || '🐛';
    const img  = sp.image ? `<img src="${e(sp.image)}" alt="${e(sp.name)}" class="modal-img" onerror="this.style.display='none'">` : '';

    body.innerHTML = `
        <div class="modal-header">
            <span class="modal-order-tag">${icon} ${e(sp.order||'')}</span>
            <h2 class="modal-title" id="modalTitle">${e(sp.name)}</h2>
            ${sp.author ? `<p class="modal-author">${e(sp.author)}</p>` : ''}
        </div>
        ${img}
        <div class="modal-grid">
            ${sp.family   ? `<div class="modal-field"><div class="modal-field-label">Famille</div><div class="modal-field-value"><em>${e(sp.family)}</em></div></div>` : ''}
            ${sp.order    ? `<div class="modal-field"><div class="modal-field-label">Ordre</div><div class="modal-field-value">${icon} ${e(sp.order)}</div></div>` : ''}
            ${sp.cultures ? `<div class="modal-field" style="grid-column:1/-1"><div class="modal-field-label">Cultures hôtes</div><div class="modal-field-value">🌿 ${e(sp.cultures)}</div></div>` : ''}
            ${sp.icon     ? `<div class="modal-field"><div class="modal-field-label">Icône</div><div class="modal-field-value" style="font-size:1.5rem">${sp.icon}</div></div>` : ''}
        </div>
        ${sp.description ? `<div class="modal-desc">${e(sp.description)}</div>` : ''}
        <div class="modal-footer">
            <a href="https://gd.eppo.int/search?q=${encodeURIComponent(sp.name)}" target="_blank" rel="noopener" class="modal-link">🔬 EPPO Global DB</a>
            <a href="https://www.catalogueoflife.org/data/search?q=${encodeURIComponent(sp.name)}" target="_blank" rel="noopener" class="modal-link">📚 Catalogue of Life</a>
        </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('modalClose')?.focus();
}

function closeCultureModal() {
    const modal = document.getElementById('speciesModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
}

function initModal() {
    document.getElementById('modalClose')?.addEventListener('click',   closeCultureModal);
    document.getElementById('modalOverlay')?.addEventListener('click', closeCultureModal);
    document.addEventListener('keydown', ev => { if (ev.key==='Escape') closeCultureModal(); });
}

/* ============================================================
   ONGLETS
   ============================================================ */
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn[data-tab]');
    const panels  = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            /* désactiver tout */
            buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            panels.forEach(p  => { p.classList.remove('active'); });

            /* activer la cible */
            btn.classList.add('active');
            btn.setAttribute('aria-selected','true');
            const panel = document.getElementById(`tab-${target}`);
            if (panel) panel.classList.add('active');

            /* scroll fluide vers le panneau */
            panel?.scrollIntoView({behavior:'smooth', block:'start'});
        });

        /* navigation flèches */
        btn.addEventListener('keydown', ev => {
            const all  = [...buttons];
            const idx  = all.indexOf(btn);
            if (ev.key==='ArrowRight') { ev.preventDefault(); all[(idx+1)%all.length].focus(); }
            if (ev.key==='ArrowLeft')  { ev.preventDefault(); all[(idx-1+all.length)%all.length].focus(); }
        });
    });
}

/* ============================================================
   FILTRAGE LOCAL (champ de recherche de la page)
   ============================================================ */
function initLocalSearch() {
    const input   = document.getElementById('clfSearch');
    const btn     = document.getElementById('clfSearchBtn');
    const live    = document.getElementById('clfLiveResults');
    if (!input) return;

    let debounce;

    const doFilter = () => {
        const q = input.value.trim().toLowerCase();
        filterCards(q);
        showLive(q);
    };

    input.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(doFilter, 130); });
    btn?.addEventListener('click', doFilter);
    input.addEventListener('keydown', ev => { if (ev.key==='Enter') doFilter(); if (ev.key==='Escape'){input.value='';filterCards('');if(live)live.classList.remove('open');} });

    document.addEventListener('click', ev => {
        if (live && !input.contains(ev.target) && !live.contains(ev.target))
            live.classList.remove('open');
    });
}

function filterCards(q) {
    let visible = 0;

    /* Si pas de filtre : tout réafficher, revenir au 1er onglet */
    if (!q) {
        allCards.forEach(({el}) => el.style.display = '');
        document.querySelectorAll('.culture-group').forEach(g => g.style.display = '');
        updateCount(allCards.length, allCards.length);
        return;
    }

    /* Ouvrir tous les panneaux pour chercher partout */
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('active'));
    document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });

    allCards.forEach(({el}) => {
        const match =
            el.dataset.name.includes(q) ||
            el.dataset.order.includes(q) ||
            el.dataset.family.includes(q) ||
            el.dataset.culture.includes(q);
        el.style.display = match ? '' : 'none';
        if (match) visible++;
    });

    /* Cacher les groupes entièrement vides */
    document.querySelectorAll('.culture-group').forEach(group => {
        const grid = group.querySelector('.sp-grid');
        if (!grid) return;
        const anyVisible = [...grid.querySelectorAll('.sp-card')].some(c => c.style.display !== 'none');
        group.style.display = anyVisible ? '' : 'none';
    });

    updateCount(visible, allCards.length);
}

function showLive(q) {
    const live = document.getElementById('clfLiveResults');
    if (!live || q.length < 2) { live?.classList.remove('open'); return; }

    const matches = allCards
        .filter(({el}) => el.style.display !== 'none')
        .slice(0, 7);

    if (!matches.length) { live.innerHTML='<div class="clf-live-item">Aucun résultat</div>'; live.classList.add('open'); return; }

    live.innerHTML = matches.map(({sp}) =>
        `<div class="clf-live-item" tabindex="0">
            <strong>${e(sp.name)}</strong> <em>– ${e(sp.order||'')}${sp.cultures?' | '+sp.cultures:''}</em>
        </div>`
    ).join('');

    live.querySelectorAll('.clf-live-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            document.getElementById('clfSearch').value = matches[i].sp.name;
            live.classList.remove('open');
            openCultureModal(matches[i].sp);
        });
        item.addEventListener('keydown', ev => { if(ev.key==='Enter') item.click(); });
    });

    live.classList.add('open');
}

function updateCount(visible, total) {
    const el = document.getElementById('clfCount');
    if (!el) return;
    if (visible === undefined) {
        el.textContent = `${allCards.length} espèce${allCards.length>1?'s':''} répertoriée${allCards.length>1?'s':''}`;
    } else {
        el.textContent = visible === total
            ? `${total} espèce${total>1?'s':''} répertoriée${total>1?'s':''}`
            : `${visible} / ${total} espèce${total>1?'s':''} affichée${visible>1?'s':''}`;
    }
}

/* ============================================================
   UTILITAIRES
   ============================================================ */
function e(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    /* attendre que classification_data.js soit chargé */
    const wait = setInterval(() => {
        if (window.speciesData) {
            clearInterval(wait);
            renderAllCultures();
            initTabs();
            initLocalSearch();
            initModal();
        }
    }, 40);
    setTimeout(() => clearInterval(wait), 6000);
});
