import { createList } from "./list.js";
import boardList from "./db.js";

const createBoardMarkup = (index) => {
  const board = boardList[index];
  const boardContainer = document.getElementById("boards");
  const boardDiv = document.createElement("div");
  boardDiv.className = "board";
  boardDiv.id = board.name;
  boardContainer.appendChild(boardDiv);
  const boardHeader = document.createElement("h1");
  boardHeader.innerText = board.name;
  boardDiv.appendChild(boardHeader);
  const addList = document.createElement("button");
  addList.className = "add-list";
  addList.onclick = createList;
  addList.setAttribute("index", index);
  addList.innerText = "Add new list";
  boardDiv.appendChild(addList);
};

const createBoard = () => {
  const boardName = document.getElementById("board-name").value;
  if (!boardName.length > 0) return alert("Enter Board name");
  const index = boardList.push({
    name: boardName,
    list: [],
  });
  document.getElementById("board-name").value = "";
  createBoardMarkup(index - 1);
};

export { createBoard };
