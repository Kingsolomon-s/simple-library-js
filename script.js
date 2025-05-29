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
const aside = document.querySelector("aside");

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

    //Add random background gradient
    card.style.backgroundImage = getRandomGradient();
    card.style.color = "#fff";

    card.addEventListener("click", () => {
      aside.innerHTML = "";
      const preview = createPreview(book);
      aside.appendChild(preview);
    });

    const remove = document.createElement("button");
    remove.classList.add("remove");

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "./images/trash.svg";
    deleteBtn.classList.add("delete-btn");

    remove.appendChild(deleteBtn);

    remove.addEventListener("click", () => {
      event.stopPropagation();
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
        readLabel.textContent = "Completed:";

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

function getRandomGradient() {
  const angle = Math.floor(Math.random() * 360);
  const color1 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
  const color2 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function createPreview(book) {
  const preview = document.createElement("div");
  preview.classList.add("preview");

  const previewCover = document.createElement("div");
  previewCover.classList.add("preview-cover");
  previewCover.style.backgroundImage = getRandomGradient();
  previewCover.textContent = book.title[0];
  previewCover.style.display = "flex";
  previewCover.style.alignItems = "center";
  previewCover.style.justifyContent = "center";
  previewCover.style.color = "white";
  previewCover.style.fontSize = "2rem";

  const previewTitle = document.createElement("p");
  previewTitle.textContent = book.title;

  const previewAuthor = document.createElement("p");
  previewAuthor.textContent = book.author;
  previewAuthor.classList.add("preview-author");

  const previewRating = document.createElement("div");
  previewRating.classList.add("preview-rating");
  previewRating.innerHTML = `
      <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
      <span class="rating-number">4.8</span>
    `;

  const previewStats = document.createElement("div");
  previewStats.classList.add("preview-stats");
  previewStats.innerHTML = `
      <div><strong>${book.pages}</strong><br>Pages</div>
      <div><strong>643</strong><br>Ratings</div>
      <div><strong>110</strong><br>Reviews</div>
    `;

  const readNowBtn = document.createElement("button");
  readNowBtn.classList.add("read-now-btn");
  readNowBtn.textContent = "Read Now";

  preview.appendChild(previewCover);
  preview.appendChild(previewTitle);
  preview.appendChild(previewAuthor);
  preview.appendChild(previewRating);
  preview.appendChild(previewStats);
  preview.appendChild(readNowBtn);

  return preview;
}
