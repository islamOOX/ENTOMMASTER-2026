/**
 * ENTOMASTER – Coléoptères – Script v2
 * - Rendu des 45 espèces par famille
 * - Tooltip enrichi au survol
 * - Modal détaillé au clic
 * - Filtre temps réel (nom, famille, hôte)
 * - Particules de fond
 * - Retour en haut
 */
'use strict';

const FAMILY_LABELS = {
    buprestidae:   'Buprestidae',
    curculionidae: 'Curculionidae',
    scolytidae:    'Scolytidae',
    chrysomelidae: 'Chrysomelidae',
    cerambycidae:  'Cerambycidae',
    meloidae:      'Meloidae',
    coccinellidae: 'Coccinellidae',
    bostrychidae:  'Bostrychidae',
    elateridae:    'Elateridae',
    scarabaeidae:  'Scarabaeidae',
    carabidae:     'Carabidae',
    dryophthoridae:'Dryophthoridae',
    nitidulidae:   'Nitidulidae',
};

const FAMILY_ORDER = Object.keys(FAMILY_LABELS);

let allCards = [];

/* ============================================================
   RENDU
   ============================================================ */
function renderSpecies() {
    const container = document.getElementById('species-container');
    if (!container || !window.speciesData) return;

    const frag = document.createDocumentFragment();
    allCards = [];

    FAMILY_ORDER.forEach(fKey => {
        const spp = window.speciesData[fKey];
        if (!spp || !spp.length) return;

        const section = document.createElement('section');
        section.className = 'family-section';
        section.dataset.family = fKey;

        const hdr = document.createElement('div');
        hdr.className = 'family-hdr';
        hdr.innerHTML = `<h2>Famille : <em>${FAMILY_LABELS[fKey]}</em></h2>
                         <span class="family-count">${spp.length} espèce${spp.length>1?'s':''}</span>`;
        section.appendChild(hdr);

        const grid = document.createElement('div');
        grid.className = 'sp-grid';
        grid.setAttribute('role','list');

        spp.forEach(sp => {
            const card = createCard(sp, fKey);
            grid.appendChild(card);
            allCards.push({ el: card, sp, fKey });
        });

        section.appendChild(grid);
        frag.appendChild(section);
    });

    container.appendChild(frag);
    updateCount();
}

function createCard(sp, fKey) {
    const card = document.createElement('article');
    card.className = 'sp-card';
    card.setAttribute('role','listitem');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label', `${sp.scientificName} – cliquer pour détails`);
    card.dataset.name   = (sp.scientificName||'').toLowerCase();
    card.dataset.common = (sp.commonName||'').toLowerCase();
    card.dataset.host   = (sp.host||'').toLowerCase();
    card.dataset.family = fKey;

    const img = sp.image || '../images/placeholder.jpg';

    card.innerHTML = `
        <div class="sp-img">
            <img src="${e(img)}" alt="${e(sp.scientificName)}" loading="lazy" width="300" height="225"
                 onerror="this.src='../images/placeholder.jpg'">
            <span class="sp-img-badge">${e(FAMILY_LABELS[fKey]||fKey)}</span>
        </div>
        <div class="sp-body">
            <p class="sp-name">${e(sp.scientificName)}</p>
            ${sp.author     ? `<p class="sp-author">${e(sp.author)}</p>` : ''}
            ${sp.commonName ? `<p class="sp-common">${e(sp.commonName)}</p>` : ''}
            <p class="sp-family">${e(FAMILY_LABELS[fKey]||fKey)}</p>
            ${sp.host ? `<p class="sp-host">🌿 ${e(sp.host)}</p>` : ''}
            ${sp.size ? `<p class="sp-size">📏 ${e(sp.size)}</p>` : ''}
        </div>
        <span class="sp-more">Voir la fiche →</span>
    `;

    /* Tooltip */
    card.addEventListener('mouseenter', ev => showTooltip(ev, sp, fKey));
    card.addEventListener('mousemove',  posTooltip);
    card.addEventListener('mouseleave', hideTooltip);
    card.addEventListener('focus',      ev => showTooltip(ev, sp, fKey));
    card.addEventListener('blur',       hideTooltip);

    /* Modal */
    const open = () => openModal(sp, fKey);
    card.addEventListener('click', open);
    card.addEventListener('keydown', ev => { if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();open();} });

    return card;
}

/* ============================================================
   TOOLTIP
   ============================================================ */
function showTooltip(ev, sp, fKey) {
    const tt = document.getElementById('spTooltip');
    if (!tt) return;
    tt.innerHTML = `
        <div class="sp-tt-title">${e(sp.scientificName)}</div>
        ${sp.author     ? row('Auteur',    sp.author)     : ''}
        ${sp.commonName ? row('Nom commun', sp.commonName) : ''}
        ${fKey          ? row('Famille',   FAMILY_LABELS[fKey]||fKey) : ''}
        ${sp.color      ? row('Couleur',   sp.color)      : ''}
        ${sp.size       ? row('Taille',    sp.size)       : ''}
        ${sp.host       ? row('Plante hôte', sp.host)     : ''}
        ${sp.description? row('Description', sp.description.slice(0,90)+(sp.description.length>90?'…':'')) : ''}
        <p style="font-size:.66rem;color:var(--text-d);margin-top:.5rem">Cliquez pour la fiche complète</p>
    `;
    tt.classList.add('show');
    posTooltipAt(ev.clientX, ev.clientY);
}

function row(label, val) {
    return `<div class="sp-tt-row"><span class="sp-tt-label">${label} :</span><span class="sp-tt-val">${e(val)}</span></div>`;
}

