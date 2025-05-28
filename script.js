const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const form = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  bookDialog.classList.add("closing");
  bookDialog.addEventListener(
    "animationend",
    () => {
      bookDialog.close();
      bookDialog.classList.remove("closing");
    },
    { once: true }
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const read = formData.get("read") === "on";

  addBookToLibrary(title, author, pages, read);
  bookDialog.close();
  form.reset();
});

const myLibrary = [];

function Books(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Books(title, author, pages, read);
  //   console.log(book);
  myLibrary.push(book);
  console.log(myLibrary);
  displayBook(myLibrary);
}

function displayBook(library) {
  const bookSection = document.querySelector(".book-section");
  bookSection.textContent = "";
  library.forEach((book) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = String(book.id);

    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zM8 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zM10.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1 0-2h3.086a1 1 0 0 1 .707.293l.707.707h2.414l.707-.707A1 1 0 0 1 10.414 1H13.5a1 1 0 0 1 1 1v1zm-3.5 1v9a1 1 0 0 0 1 1H5a1 1 0 0 0-1-1V4h8z"/>
  </svg>`;

    remove.addEventListener("click", () => {
      if (card.dataset.id === String(book.id)) {
        bookSection.removeChild(cardContainer);

        const index = library.findIndex(
          (b) => String(b.id) === card.dataset.id
        );
        if (index > -1) {
          library.splice(index, 1);
        }
      }
    });

    cardContainer.appendChild(card);
    cardContainer.appendChild(remove);

    for (const key in book) {
      const para = document.createElement("p");
      if (key === "pages") {
        para.textContent = `Pages: ${book[key]}`;
      } else if (key === "id") {
        continue;
      } else if (key === "read") {
        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");

        const readLabel = document.createElement("span");
        readLabel.textContent = "Read:";

        const label = document.createElement("label");
        label.classList.add("switch");

        //To display input instead of key value
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = book.read;

        const slider = document.createElement("span");
        slider.classList.add("slider");

        // Update book.read when checkbox is toggled
        checkbox.addEventListener("change", () => {
          book.read = checkbox.checked;
          // Log
          console.log(`Book "${book.title}" read status:`, book.read);
        });

        label.appendChild(checkbox);
        label.appendChild(slider);

        labelContainer.appendChild(readLabel);
        labelContainer.appendChild(label);

        card.appendChild(labelContainer);
      } else {
        para.textContent = book[key];
      }
      card.appendChild(para);
    }
    bookSection.appendChild(cardContainer);
  });
}

// const listItems = document.querySelectorAll("li");

// listItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     // Remove "clicked" class from all list items
//     listItems.forEach((li) => li.classList.remove("clicked"));

//     // Add "clicked" class to the clicked item
//     item.classList.add("clicked");
//   });
// });
