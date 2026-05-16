/**
 * ENTOMASTER – Script principal unifié v2
 * - Recherche globale sur 129 espèces (GLOBAL_SEARCH_INDEX)
 * - Modal de détail au clic sur un résultat de recherche
 * - Compteurs animés
 * - Navigation mobile
 * - Retour en haut
 * - Masquage/affichage navbar au scroll
 */
'use strict';

/* ================================================================
   UTILITAIRES
   ================================================================ */
const $ = id => document.getElementById(id);
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const ORDER_ICONS = {
    'Coléoptères':'🪲','Lépidoptères':'🦋','Diptères':'🪰',
    'Hémiptères':'🐛','Thysanoptères':'🔬','Hyménoptères':'🐝',
    'Orthoptères':'🦗','Acariens':'🕷️'
};

/* ================================================================
   NAVIGATION MOBILE
   ================================================================ */
function initMobileNav() {
    const btn  = $('hamburger');
    const menu = $('navMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.classList.toggle('active', open);
        btn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded','false');
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            menu.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded','false');
            btn.focus();
        }
    });
}

/* ================================================================
   NAVBAR HIDE/SHOW ON SCROLL
   ================================================================ */
function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    nav.style.transition = 'transform 0.3s ease';
    let last = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const menuOpen = document.getElementById('navMenu')?.classList.contains('open');
        if (y > 120 && y > last && !menuOpen) nav.classList.add('hidden');
        else nav.classList.remove('hidden');
        last = y;
    }, {passive:true});
}

/* ================================================================
   SMOOTH SCROLL ANCRES
   ================================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const navH = document.querySelector('.navbar')?.offsetHeight || 68;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior:'smooth' });
        });
    });
}

/* ================================================================
   CARTES D'ORDRES (page d'accueil)
   ================================================================ */
function initOrderCards() {
    document.querySelectorAll('.order-card[data-href]').forEach(card => {
        const go = () => window.location.href = card.dataset.href;
        card.addEventListener('click', go);
        card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' '){e.preventDefault();go();} });
    });
}

/* ================================================================
   COMPTEURS ANIMÉS
   ================================================================ */
function initCounters() {
    const els = document.querySelectorAll('.stat-n[data-to]');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = +el.dataset.to;
            const step = 16;
            const dur  = 1100;
            const inc  = target / (dur / step);
            let cur = 0;
            const t = setInterval(() => {
                cur = Math.min(cur + inc, target);
                el.textContent = Math.floor(cur);
                if (cur >= target) { el.textContent = target; clearInterval(t); }
            }, step);
            obs.unobserve(el);
        });
    }, {threshold:0.6});
    els.forEach(el => obs.observe(el));
}

/* ================================================================
   RETOUR EN HAUT
   ================================================================ */