function posTooltip(ev) { posTooltipAt(ev.clientX, ev.clientY); }
function posTooltipAt(cx, cy) {
    const tt = document.getElementById('spTooltip');
    if (!tt?.classList.contains('show')) return;
    const mg=14, tw=300, th=220;
    let x=cx+mg, y=cy+mg;
    if (x+tw > window.innerWidth-mg)  x=cx-tw-mg;
    if (y+th > window.innerHeight-mg) y=cy-th-mg;
    tt.style.left=x+'px'; tt.style.top=y+'px';
}
function hideTooltip() { document.getElementById('spTooltip')?.classList.remove('show'); }

/* ============================================================
   MODAL
   ============================================================ */
function openModal(sp, fKey) {
    const modal = document.getElementById('speciesModal');
    const body  = document.getElementById('modalBody');
    if (!modal || !body) return;

    const img = sp.image ? `<img src="${e(sp.image)}" alt="${e(sp.scientificName)}" class="modal-img" onerror="this.style.display='none'">` : '';

    body.innerHTML = `
        <div class="modal-header">
            <span class="modal-order-tag">🪲 Coléoptères</span>
            <h2 class="modal-title" id="modalTitle">${e(sp.scientificName)}</h2>
            ${sp.author     ? `<p class="modal-author">${e(sp.author)}</p>` : ''}
            ${sp.commonName ? `<p class="modal-common">${e(sp.commonName)}</p>` : ''}
        </div>
        ${img}
        <div class="modal-grid">
            ${sp.scientificName ? `<div class="modal-field"><div class="modal-field-label">Nom scientifique</div><div class="modal-field-value"><em>${e(sp.scientificName)}</em></div></div>` : ''}
            ${fKey ? `<div class="modal-field"><div class="modal-field-label">Famille</div><div class="modal-field-value">${e(FAMILY_LABELS[fKey]||fKey)}</div></div>` : ''}
            ${sp.size  ? `<div class="modal-field"><div class="modal-field-label">Taille</div><div class="modal-field-value">${e(sp.size)}</div></div>` : ''}
            ${sp.color ? `<div class="modal-field"><div class="modal-field-label">Couleur</div><div class="modal-field-value">${e(sp.color)}</div></div>` : ''}
            ${sp.host  ? `<div class="modal-field" style="grid-column:1/-1"><div class="modal-field-label">Plante hôte</div><div class="modal-field-value">🌿 ${e(sp.host)}</div></div>` : ''}
        </div>
        ${sp.description ? `<div class="modal-desc">${e(sp.description)}</div>` : ''}
        ${sp.suborder ? `<p style="font-size:.8rem;color:var(--text-m);margin-top:.8rem">Sous-ordre : <em>${e(sp.suborder)}</em></p>` : ''}
        <div class="modal-footer">
            <a href="https://gd.eppo.int/search?q=${encodeURIComponent(sp.scientificName)}" target="_blank" rel="noopener" class="modal-link">🔬 EPPO Global DB</a>
            <a href="https://www.catalogueoflife.org/data/search?q=${encodeURIComponent(sp.scientificName)}" target="_blank" rel="noopener" class="modal-link">📚 Catalogue of Life</a>
        </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('modalClose')?.focus();
}

function closeModal() {
    const m = document.getElementById('speciesModal');
    if (m) { m.hidden = true; document.body.style.overflow = ''; }
}

function initModal() {
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('modalOverlay')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', ev => { if (ev.key==='Escape') closeModal(); });
}

/* ============================================================
   FILTRE
   ============================================================ */
function initFilter() {
    const search = document.getElementById('spSearch');
    const fam    = document.getElementById('famFilter');
    const noRes  = document.getElementById('noResults');
    const reset  = document.getElementById('resetBtn');
    let debounce;

    const apply = () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const q  = (search?.value||'').toLowerCase().trim();
            const f  = (fam?.value||'').toLowerCase();
            let vis  = 0;
            const secVis = {};

            allCards.forEach(({el, fKey}) => {
                const match =
                    (!q || el.dataset.name.includes(q) || el.dataset.common.includes(q) || el.dataset.host.includes(q)) &&
                    (!f || el.dataset.family === f);
                el.style.display = match ? '' : 'none';
                if (match) { vis++; secVis[fKey] = true; }
            });

            document.querySelectorAll('.family-section').forEach(sec => {
                sec.style.display = secVis[sec.dataset.family] ? '' : 'none';
            });

            if (noRes) noRes.classList.toggle('show', vis === 0);
            updateCount(vis);
        }, 120);
    };

    search?.addEventListener('input', apply);
    fam?.addEventListener('change', apply);
    reset?.addEventListener('click', () => {
        if (search) search.value = '';
        if (fam)    fam.value   = '';
        apply();
    });
}

function updateCount(visible) {
    const el = document.getElementById('filterCount');
    if (!el) return;
    const total = allCards.length;
    const v = visible !== undefined ? visible : total;
    el.textContent = v === total ? `${total} espèces` : `${v} / ${total} espèces`;
}

/* ============================================================
   PARTICULES
   ============================================================ */
function initParticles() {
    const wrap = document.createElement('div');
    wrap.className = 'particles-bg';
    wrap.setAttribute('aria-hidden','true');
    document.body.insertBefore(wrap, document.body.firstChild);

    const n = window.innerWidth < 600 ? 15 : 35;
    for (let i=0; i<n; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random()*100}%`;
        p.style.top  = `${Math.random()*100}%`;
        p.style.animationDelay    = `${(Math.random()*6).toFixed(2)}s`;
        p.style.animationDuration = `${(Math.random()*4+5).toFixed(2)}s`;
        wrap.appendChild(p);
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
    initParticles();
    initModal();

    const wait = setInterval(() => {
        if (window.speciesData) {
            clearInterval(wait);
            renderSpecies();
            initFilter();
        }
    }, 40);
    setTimeout(() => clearInterval(wait), 5000);
});
