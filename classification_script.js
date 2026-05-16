/**
 * ENTOMASTER – classification_script.js
 */
'use strict';
const ORDER_EMOJIS = { 'Coléoptères': '🪲', 'Lépidoptères': '🦋', 'Diptères': '🪰', 'Hémiptères': '🐛', 'Thysanoptères': '🔬', 'Hyménoptères': '🐝', 'Orthoptères': '🦗' };
function renderCultureGrids() {
    if (!window.speciesData) return;
    const tooltip = document.getElementById('species-tooltip');
    const modal = document.getElementById('species-modal');
    const modalClose = document.getElementById('modal-close');
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
        window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    }
    const grids = {
        'maraicheres': document.getElementById('maraicheres-grid'),
        'arboriculture': document.getElementById('arboriculture-grid'),
        'ornementales': document.getElementById('ornementales-grid'),
        'grandes-cultures': document.getElementById('grandes-cultures-grid')
    };
    Object.values(grids).forEach(g => { if (g) g.innerHTML = ''; });
    window.speciesData.forEach(sp => {
        let key = sp.category;
        if (key === 'cruciferes' || key === 'solanacees' || key === 'cucurbitacees') key = 'maraicheres';
        const grid = grids[key];
        if (!grid) return;
        const card = document.createElement('article');
        card.className = 'species-card';
        card.dataset.id = sp.id;
        card.dataset.name = sp.name.toLowerCase();
        const emoji = ORDER_EMOJIS[sp.order] || '🔬';
        card.innerHTML = `
            <div class="species-img-wrap">
                <img src="${sp.image}" alt="${sp.name}" onerror="this.src='https://via.placeholder.com/400x300?text=${sp.name}'">
                <span class="species-order-icon">${emoji}</span>
            </div>
            <div class="species-card-body">
                <p class="species-name">${sp.name}</p>
                <p class="species-family-label">${sp.family}</p>
                <span class="species-order-badge">${sp.order}</span>
            </div>
        `;
        card.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.innerHTML = `<strong>${sp.name}</strong><br><span style="color:var(--color-gold)">Hôtes :</span> ${sp.cultures}`;
                tooltip.classList.add('visible');
            }
        });
        card.addEventListener('mousemove', (e) => {
            if (tooltip) { tooltip.style.left = (e.pageX + 15) + 'px'; tooltip.style.top = (e.pageY + 15) + 'px'; }
        });
        card.addEventListener('mouseleave', () => { if (tooltip) tooltip.classList.remove('visible'); });
        card.addEventListener('click', () => { if (typeof openSpeciesModal === 'function') { openSpeciesModal(sp); } });
        grid.appendChild(card);
    });
}
function initTabsSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.dataset.tab;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) { targetPanel.classList.add('active'); }
        });
    });
}
function initLocalFilter() {
    const input = document.getElementById('cultureSearch');
    if (!input) return;
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.species-card').forEach(card => {
            const matches = card.innerText.toLowerCase().includes(term);
            card.style.display = matches ? '' : 'none';
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        renderCultureGrids();
        initTabsSystem();
        initLocalFilter();
        const targetId = localStorage.getItem('targetSpeciesId');
        if (targetId) {
            localStorage.removeItem('targetSpeciesId');
            const card = document.querySelector(`.species-card[data-id="${targetId}"]`);
            if (card) {
                const parentPanel = card.closest('.tab-content');
                if (parentPanel) {
                    document.querySelectorAll('.tab-content, .tab-btn').forEach(el => el.classList.remove('active'));
                    parentPanel.classList.add('active');
                    const associatedBtn = document.querySelector(`.tab-btn[data-tab="${parentPanel.id}"]`);
                    if (associatedBtn) associatedBtn.classList.add('active');
                }
                card.click();
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, 100);
});
