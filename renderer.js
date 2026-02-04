const scanBtn = document.getElementById('scan-btn');
const resultsArea = document.getElementById('results-area');
const statusText = document.getElementById('scan-status-text');
const totalScannedEl = document.getElementById('total-scanned');

scanBtn.addEventListener('click', async () => {
    // UI Update: Scanning state
    scanBtn.disabled = true;
    statusText.textContent = "Scanning...";
    statusText.classList.add('animate-pulse');

    // Call Main Process
    const response = await window.api.scanSystem();

    statusText.classList.remove('animate-pulse');
    statusText.textContent = "Scan Complete";
    scanBtn.disabled = false;

    if (response.success) {
        renderResults(response.data);
    } else {
        statusText.textContent = "Error";
        console.error(response.error);
    }
});

function renderResults(items) {
    resultsArea.innerHTML = '';
    resultsArea.classList.remove('hidden');
    let totalSize = 0; // Simplified for now, would need parsing logic for real summation

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors";

        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-${item.type === 'cache' ? 'secondary' : 'primary'}/20 flex items-center justify-center text-xs">
                    ${item.type === 'cache' ? 'C' : 'L'}
                </div>
                <div>
                    <h4 class="font-medium text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-400">${item.path}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-sm font-bold text-gray-300">${item.size}</span>
                <button class="clean-btn text-xs bg-error/20 text-error hover:bg-error hover:text-white px-3 py-1 rounded-md transition-all duration-300" data-path="${item.path}">
                    Clean
                </button>
            </div>
        `;
        resultsArea.appendChild(div);
    });

    // Attach Clean Listeners
    document.querySelectorAll('.clean-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const path = e.target.getAttribute('data-path');
            if (confirm(`Are you sure you want to clean ${path}?`)) {
                e.target.textContent = "Cleaning...";
                const res = await window.api.cleanItem(path);
                if (res.success) {
                    e.target.parentElement.parentElement.remove();
                    // potentially re-scan or update status
                } else {
                    alert("Failed to clean: " + res.error);
                    e.target.textContent = "Failed";
                }
            }
        });
    });
}
