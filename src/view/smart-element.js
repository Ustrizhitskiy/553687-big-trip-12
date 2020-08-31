import AbstractElement from "./abstract-element";

export default class SmartElement extends AbstractElement {
  constructor() {
    super();
    this._data = {};
  }

  // АБСТРАКТНЫЙ метод для восстановления обработчиков событий после перерисовки
  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  // Метод для удаления старого DOM-элемента, создания нового, поместить новый вместо старого, восстановить обработчики собфтий, вызвав restoreHandlers
  updateElement() {
    let previousElement = this.getElement();
    const parent = previousElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, previousElement);
    previousElement = null;

    this.restoreHandlers();
  }

  // Метод для обновления данных (по Esc)
  updateData(update, onlyDataUpdating) {
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
