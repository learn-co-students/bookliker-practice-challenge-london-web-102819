document.addEventListener('DOMContentLoaded', () => {
    getBooks();
})

function getBooks() {
    return fetch("http://localhost:3000/books")
        .then(data => data.json())
        .then(displayBooks)
}

function displayBooks(booksData) {
    const bookList = document.querySelector("#list");
    booksData.forEach(b => addBookLi.call(bookList, b));
}

function addBookLi(bookData) {
    
    const book = document.createElement('li');
    book.className = "book";

    book.innerHTML = `<h2>${bookData.title}</h2>
                      <div class="book-info hidden">
                        <br><br>
                        <img src="${bookData.img_url}" alt="book cover">
                        <p><strong>Description</strong>: ${bookData.description}</p>
                        <h4>Users who liked this book:</h4>
                        <ul class="user-list"></ul>
                        <button class="like">Like</button>
                        <button class="hide">Hide</button>
                      </div>`
    
    const bookInfo = book.querySelector('.book-info');
    const title = book.querySelector("h2");
    const userList = book.querySelector(".user-list");
    const hide = book.querySelector(".hide");
    const like = book.querySelector(".like");
    like.dataset.bookId = bookData.id
    bookData.users.forEach(u => addUserLi(u, userList));

    if (bookData.users.find(u => u.username === "pouros")) like.innerText = "Unlike";

    title.addEventListener('click', function(e) {
        this.classList.remove("hidden");
    }.bind(bookInfo))

    hide.addEventListener('click', (e) => {
        e.target.parentNode.classList.add("hidden");
    })

    like.addEventListener('click', () => toggleLike.call(like, userList));

    this.append(book);
}

function addUserLi(userData, userList) {
    const user = document.createElement('li');
    user.dataset.userId = userData.id;
    user.innerText = userData.username;
    userList.append(user);
}

function toggleLike(userList) {
    let usersObj;
    const id = this.dataset.bookId;
    const liked = this.innerText === "Like";
    const users = Array.from(userList.children);
    
    usersObj = users.map(u => (
        {
            "id": parseInt(u.dataset.userId),
            "username": u.innerText
        }
    ))
    
    if (liked) {
        usersObj.push({
            "id": 1,
            "username": "pouros"
        })
    } else {
        usersObj.splice(usersObj.findIndex(e => e.id === 1), 1);
    }
    
    patchLikes(id, usersObj).then(() => {
        
        if (liked) {
            this.innerText = "Unlike";
            const current = document.createElement('li');
            current.innerText = "pouros";
            userList.append(current);
        } else {
            this.innerText = "Like";
            const current = users.find(u => u.innerText === "pouros");
            current.remove();
        }
    });
}

function patchLikes(id, usersObj) {
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"users": usersObj})
    }
    return fetch(`http://localhost:3000/books/${id}`, configObj)
        .then(resp => resp.json())
        .catch(console.log)
}
