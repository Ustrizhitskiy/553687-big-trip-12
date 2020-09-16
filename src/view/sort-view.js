import AbstractElement from "./abstract";
import {sortItems} from "../utils/sort";

const createSortItemTemplate = (sort, currentSortType) => {
  const {type, name} = sort;

  const createSvgTemplate = () => {
    return (
      `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>`
    );
  };

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${type}"
        ${type === currentSortType ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${type}">
        ${name}
        ${type !== `event` ? createSvgTemplate() : ``}
      </label>
    </div>`
  );
};

const createSortBlockTemplate = (currentSortType) => {
  const sortItemsTemplate = sortItems
    .map((sortItem) => createSortItemTemplate(sortItem, currentSortType))
    .join(``);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">${currentSortType === `event` ? `Day` : ``}</span>
      ${sortItemsTemplate}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortView extends AbstractElement {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortBlockTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.value);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
