import { createComment, showComments } from "./comment.js";
import { drag } from "./drag.js";
import { boardIndexDom, listIndexDom, cardIndexDom } from "./util.js";
import boardList from "./db.js";

const showCardMarkup = (event) => {
  let currentEvent = event.target.attributes;
  const boardIndex = currentEvent.boardIndex.value;
  const board = boardList[boardIndex];
  const listId = currentEvent.listId.value;
  const cardId = currentEvent.cardId.value;
  const card = board.list
    .find((l) => l.id == listId)
    .card.find((c) => c.id == cardId);
  boardIndexDom.value = boardIndex;
  listIndexDom.value = listId;
  cardIndexDom.value = cardId;

  document.getElementById("create-card-button").style.display = "none";
  document.getElementById("del-card-button").style.display = "block";
  const cardTitleInput = document.getElementById("card-title");
  cardTitleInput.value = card.title;
  cardTitleInput.readOnly = true;

  const cardTitleDesc = document.getElementById("card-desc");
  cardTitleDesc.value = card.desc;
  cardTitleDesc.readOnly = true;

  showComments(card.comments);
  document.getElementsByClassName("add-card")[0].style.display = "flex";
};

const createDisplayCardMarkup = () => {
  const boardIndex = boardIndexDom.value;
  const listId = listIndexDom.value;
  const cardId = cardIndexDom.value;
  const board = boardList[boardIndex];
  const card = board.list
    .find((l) => l.id == listId)
    .card.find((c) => c.id == cardId);
  card.title = document.getElementById("card-title").value;
  card.desc = document.getElementById("card-desc").value;
  if (card.title.length === 0 || card.desc.length === 0) {
    return alert("Enter Title and Description");
  }
  const createCard = document.createElement("div");
  createCard.className = "create-card";
  createCard.setAttribute("boardIndex", boardIndex);
  createCard.setAttribute("listId", listId);
  createCard.setAttribute("cardId", cardId);
  createCard.id = `${boardIndex}-${listId}-${cardId}`;
  createCard.draggable = true;
  createCard.ondragstart = drag;
  createCard.onclick = showCardMarkup;

  const cardTitle = document.createElement("div");
  cardTitle.className = "display-card-title";
  cardTitle.innerText = card.title;

  const cardDesc = document.createElement("div");
  cardDesc.className = "display-card-desc";
  cardDesc.innerText = card.desc;

  document
    .getElementById(`list-${boardIndex}-${listId}`)
    .appendChild(createCard);
  createCard.appendChild(cardTitle);
  createCard.appendChild(cardDesc);
  document.getElementsByClassName("add-card")[0].style.display = "none";
};

const deleteCard = () => {
  const boardIndex = boardIndexDom.value;
  const listId = listIndexDom.value;
  const cardId = cardIndexDom.value;
  const board = boardList[boardIndex];
  const card = board.list.find((l) => l.id == listId).card;
  const cardIndex = card.findIndex((c) => c.id == cardId);
  card.splice(cardIndex, 1);
  document
    .getElementById(`list-${boardIndex}-${listId}`)
    .removeChild(document.getElementById(`${boardIndex}-${listId}-${cardId}`));
  document.getElementsByClassName("add-card")[0].style.display = "none";
};

const addNewCardHandler = (event) => {
  const boardIndex = event.target.attributes.boardIndex.value;
  const board = boardList[boardIndex];
  const listId = event.target.attributes.listId.value;
  const card = board.list.find((l) => l.id == listId).card;
  const cardId = card.length > 0 ? card[card.length - 1].id + 1 : 1;
  card.push({
    id: cardId,
    title: "",
    desc: "",
    comments: [],
  });
  document.getElementsByClassName("add-card")[0].style.display = "flex";
  document.getElementById("del-card-button").style.display = "none";
  boardIndexDom.value = boardIndex;
  listIndexDom.value = listId;
  cardIndexDom.value = cardId;
  const commentContainer = document.getElementsByClassName("show-comments")[0];
  commentContainer.innerHTML = "";

  const cardTitleInput = document.getElementById("card-title");
  cardTitleInput.value = "";
  cardTitleInput.readOnly = false;

  const cardTitleDesc = document.getElementById("card-desc");
  cardTitleDesc.value = "";
  cardTitleDesc.readOnly = false;

  document.getElementById("create-card-button").style.display = "block";

  document
    .getElementById("create-card-button")
    .addEventListener("click", createDisplayCardMarkup);

  document
    .getElementById("del-card-button")
    .addEventListener("click", deleteCard);

  document
    .getElementById("create-comment-button")
    .addEventListener("click", createComment);
};

const closeCard = () => {
  document.getElementsByClassName("add-card")[0].style.display = "none";
};

export { closeCard, addNewCardHandler };
