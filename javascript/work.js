document.addEventListener('DOMContentLoaded', function() {
    loadWorkSamples();
    initializePDFModal();
});

const workSamples = [
    {
        title: 'Example PDF',
        description: 'This is using a typing speed certificate to display a PDF viewer.',
        pdfPath: 'pdf/test.pdf',
        category: 'Certificates',
        pages: '1 page'
    }
];

function loadWorkSamples() {
    const workGrid = document.getElementById('work-grid');
    
    workGrid.innerHTML = workSamples.map(sample => `
        <div class="work-card" onclick="openPDF('${sample.pdfPath}', '${sample.title}')">
            <div class="work-card-header">
                <div class="work-category">${sample.category}</div>
                <div class="work-pages">${sample.pages}</div>
            </div>
            <div class="work-card-content">
                <h3>${sample.title}</h3>
                <p>${sample.description}</p>
            </div>
            <div class="work-card-footer">
                <span class="work-view-btn">📄 View Document</span>
            </div>
        </div>
    `).join('');
}

function openPDF(pdfPath, title) {
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfTitle = document.getElementById('pdf-title');
    const pdfDownload = document.getElementById('pdf-download');
    
    pdfViewer.src = `${pdfPath}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;
    pdfTitle.textContent = title;
    pdfDownload.href = pdfPath;
    pdfDownload.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    modal.classList.remove('active');
    modal.classList.remove('fullscreen');
    pdfViewer.src = '';
    document.body.style.overflow = '';
    
    const fullscreenBtn = document.getElementById('pdf-fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.textContent = '⛶ Fullscreen';
    }
}

function initializePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const fullscreenBtn = document.getElementById('pdf-fullscreen');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePDFModal();
        }
    });
    
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            modal.requestFullscreen().then(() => {
                modal.classList.add('fullscreen');
                fullscreenBtn.textContent = '⛶ Exit Fullscreen';
            }).catch(err => {
                console.log('Fullscreen not supported:', err);
            });
        } else {
            document.exitFullscreen().then(() => {
                modal.classList.remove('fullscreen');
                fullscreenBtn.textContent = '⛶ Fullscreen';
            });
        }
    });
    
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            modal.classList.remove('fullscreen');
            fullscreenBtn.textContent = '⛶ Fullscreen';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePDFModal();
        }
    });
}

window.openPDF = openPDF;
window.closePDFModal = closePDFModal;