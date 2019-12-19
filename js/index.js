BOOKS = "http://localhost:3000/books";

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});

function fetchData() {
  fetch(BOOKS)
    .then(resp => resp.json())
    .then(data => loopBooks(data));
}

function loopBooks(data) {
  data.forEach(element => {
    postBooks(element);
  });
}

function postBooks(obj) {
  const ul = document.querySelector("#list");
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  const button = document.createElement("button");
  button.innerText = "Like";
  h3.innerText = obj.title;
  h3.append(button);
  li.append(h3);
  ul.append(li);
  //   event ilsteners
  h3.addEventListener("click", function() {
    bookDescription(obj);
  });

  button.addEventListener("click", function() {
    likeBook(obj);
  });
}

function bookDescription(obj) {
  const show = document.querySelector("#show-panel");
  show.innerHTML = " ";

  const ul = document.createElement("ul");

  const p = document.createElement("p");
  p.innerText = obj.description;
  const img = document.createElement("img");
  img.src = obj.img_url;
  obj.users.forEach(element => {
    const li = document.createElement("li");
    li.innerText = element.username;
    ul.append(li);
  });

  show.append(img, ul, p);
}

function likeBook(obj) {
  const me = {
    id: 1,
    username: "pouros"
  };
  //   found will be undefinde or the element
  let foundIndex = obj.users.findIndex(el => {
    return el.id === me.id;
  });

  if (foundIndex !== -1) {
    obj.users.splice(foundIndex, 1);
  } else {
    obj.users.push(me);
  }
  const likeObj = {
    users: obj.users
  };

  fetch(`http://localhost:3000/books/${obj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likeObj)
  });
}
