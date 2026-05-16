/**
 * ENTOMASTER – script.js
 */
'use strict';
function initGlobalSearch() {
    const input = document.getElementById('globalSearch');
    const dropdown = document.getElementById('searchResults');
    if (!input || !dropdown) return;
    input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        dropdown.innerHTML = '';
        if (query.length < 2) { dropdown.classList.remove('active'); return; }
        if (!window.speciesData) return;
        const filtered = window.speciesData.filter(sp => 
            sp.name.toLowerCase().includes(query) || sp.family.toLowerCase().includes(query) ||
            sp.order.toLowerCase().includes(query) || sp.cultures.toLowerCase().includes(query)
        );
        if (filtered.length === 0) {
            dropdown.innerHTML = '<div class="search-result-item" style="color:var(--color-text-muted)">Aucune espèce trouvée</div>';
        } else {
            filtered.forEach(sp => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<strong>${sp.name}</strong><span>Ordre : ${sp.order} | Famille : ${sp.family}</span>`;
                item.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                    input.value = '';
                    if (window.location.pathname.includes('classification_par_culture.html')) {
                        openSpeciesModal(sp);
                    } else {
                        localStorage.setItem('targetSpeciesId', sp.id);
                        window.location.href = 'classification_par_culture.html';
                    }
                });
                dropdown.appendChild(item);
            });
        }
        dropdown.classList.add('active');
    });
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.remove('active');
    });
}
function openSpeciesModal(sp) {
    const modal = document.getElementById('species-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    const MAP_ICONS = { 'Coléoptères': '🪲', 'Lépidoptères': '🦋', 'Diptères': '🪰', 'Hémiptères': '🐛', 'Thysanoptères': '🔬', 'Hyménoptères': '🐝', 'Orthoptères': '🦗' };
    const emoji = MAP_ICONS[sp.order] || '🔬';
    modalBody.innerHTML = `
        <h2>${sp.name} <span style="font-size:1.05rem; color:var(--color-text-muted); font-family:var(--font-body); font-style:normal;">${sp.author || ''}</span></h2>
        <div class="modal-meta">${emoji} Ordre : <strong>${sp.order}</strong> | Famille : <strong>${sp.family}</strong></div>
        <p><strong>Cultures impactées :</strong> <span style="color:var(--color-gold-light)">${sp.cultures}</span></p>
        <p style="margin-top:0.8rem;"><strong>Description :</strong> ${sp.description}</p>
        <div class="modal-ipm">
            <strong style="color:var(--color-gold-light); display:block; margin-bottom:5px;">🛡️ Protection & Lutte Intégrée (IPM) :</strong>
            ${sp.management}
        </div>
        ${sp.beneficials ? `<p style="color:var(--color-gold); font-weight:600; margin-top:10px;"><i class="fas fa-hand-holding-heart"></i> Auxiliaire biologique : ${sp.beneficials}</p>` : ''}
    `;
    modal.classList.add('active');
}
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('navMenu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => { menu.classList.toggle('active'); });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initGlobalSearch();
    initMobileMenu();
});
