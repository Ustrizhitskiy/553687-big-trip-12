import {createSortItemTemplate} from "./sort-item";
import {createElement} from "../../util";

const createSortTemplate = (sortItems) => {

  const sortItemsTemplate = sortItems
    .map((sort, index) => createSortItemTemplate(sort, index === 0))
    .join(``);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortItemsTemplate}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortList {
  constructor(sortList) {
    this._sortList = sortList;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._sortList);
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
