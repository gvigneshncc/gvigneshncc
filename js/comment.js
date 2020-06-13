import boardList from "./db.js";
import { boardIndexDom, listIndexDom, cardIndexDom } from "./util.js";

const showComments = (comments) => {
  const commentContainer = document.getElementsByClassName("show-comments")[0];
  commentContainer.innerHTML = "";
  comments.forEach((comment) => {
    const singleComment = document.createElement("ul");
    commentContainer.appendChild(singleComment);
    const listItem = document.createElement("li");
    const commentSpan = document.createElement("span");
    commentSpan.innerText = `${comment.text} - `;
    const dateSpan = document.createElement("span");
    dateSpan.innerText = comment.date;
    singleComment.appendChild(listItem);
    listItem.appendChild(commentSpan);
    listItem.appendChild(dateSpan);
  });
};

const createComment = () => {
  const boardIndex = boardIndexDom.value;
  const listId = listIndexDom.value;
  const cardId = cardIndexDom.value;
  const commentText = document.getElementById("card-comment").value;
  if (commentText.length === 0) {
    return alert("Enter Comments to add");
  }
  const comments = boardList[boardIndex].list
    .find((l) => l.id == listId)
    .card.find((c) => c.id == cardId).comments;
  comments.push({
    text: commentText,
    date: new Date().toDateString(),
  });
  document.getElementById("card-comment").value = "";
  showComments(comments);
};

export { createComment, showComments };
