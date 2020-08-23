import Filter from "./filter-item";
import AbstractElement from "../../abstract-element";
import {FilterItems} from "../../../const";

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

export default class FilterList extends AbstractElement {
  constructor() {
    super();
    this._filters = Object.values(FilterItems);

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterListTemplate(this._filters);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
