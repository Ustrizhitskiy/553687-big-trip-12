import {createElement} from "../../../util";
import Filter from "./filter-item";

const createFilterListTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => new Filter(filter, index === 0).getTemplate())
    .join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterList {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterListTemplate(this._filters);
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
