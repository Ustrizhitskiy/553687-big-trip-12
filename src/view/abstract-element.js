import {createElement} from "../util/render";

export default class AbstractElement {
  constructor() {
    if (new.target === AbstractElement) {
      throw new Error(`Can't create instance of AbstractElement, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not emplemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
