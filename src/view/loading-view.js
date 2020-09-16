import AbstractElement from "./abstract";

const createLoadingTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class LoadingView extends AbstractElement {
  getTemplate() {
    return createLoadingTemplate();
  }
}
