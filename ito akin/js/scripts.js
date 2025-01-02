document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
    const genreCheckboxes = document.querySelectorAll('.genre-checkbox');
    const bookItems = document.querySelectorAll('.book-item');
    const bookCollection = document.querySelector('.book-collection');
    const noGenreMessage = document.createElement('div');
    noGenreMessage.classList.add('no-genre-message');
    noGenreMessage.textContent = 'Select a Category To View Books';

    // Preselect checkbox based on URL parameter
    if (genre) {
        const checkbox = document.querySelector(`.genre-checkbox[data-genre="${genre}"]`);
        if (checkbox) checkbox.checked = true;
    }

    // Function to update book visibility based on checkboxes
    function updateBookVisibility() {
        const selectedGenres = Array.from(genreCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.genre);

        if (selectedGenres.length === 0) {
            bookCollection.innerHTML = '';
            bookCollection.appendChild(noGenreMessage);
        } else {
            bookCollection.innerHTML = '';
            bookItems.forEach(bookItem => {
                const bookGenres = bookItem.dataset.genres.split(',');
                if (selectedGenres.some(genre => bookGenres.includes(genre))) {
                    bookCollection.appendChild(bookItem);
                }
            });
        }
    }

    // Apply visibility updates and attach event listeners
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBookVisibility);
    });

    // Initialize book visibility
    updateBookVisibility();
});
document.addEventListener('DOMContentLoaded', function () {
    const tagButtons = document.querySelectorAll('.tag-button');

    tagButtons.forEach(button => {
        button.addEventListener('click', function () {
            const genre = button.dataset.genre;
            if (genre) {
                // Navigate to the genre page with the selected genre as a query parameter
                window.location.href = `../html/genre.html?genre=${genre}`;
            }
        });
    });
});