function initBackToTop() {
    const btn = $('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), {passive:true});
    btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

/* ================================================================
   MODAL ESPÈCE (pour résultats de recherche)
   ================================================================ */
function openSpeciesModal(sp) {
    const modal = $('speciesModal');
    const body  = $('modalBody');
    if (!modal || !body) return;

    const icon = ORDER_ICONS[sp.order] || '🐛';
    const imgHtml = sp.image
        ? `<img src="${esc(sp.image)}" alt="${esc(sp.name)}" class="modal-img" onerror="this.style.display='none'">`
        : '';

    body.innerHTML = `
        <div class="modal-header">
            <span class="modal-order-tag">${icon} ${esc(sp.order)}</span>
            <h2 class="modal-title" id="modalTitle">${esc(sp.name)}</h2>
            ${sp.author  ? `<p class="modal-author">${esc(sp.author)}</p>`  : ''}
            ${sp.common && sp.common !== sp.name ? `<p class="modal-common">${esc(sp.common)}</p>` : ''}
        </div>
        ${imgHtml}
        <div class="modal-grid">
            ${sp.family  ? `<div class="modal-field"><div class="modal-field-label">Famille</div><div class="modal-field-value"><em>${esc(sp.family)}</em></div></div>` : ''}
            ${sp.order   ? `<div class="modal-field"><div class="modal-field-label">Ordre</div><div class="modal-field-value">${esc(sp.order)}</div></div>` : ''}
            ${sp.size    ? `<div class="modal-field"><div class="modal-field-label">Taille</div><div class="modal-field-value">${esc(sp.size)}</div></div>` : ''}
            ${sp.color   ? `<div class="modal-field"><div class="modal-field-label">Couleur</div><div class="modal-field-value">${esc(sp.color)}</div></div>` : ''}
            ${sp.host    ? `<div class="modal-field" style="grid-column:1/-1"><div class="modal-field-label">Culture / Hôte</div><div class="modal-field-value">🌿 ${esc(sp.host)}</div></div>` : ''}
        </div>
        ${sp.description ? `<div class="modal-desc">${esc(sp.description)}</div>` : ''}
        <div class="modal-footer">
            <a href="${esc(sp.url)}" class="modal-link">📋 Voir la fiche complète →</a>
            <a href="https://gd.eppo.int/search?q=${encodeURIComponent(sp.name)}" target="_blank" rel="noopener" class="modal-link">🔬 EPPO Global DB</a>
            <a href="https://www.catalogueoflife.org/data/search?q=${encodeURIComponent(sp.name)}" target="_blank" rel="noopener" class="modal-link">📚 Catalogue of Life</a>
        </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('modalClose')?.focus();
}

function closeSpeciesModal() {
    const modal = $('speciesModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
}

function initModal() {
    const close   = $('modalClose');
    const overlay = $('modalOverlay');
    close?.addEventListener('click', closeSpeciesModal);
    overlay?.addEventListener('click', closeSpeciesModal);
    document.addEventListener('keydown', e => {
        if (e.key==='Escape') closeSpeciesModal();
    });
}

/* ================================================================
   RECHERCHE GLOBALE (navbar)
   ================================================================ */
function initGlobalSearch() {
    const input    = $('globalSearch');
    const dropdown = $('searchDropdown');
    if (!input || !dropdown) return;

    // Vérifie que GLOBAL_SEARCH_INDEX est chargé
    const getIndex = () => window.GLOBAL_SEARCH_INDEX || [];

    let debounce;
    let activeIdx = -1;
    let currentResults = [];

    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => runSearch(input.value.trim()), 140);
    });

    input.addEventListener('focus', () => {
        if (input.value.trim().length >= 2) dropdown.classList.add('open');
    });

    // Navigation clavier dans les résultats
    input.addEventListener('keydown', e => {
        const items = dropdown.querySelectorAll('.sd-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIdx = Math.min(activeIdx + 1, items.length - 1);
            items[activeIdx]?.focus();
        }
        if (e.key === 'Escape') { dropdown.classList.remove('open'); input.blur(); }
        if (e.key === 'Enter' && currentResults.length) {
            openSpeciesModal(currentResults[0]);
            dropdown.classList.remove('open');
        }
    });

    document.addEventListener('click', e => {
        if (!input.contains(e.target) && !dropdown.contains(e.target))
            dropdown.classList.remove('open');
    });

    function runSearch(q) {
        if (q.length < 2) { dropdown.classList.remove('open'); return; }
        const ql = q.toLowerCase();
        const idx = getIndex();
        currentResults = idx.filter(sp =>
            sp.name.toLowerCase().includes(ql) ||
            (sp.common && sp.common.toLowerCase().includes(ql)) ||
            (sp.family && sp.family.toLowerCase().includes(ql)) ||
            (sp.order && sp.order.toLowerCase().includes(ql)) ||
            (sp.host && sp.host.toLowerCase().includes(ql))
        ).slice(0, 10);

        renderDropdown(currentResults, q);
    }

    function renderDropdown(results, q) {
        activeIdx = -1;
        dropdown.innerHTML = '';
        if (!results.length) {
            dropdown.innerHTML = '<div class="sd-empty">Aucune espèce trouvée</div>';
            dropdown.classList.add('open');
            return;
        }
        results.forEach((sp, i) => {
            const item = document.createElement('div');
            item.className = 'sd-item';
            item.setAttribute('role','option');
            item.setAttribute('tabindex','0');

            const icon = ORDER_ICONS[sp.order] || '🐛';
            item.innerHTML = `
                <span class="sd-order">${icon} ${esc(sp.order)}</span>
                <strong>${highlight(sp.name, q)}</strong>
                <small>${sp.common ? esc(sp.common)+' · ' : ''}${esc(sp.family)}</small>
            `;

            // Survol → tooltip non invasif (juste highlight)
            item.addEventListener('click', () => {
                dropdown.classList.remove('open');
                input.value = sp.name;
                openSpeciesModal(sp);
            });
            item.addEventListener('keydown', e => {
                if (e.key==='Enter') { dropdown.classList.remove('open'); openSpeciesModal(sp); }
                if (e.key==='ArrowDown') { e.preventDefault(); const next=dropdown.querySelectorAll('.sd-item')[i+1]; next?.focus(); }
                if (e.key==='ArrowUp')   { e.preventDefault(); const prev=dropdown.querySelectorAll('.sd-item')[i-1]; if(prev)prev.focus(); else input.focus(); }
                if (e.key==='Escape')    { dropdown.classList.remove('open'); input.focus(); }
            });
            dropdown.appendChild(item);
        });
        dropdown.classList.add('open');
    }

    function highlight(text, q) {
        const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
        return esc(text).replace(re, '<mark style="background:rgba(200,165,74,.3);color:var(--gold-l);border-radius:2px">$1</mark>');
    }
}

/* ================================================================
   PARTICULES
   ================================================================ */
function initParticles() {
    const wrap = document.querySelector('.particles-bg');
    if (!wrap) return;
    const n = window.innerWidth < 600 ? 18 : 38;
    const frag = document.createDocumentFragment();
    for (let i=0; i<n; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random()*100}%`;
        p.style.top  = `${Math.random()*100}%`;
        p.style.animationDelay    = `${(Math.random()*6).toFixed(2)}s`;
        p.style.animationDuration = `${(Math.random()*4+5).toFixed(2)}s`;
        frag.appendChild(p);
    }
    wrap.appendChild(frag);
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initNavbarScroll();
    initSmoothScroll();
    initOrderCards();
    initCounters();
    initBackToTop();
    initModal();
    initGlobalSearch();
    initParticles();
});
