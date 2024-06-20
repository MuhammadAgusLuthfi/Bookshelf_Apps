document.addEventListener('DOMContentLoaded', function () {
  const unfinishedList = document.getElementById('unfinishedList');
  const finishedList = document.getElementById('finishedList');
  const bookForm = document.getElementById('bookForm');
  const searchInput = document.getElementById('searchInput');

  let books = [];

  function saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  function loadFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      books = JSON.parse(storedBooks);
      renderBooks();
    }
  }

  function renderBooks() {
    unfinishedList.innerHTML = '';
    finishedList.innerHTML = '';

    books.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${book.title} (${book.year}) - ${book.author}</span>
        <button class="deleteBtn">Hapus</button>
        <button class="editBtn">Edit</button>
      `;
      li.dataset.id = book.id;

      const deleteBtn = li.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', function () {
        const id = parseInt(li.dataset.id);
        deleteBook(id);
      });

      const editBtn = li.querySelector('.editBtn');
      editBtn.addEventListener('click', function () {
        editBook(book.id);
      });

      if (book.isComplete) {
        const undoBtn = document.createElement('button');
        undoBtn.textContent = 'Belum Selesai';
        undoBtn.classList.add('undoBtn');
        undoBtn.addEventListener('click', function () {
          moveBook(book.id, false);
        });
        li.appendChild(undoBtn);
        finishedList.appendChild(li);
      } else {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Selesai';
        completeBtn.classList.add('completeBtn');
        completeBtn.addEventListener('click', function () {
          moveBook(book.id, true);
        });
        li.appendChild(completeBtn);
        unfinishedList.appendChild(li);
      }
    });

    saveToLocalStorage();
  }

  function addBook(title, author, year, isComplete) {
    const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year),
      isComplete,
    };

    books.push(newBook);
    renderBooks();
  }

  function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    renderBooks();
  }

  function moveBook(id, isComplete) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      books[index].isComplete = isComplete;
      renderBooks();
    }
  }

  function editBook(id) {
    const bookToEdit = books.find(book => book.id === id);
    if (!bookToEdit) return;

    const title = prompt('Edit judul buku:', bookToEdit.title);
    const author = prompt('Edit pengarang buku:', bookToEdit.author);
    const year = prompt('Edit tahun terbit:', bookToEdit.year);

    if (title !== null && author !== null && year !== null) {
      bookToEdit.title = title;
      bookToEdit.author = author;
      bookToEdit.year = parseInt(year);

      renderBooks();
    }
  }

  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isComplete = document.getElementById('isComplete').checked;

    addBook(title, author, year, isComplete);

    bookForm.reset();
  });

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
    renderFilteredBooks(filteredBooks);
  });

  function renderFilteredBooks(filteredBooks) {
    unfinishedList.innerHTML = '';
    finishedList.innerHTML = '';

    filteredBooks.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${book.title} (${book.year}) - ${book.author}</span>
        <button class="deleteBtn">Hapus</button>
        <button class="editBtn">Edit</button>
      `;
      li.dataset.id = book.id;

      const deleteBtn = li.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', function () {
        const id = parseInt(li.dataset.id);
        deleteBook(id);
      });

      const editBtn = li.querySelector('.editBtn');
      editBtn.addEventListener('click', function () {
        editBook(book.id);
      });

      if (book.isComplete) {
        const undoBtn = document.createElement('button');
        undoBtn.textContent = 'Belum Selesai';
        undoBtn.classList.add('undoBtn');
        undoBtn.addEventListener('click', function () {
          moveBook(book.id, false);
        });
        li.appendChild(undoBtn);
        finishedList.appendChild(li);
      } else {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Selesai';
        completeBtn.classList.add('completeBtn');
        completeBtn.addEventListener('click', function () {
          moveBook(book.id, true);
        });
        li.appendChild(completeBtn);
        unfinishedList.appendChild(li);
      }
    });
  }

  loadFromLocalStorage();
});
