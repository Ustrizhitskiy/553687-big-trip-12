import AbstractElement from "./abstract";

const createPointListBlockTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripPointListView extends AbstractElement {
  getTemplate() {
    return createPointListBlockTemplate();
  }
}
