fetch('listofbooks.json')
    .then(response => response.json())
    .then(data => {

        data.sort((a, b) => a.author.localeCompare(b.author));

        const bookList = document.getElementById('book-list');
        data.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (${book.genre})`;
            bookList.appendChild(li);
        });
    });

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const bookList = document.getElementById('book-list');
    const books = bookList.getElementsByTagName('li');
    for (let i = 0; i < books.length; i++) {
        const title = books[i].textContent.split(' by ')[0].toLowerCase();
        const author = books[i].textContent.split(' by ')[1].split(' (')[0].toLowerCase();
        const genre = books[i].textContent.split(' (')[1].split(')')[0].toLowerCase();
        if (title.includes(searchInput) || author.includes(searchInput) || genre.includes(searchInput)) {
            books[i].style.display = '';
        } else {
            books[i].style.display = 'none';
        }
    }
});