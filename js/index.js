import { createBoard } from "./board.js";
import { closeCard } from "./card.js";

document.getElementById("create-board").addEventListener("click", createBoard);
document.getElementById("close-card").addEventListener("click", closeCard);
