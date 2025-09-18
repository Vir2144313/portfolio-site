document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioItems();
});

const portfolioFiles = [
    '../javascript/portfolio/placeholder_post_1.js',
];

async function loadPortfolioItems() {
    const portfolioItems = [];
    
    for (const file of portfolioFiles) {
        try {
            const script = document.createElement('script');
            script.src = file;
            document.head.appendChild(script);
            
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });
            
            const fileName = file.split('/').pop().replace('.js', '');
            const portfolioItem = window[`portfolio_${fileName.replace('-', '_')}`];
            
            if (portfolioItem) {
                portfolioItems.push({
                    id: fileName,
                    ...portfolioItem
                });
            }
        } catch (error) {
            console.error(`Failed to load portfolio item: ${file}`, error);
        }
    }
    
    renderPortfolioSidebar(portfolioItems);
    
    if (portfolioItems.length > 0) {
        loadPortfolioDetail(portfolioItems[0]);
    }
    
    initializePortfolioSidebar(portfolioItems);
}

function renderPortfolioSidebar(items) {
    const portfolioList = document.getElementById('portfolio-list');
    
    portfolioList.innerHTML = items.map((item, index) => `
        <li class="portfolio-list-item ${index === 0 ? 'active' : ''}" data-project="${item.id}">
            <h4>${item.title}</h4>
            <p>${item.summary}</p>
            <div class="portfolio-list-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </li>
    `).join('');
}

function initializePortfolioSidebar(portfolioItems) {
    const portfolioListItems = document.querySelectorAll('.portfolio-list-item');
    
    portfolioListItems.forEach(item => {
        item.addEventListener('click', () => {
            portfolioListItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const projectId = item.getAttribute('data-project');
            const portfolioItem = portfolioItems.find(p => p.id === projectId);
            
            if (portfolioItem) {
                loadPortfolioDetail(portfolioItem);
            }
        });
    });
}

function loadPortfolioDetail(portfolioItem) {
    const portfolioDetail = document.getElementById('portfolio-detail');
    
    portfolioDetail.innerHTML = `
        <h3>${portfolioItem.title}</h3>
        <div class="meta">
            <span><strong>Date:</strong> ${portfolioItem.meta.date}</span>
        </div>
        <div class="tags">
            ${portfolioItem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="content">
            ${portfolioItem.content}
        </div>
    `;
}