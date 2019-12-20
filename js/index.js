document.addEventListener("DOMContentLoaded", function() {});

// API

const url = 'http://localhost:3000/books'

const getAllBooks = () => {
    return fetch(url).then(response => response.json()).then(data => displayList(data))
}

const displayList = (books) => {
    
    books.map(displayTitle)
    
}

const displayTitle = (book) => {
    const pickUl = document.querySelector('#list')
    const bookList = document.createElement('li')
    bookList.innerHTML = book.title
    pickUl.append(bookList)
    return pickUl


}

getAllBooks()