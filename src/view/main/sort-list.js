import Sort from "./sort-item";
import AbstractElement from "../abstract-element";

const createSortTemplate = (sortItems) => {

  const sortItemsTemplate = sortItems
    .map((sort, index) => new Sort(sort, index === 0).getTemplate())
    .join(``);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
      ${sortItemsTemplate}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class SortList extends AbstractElement {
  constructor(sortList) {
    super();
    this._sortList = sortList;
  }

  getTemplate() {
    return createSortTemplate(this._sortList);
  }
}
