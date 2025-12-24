export async function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    let searchIndex = [];
    try {
        const response = await fetch('/api/search_index');
        searchIndex = await response.json();
    } catch (e) {
        console.error("Failed to load search index", e);
    }

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const filtered = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        ).slice(0, 10);

        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item => `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <a href="${item.path}" style="text-decoration: none; color: #333;">
                        <div style="font-weight: bold;">${item.title}</div>
                        <div style="font-size: 12px; color: #666;">${item.path}</div>
                    </a>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div style="padding: 10px;">No results found</div>';
            searchResults.style.display = 'block';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
