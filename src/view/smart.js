import AbstractElement from "./abstract";
import {remove} from "../utils/render";

export default class SmartElement extends AbstractElement {
  constructor() {
    super();
    this._data = {};
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    let previousElement = this.getElement();
    const parent = previousElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, previousElement);
    previousElement = null;

    this.restoreHandlers();
  }

  updateData(update, onlyDataUpdating) {
    if (update.isDeleting) {
      remove(this);
      return;
    }

    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (onlyDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
