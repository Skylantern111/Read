document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
    const genreCheckboxes = document.querySelectorAll('.genre-checkbox');
    const bookItems = document.querySelectorAll('.book-item');
    const bookCollection = document.querySelector('.book-collection');
    const tagButtons = document.querySelectorAll('.tag-button');
    const noGenreMessage = document.createElement('div');
    noGenreMessage.classList.add('no-genre-message');
    noGenreMessage.textContent = 'Select a Category To View Books';
    if (genre) {
        const checkbox = document.querySelector(`.genre-checkbox[data-genre="${genre}"]`);
        if (checkbox) checkbox.checked = true;
    }
    function updateBookVisibility() {
        const selectedGenres = Array.from(genreCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.genre);

        bookCollection.innerHTML = ''; // Clear current books or messages

        if (selectedGenres.length === 0) {
            bookCollection.appendChild(noGenreMessage);
        } else {
            bookItems.forEach(bookItem => {
                const bookGenres = bookItem.dataset.genres.split(',');
                if (selectedGenres.some(genre => bookGenres.includes(genre))) {
                    bookCollection.appendChild(bookItem);
                }
            });
        }
    }
    function filterBooks(searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        bookCollection.innerHTML = ''; 
        if (searchQuery.trim() === '') {
            updateBookVisibility(); 
            return;
        }
        const matchingBooks = Array.from(bookItems).filter(bookItem =>
            bookItem.textContent.toLowerCase().includes(lowerCaseQuery)
        );

        if (matchingBooks.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.classList.add('no-results-message');
            noResultsMessage.textContent = 'No matching books found.';
            bookCollection.appendChild(noResultsMessage);
        } else {
            matchingBooks.forEach(book => bookCollection.appendChild(book));
        }
    }
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBookVisibility);
    });
    tagButtons.forEach(button => {
        button.addEventListener('click', function () {
            const genre = button.dataset.genre;
            if (genre) {
               
                window.location.href = `../html/genre.html?genre=${genre}`;
            }
        });
    });
    updateBookVisibility();
    // para  mag auto complete
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterBooks(searchInput.value);
        });
    }
});
