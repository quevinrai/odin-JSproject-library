const library = document.querySelector(".library");
const cardEmpty = document.querySelector(".cardEmpty");
const btnAddBook = document.querySelector(".cardEmpty i");

const addBookOption = document.querySelector(".addBookOption");
const backdrop = document.querySelector(".backdrop");
const formAddBook = document.querySelector(".formAddBook");

const formAuthor = document.querySelector("#input-author");
const formTitle = document.querySelector("#input-title");
const formPages = document.querySelector("#input-pages");
const formRead = document.querySelector("#input-read");
const btnSubmit = document.querySelector("#submit");

let myLibrary = [];

/**************************/
/*     GLOBAL METHODS     */
/**************************/

function showFormAnimation() {
    clearForm();
    addBookOption.classList.remove("hide");
    backdrop.classList.add("animationBackdrop");
    formAddBook.classList.add("animationForm");
}

function hideFormAnimation() {
    clearForm();
    addBookOption.classList.add("hide");
    backdrop.classList.remove("animationBackdrop");
    formAddBook.classList.remove("animationForm");
}

function clearForm() {
    formAuthor.value = "";
    formTitle.value = "";
    formPages.value = "";
    formRead.value = "";
}

function readOptions(isRead) {
    if(isRead === "Yes") return {yes: "selected", no:""};
    else return {yes: "", no:"selected"};
}

function checkFormValidation(book) {
    if(book.author === "") console.log("Erro Author");
    else if(book.title === "") console.log("Error Title");
    else if(book.pages === "") console.log("Error Pages");
    else if(book.read === "--") console.log("Error Read");
    else return true;
}

/*******************/
/*     OBJECTS     */
/*******************/

const Library = {

    addBook: (book) => {
        const optionYes = readOptions(book.read).yes;
        const optionNo = readOptions(book.read).no;
        const sectionBook = document.createElement("section");
        sectionBook.innerHTML = `
            <section class="card">
                <article class="book bookAuthor">
                    <p class="bookCategory">Author:</p>
                    <p>${book.author}</p>
                </article>
                <article class="book bookTitle">
                    <p class="bookCategory">Title:</p>
                    <p>${book.title}</p>
                </article>
                <article class="book bookPages">
                    <p class="bookCategory">No. of Pages:</p>
                    <p>${book.pages}</p>
                </article>
                <article class="book bookIsRead">
                    <p class="bookCategory">Read?</p>
                    <select name="isReadOptions" id="isReadOptions">
                        <option disabled selected value>--</option>
                        <option ${optionYes} value="Yes">Yes</option>
                        <option ${optionNo} value="No">No</option>
                    </select>
                </article>
                <button class="removeBook">Remove</button>
            </section>
        `;

        hideFormAnimation();
        clearForm();
        myLibrary.push(book);
        cardEmpty.before(sectionBook);
        const btnRemoveBook = document.querySelectorAll(".removeBook");
        btnRemoveBook.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.currentTarget.parentNode.remove();
            });
        });
    },
}

/*******************************/
/*     OBJECT CONSTRUCTORS     */
/*******************************/

function Book(author, title, pages, read) {

    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = read;

    this.getInfo = () => {
       return { author, title, pages, read };
    }
}

btnAddBook.addEventListener("click", () => {
    showFormAnimation();
});

backdrop.addEventListener("click", () => {
    hideFormAnimation();
});

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const book = new Book(
        formAuthor.value,
        formTitle.value,
        formPages.value,
        formRead.value
    );

    Library.addBook(book.getInfo());
    
});