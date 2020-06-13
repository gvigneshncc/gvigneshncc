const allowDrop = (event) => {
  event.preventDefault();
};

const drag = (event) => {
  event.dataTransfer.setData("text", event.target.id);
};

const drop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");

  const targetElement =
    event.target.className === "create-card"
      ? event.target.parentElement
      : event.target;
  targetElement.appendChild(document.getElementById(data));
};

export { allowDrop, drag, drop };
