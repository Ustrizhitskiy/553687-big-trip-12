import {createElement} from "../../../util";

const createFilterItemTemplate = (filterName, isChecked) => {

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filterName}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filterName}"
        ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
    </div>`
  );
};

export default class Filter {
  constructor(filterName, isChecked) {
    this._filterName = filterName;
    this._isChecked = isChecked;
    this._element = null;
  }

  getTemplate() {
    return createFilterItemTemplate(this._filterName, this._isChecked);
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
