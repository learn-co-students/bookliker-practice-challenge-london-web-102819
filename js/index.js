const BOOK_URL = "http://localhost:3000/books";

const init = () => {
  getBookList();
};

const getBookList = () => {
  return fetch(BOOK_URL)
    .then(resp => resp.json())
    .then(renderBookList);
};

const renderBookList = bookArray => {
  for (const book of bookArray) {
    const ul = document.querySelector("#list");
    const li = document.createElement("li");
    li.innerText = book.title;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      renderBookPage(book);
    });

    ul.append(li);
  }
};

const renderBookPage = book => {
  const div = document.querySelector("#show-panel");
  div.innerHTML = "";
  const h = document.createElement("h2");
  h.innerText = book.title;
  const img = document.createElement("img");
  img.src = book.img_url;
  const p = document.createElement("p");
  p.innerText = book.description;

  div.append(h, img, p);

  for (const user of book.users) {
    renderUser(user);
  }

//   renderUsers(book.users);

  const readBtn = document.createElement("button");
  readBtn.innerText = "Read Book";
  readBtn.className = "read-book-btn";
  readBtn.addEventListener("click", () => {
    readBook(book.users, book.id);
  });

  div.append(readBtn);
};

const renderUser = user => {
  const p2 = document.createElement("p");
  const btn = document.querySelector(".read-book-btn");
  const div = document.querySelector("#show-panel");
  //   debugger;
  p2.innerText = user.username;
  p2.style.fontWeight = "bold";

  if (!btn) {
    div.append(p2);
  } else {
    div.insertBefore(p2, btn);
  }
};

// const renderUsers = users => {
//   const userArr = []
//   for (const user of users) {
//     const p2 = document.createElement("p");
//     const btn = document.querySelector(".read-book-btn");
//     const div = document.querySelector("#show-panel");
//     //   debugger;
//     p2.innerText = user.username;
//     p2.style.fontWeight = "bold";

//     if (!btn) {
//       div.append(p2);
//     } else {
//       div.insertBefore(p2, btn);
//     }
//   }
// };

const readBook = (users, book) => {
  const user = { id: 1, username: "pouros" };
//   debugger;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      users: [...users, user]
    })
  };

  if (users.includes(user) == false) {
    fetch(BOOK_URL + "/" + book, configObj)
      .then(resp => resp.json())
      .then(data => renderUser(data));
  } else {
    window.alert("You have already read this book!");
  }
};

document.addEventListener("DOMContentLoaded", function() {
  init();
});
