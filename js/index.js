const BOOKS_URL = "http://localhost:3000/books";
const USERS_URL = "http://localhost:3000/users";
const CURRENT_USER = { id: 1, username: "pouros" };

document.addEventListener("DOMContentLoaded", () => {
  loadbooks();
});

const listPanelDiv = document.querySelector("#list-panel");

const loadbooks = () => {
  fetch(BOOKS_URL)
    .then(resp => resp.json())
    .then(data => redenderBooks(data));
};

const redenderBooks = books => {
  books.forEach(book => {
    listBook(book);
  });
};

const listBook = book => {
  const ulList = document.querySelector("#list");
  const li = document.createElement("li");
  li.innerText = book.title;

  li.addEventListener("click", () => {
    showBook(book);
  });

  const userLikesBook = (user, book) => {
    return book.users.map(u => u.id).includes(user.id);
  };

  const showPanel = document.querySelector("#show-panel");

  const showBook = book => {
    showPanel.innerHTML = "";
    const bookTitle = document.createElement("h2");
    const bookImg = document.createElement("img");
    const bookDesc = document.createElement("p");
    const likeBtn = document.createElement("button");
    const ul = document.createElement("ul");

    const listAUser = (user, ul) => {
      const li = document.createElement("li");
      li.innerText = user.username;
      li.dataset.userId = user.id;
      ul.append(li);
    };

    for (user of book.users) {
      listAUser(user, ul);
    }

    bookTitle.innerText = book.title;
    bookImg.src = book.img_url;
    bookDesc.innerText = book.description;
    likeBtn.innerText = "Like";
    likeBtn.style.cursor = "pointer";

    // add Even Lisenter on Like Btn
    likeBtn.addEventListener("click", () => {
      if (!userLikesBook(CURRENT_USER, book)) {
        likeBook(book).then(data => {
          console.log(data);
          listAUser(CURRENT_USER, ul);
        });
      } else {
        window.alert("You like this already!");
      }
    });

    showPanel.append(bookTitle, bookImg, bookDesc, ul, likeBtn);
  };

  ulList.append(li);
  listPanelDiv.append(ulList);
};

const likeBook = book => {
  book.users.push(CURRENT_USER);
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      users: book.users
    })
  };

  return fetch(`${BOOKS_URL}/${book.id}`, configObj).then(resp => resp.json());
};
