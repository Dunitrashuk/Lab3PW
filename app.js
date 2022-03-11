"use strict";
// Selectors
const notToDoInput = document.querySelector('#input');
const button = document.querySelector('#submitButton');
const notToDoList = document.querySelector('#not-todo-list');
const cardFilter = document.querySelector('.select');
const imageLabel = document.querySelector('#imageLabel');

// Event Listeners
document.addEventListener('DOMContentLoaded', getStorageCards);
button.addEventListener('click', addCard);
notToDoList.addEventListener('click', checkOrDelete);
cardFilter.addEventListener('click', filterCards);
// imageLabel.addEventListener('change' addImageCard);

// Functions
function addCard(e) {
    e.preventDefault();
    if(notToDoInput.value === '')
        return

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('unchecked');

    const checkMark = document.createElement('img');
    checkMark.src = './images/unchecked.png';
    checkMark.classList.add('checkmark');
    cardDiv.appendChild(checkMark);

    const newCard = document.createElement('li');
    newCard.innerText = notToDoInput.value;
    cardDiv.appendChild(newCard);

    const deleteButton = document.createElement('img');
    deleteButton.src = './images/close.png';
    deleteButton.classList.add('deleteButton');
    cardDiv.appendChild(deleteButton);

    saveStorageCards(notToDoInput.value);
    notToDoList.appendChild(cardDiv);
    notToDoInput.value = '';
}

function checkOrDelete(e) {
    const item = e.target;
    if(item.classList[0] === 'deleteButton') {
        removeStorageCard(item.parentElement.children[1].innerHTML);
        item.parentElement.remove();
    }

    if(item.classList[0] === 'checkmark') {
        item.parentElement.classList.toggle('checked');

        if(item.parentElement.classList[1] === 'checked')
            item.src = './images/checked.png';
        else
            item.src = './images/unchecked.png';
    }
}

function filterCards(e) {
    const cards = notToDoList.querySelectorAll('div');
    cards.forEach(function(card) {
        switch (e.target.value) {
            case "All" :
                card.classList.remove("deleteCard");
                break;
            case "Checked" :
                if (card.classList.contains("checked"))
                    card.classList.remove("deleteCard");
                else
                    card.classList.add("deleteCard");
                break;
            case "Non Checked" :
                if (card.classList.contains("checked"))
                    card.classList.add("deleteCard");
                else
                    card.classList.remove("deleteCard");
                break;
        }
    });
}

function saveStorageCards(card) {
    let cards;
    if(localStorage.getItem('cards') === null)
        cards = [];
    else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    cards.push(card);
    localStorage.setItem('cards', JSON.stringify(cards));
}

function getStorageCards() {
    let cards;
    if(localStorage.getItem('cards') === null)
        cards = [];
    else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    cards.forEach(function(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('unchecked');

        const checkMark = document.createElement('img');
        checkMark.src = './images/unchecked.png';
        checkMark.classList.add('checkmark');
        cardDiv.appendChild(checkMark);

        const newCard = document.createElement('li');
        newCard.innerText = card;
        cardDiv.appendChild(newCard);

        const deleteButton = document.createElement('img');
        deleteButton.src = './images/close.png';
        deleteButton.classList.add('deleteButton');
        cardDiv.appendChild(deleteButton);

        notToDoList.appendChild(cardDiv);
    });
}

function removeStorageCard(card) {
    let cards;
    if(localStorage.getItem('cards') === null)
        cards = [];
    else {
        cards = JSON.parse(localStorage.getItem('cards'));
    }
    cards.splice(cards.indexOf(card), 1);
    localStorage.setItem('cards', JSON.stringify(cards));
}

// function addImageCard() {
// }