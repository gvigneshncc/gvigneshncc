import { createBoard } from "./board.js";
import { closeCard } from "./card.js";

window.addEventListener("load", () => {
  document.getElementById("board-name").focus();
});

document.getElementById("create-board").addEventListener("click", createBoard);
document.getElementById("close-card").addEventListener("click", closeCard);
