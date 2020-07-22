let myLibrary = [];

document.querySelector('#new-book').addEventListener('click', getBook);
// document.querySelector('#new-library').addEventListener('click', getInfo);

// CLASS AND STARTER BOOKS ------------------------------------------------------------------------------------

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 560, true);
const theWayOfKings = new Book('The Way Of Kings', 'Brandon Sanderson', 754, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theWayOfKings);

render();

// class Library {
//     books = [];
//     constructor(name){
//         this.name = name;
//     }
//     build = () => {
//         const body = document.querySelector('body');
//         const div = document.createElement('div');
//         div.textContent = `${this.name}'s library`;
//         body.appendChild(div);
//     }
// }

// const test = new Library('Suzie');
// HELPER FUNCTIONS (ALPHABETICAL)------------------------------------------------------------------------------

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createReadButton(tr, index) {
    const readButton = document.createElement('button');
    readButton.textContent = 'Read?';
    readButton.setAttribute('data-index', index);
    readButton.addEventListener('click', toggleRead);
    tr.appendChild(readButton);
}

function createRemoveButton(tr, index) {
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove Book';
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
        createReadButton(tr, index);
        createRemoveButton(tr, index);       
        table.appendChild(tr);
    })
}

function clearTable() {
    const table = document.querySelector('table');
    while(table.firstElementChild !== table.lastElementChild) {
        table.removeChild(table.lastElementChild);
    }
}

function getBook() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');

    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.value;
    const newBook = new Book(title, author, pages, read);
    inputs.forEach(input => input.value = '');
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

function toggleRead(e) {
    if (myLibrary[e.target.dataset.index].read) {
        myLibrary[e.target.dataset.index].read = false;
    } else {
        myLibrary[e.target.dataset.index].read = true;
    }
    render();
}

// ADDING NEW LIBRARIES TO PAGE
// function getInfo(event) {
//     let name = prompt('What is your name?');
//     const newLibrary = new Library(name);
//     newLibrary.build();
// }