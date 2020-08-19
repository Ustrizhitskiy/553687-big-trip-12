import {createElement} from "../../util";

const createSortItemTemplate = (sortName, isChecked) => {
  const createSvgTemplate = () => {
    return (
      `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>`
    );
  };

  return (
    `<div class="trip-sort__item  trip-sort__item--${sortName}">
      <input
        id="sort-${sortName}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortName}"
        ${isChecked ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${sortName}">
        ${sortName}
        ${sortName !== `event` ? createSvgTemplate() : ``}
      </label>
    </div>`
  );
};

export default class Sort {
  constructor(sortName, isChecked) {
    this._sortName = sortName;
    this._isChecked = isChecked;
    this._element = null;
  }

  getTemplate() {
    return createSortItemTemplate(this._sortName, this._isChecked);
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
