import { addNewCardHandler } from "./card.js";
import { allowDrop, drop } from "./drag.js";
import boardList from "./db.js";

const deleteListHandler = (event) => {
  const board = boardList[event.target.attributes.boardIndex.value];
  const listId = event.target.attributes.listId.value;
  document
    .getElementById(board.name)
    .removeChild(event.currentTarget.parentElement.parentElement);
  const listIndex = board.list.findIndex((list) => list.id === listId);
  board.list.splice(listIndex, 1);
};

const createListMarkup = (boardIndex, listId) => {
  const board = boardList[boardIndex];
  const boardName = board.name;
  const list = board.list.find((b) => b.id == listId);
  const listContainer = document.createElement("div");
  listContainer.className = "list-container";
  const listChildren = ["list-header", "card-container", "list-footer"];
  let listNameRef;

  listChildren.forEach((children) => {
    let container = document.createElement("div");
    container.className = children;
    if (children === "list-header") {
      const listName = document.createElement("input");
      listName.type = "text";
      listName.className = "list-name";
      listName.placeholder = `Enter a name`;
      listNameRef = listName;
      // const deleteList = document.createElement("button");
      // deleteList.className = "delete-list";
      const deleteList = document.createElement("i");
      deleteList.className = "fas fa-trash";
      deleteList.setAttribute("boardIndex", boardIndex);
      deleteList.setAttribute("listId", listId);
      // deleteList.innerHTML = `<i class="fas fa-trash"></i>`;

      deleteList.onclick = deleteListHandler;
      container.appendChild(listName);
      container.appendChild(deleteList);
    }
    if (children === "card-container") {
      container.id = `list-${boardIndex}-${listId}`;
      container.ondrop = drop;
      container.ondragover = allowDrop;
    }
    if (children === "list-footer") {
      const addNewCard = document.createElement("button");
      addNewCard.className = "add-new-card";
      addNewCard.setAttribute("boardIndex", boardIndex);
      addNewCard.setAttribute("listId", listId);
      addNewCard.innerText = "+ Card";
      addNewCard.onclick = addNewCardHandler;
      container.appendChild(addNewCard);
    }
    listContainer.appendChild(container);
  });
  document.getElementById(boardName).appendChild(listContainer);

  listNameRef.focus();
};

const createList = (event) => {
  const boardIndex = event.target.attributes.index.value;
  const board = boardList[boardIndex];
  const listId =
    board.list.length > 0 ? board.list[board.list.length - 1].id + 1 : 1;
  board.list.push({
    id: listId,
    card: [],
  });
  createListMarkup(boardIndex, listId);
};

export { createList };
