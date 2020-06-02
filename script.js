let myLibrary = [];

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 560, true);
const theWayOfKings = new Book('The Way Of Kings', 'Brandon Sanderson', 754, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theWayOfKings);
render();

document.querySelector('#new-book').addEventListener('click', getBook);

// CONSTRUCTOR FUNCTIONS----------------------------------------------------------------------------------------
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// HELPER FUNCTIONS (ALPHABETICAL)------------------------------------------------------------------------------
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addRemoveButton(tr, index) {
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove Book';
    removeButton.classList.add('remove-button')
    removeButton.setAttribute('data-index', index);
    removeButton.addEventListener('click', removeBook);
    tr.appendChild(removeButton);
}

function buildTable() {
    const table = document.querySelector('table');
    myLibrary.forEach(book => {
        const index = myLibrary.indexOf(book);
        const tr = document.createElement('tr');
        for (let property in book) {
            const td = document.createElement('td');
            td.textContent = book[property];
            tr.appendChild(td);
        }
        addRemoveButton(tr, index);       
        table.appendChild(tr);
    })
}

function clearTable() {
    const table = document.querySelector('table');
    while(table.firstChild) {
        table.removeChild(table.lastChild);
    }
}

function getBook() {
    const title = prompt("What is the title?");
    const author = prompt("Who is the author?");
    const pages = Number(prompt("How many pages does it have?"));
    const read = prompt("Have you read it? (true/false)")
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    render();
}

function removeBook(e) {
    myLibrary.splice(e.target.dataset.index, 1);
    render();
}

function render() {
    clearTable();
    buildTable();
}

