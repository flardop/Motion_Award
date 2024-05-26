document.addEventListener('DOMContentLoaded', function() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    const resultsContainer = document.getElementById('results-container');
    const resultsTable = document.getElementById('results-table');

    let votes = {
        'Categoria 1': 0,
        'Categoria 2': 0,
        'Categoria 3': 0
    };

    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            votes[category]++;
            updateResults();
            resultsContainer.style.display = 'block';
        });
    });

    function updateResults() {
        resultsTable.innerHTML = '';
        for (const category in votes) {
            const row = document.createElement('tr');
            const categoryCell = document.createElement('td');
            const votesCell = document.createElement('td');
            categoryCell.textContent = category;
            votesCell.textContent = votes[category];
            row.appendChild(categoryCell);
            row.appendChild(votesCell);
            resultsTable.appendChild(row);
        }
    }
});