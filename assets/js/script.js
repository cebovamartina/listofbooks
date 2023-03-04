fetch('/assets/js/listofbooks.json')
    .then(response => response.json())
    .then(data => {

        data.sort((a, b) => a.author.localeCompare(b.author));

        const bookList = document.getElementById('book-list');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headers = ['Title', 'Author', 'Genre'];
        const headerRow = document.createElement('tr');

        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);

        data.forEach(book => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('td');
            const authorCell = document.createElement('td');
            const genreCell = document.createElement('td');

            titleCell.textContent = book.title;
            authorCell.textContent = book.author;
            genreCell.textContent = book.genre;

            row.appendChild(titleCell);
            row.appendChild(authorCell);
            row.appendChild(genreCell);

            tbody.appendChild(row);
        });

        const [searchInput, searchButton] = document.querySelectorAll('#search, #search-btn');

        searchButton.addEventListener('click', search);
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                search();
            }
        });

        function search() {
            const query = searchInput.value.toLowerCase();
            const filteredData = data.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query)
            );

            tbody.innerHTML = '';

            filteredData.forEach(book => {
                const row = document.createElement('tr');

                const titleCell = document.createElement('td');
                const authorCell = document.createElement('td');
                const genreCell = document.createElement('td');

                titleCell.textContent = book.title;
                authorCell.textContent = book.author;
                genreCell.textContent = book.genre;

                row.appendChild(titleCell);
                row.appendChild(authorCell);
                row.appendChild(genreCell);

                tbody.appendChild(row);
            });
        }

        document.body.appendChild(table);
    });