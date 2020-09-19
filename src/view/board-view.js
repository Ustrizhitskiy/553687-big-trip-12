import AbstractElement from "./abstract";

const createBoardTemplate = () => {
  return `<div class="board-container"></div>`;
};

export default class BoardView extends AbstractElement {
  getTemplate() {
    return createBoardTemplate();
  }
}
