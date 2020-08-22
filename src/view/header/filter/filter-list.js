import Filter from "./filter-item";
import AbstractElement from "../../abstract-element";

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

export default class FilterList extends AbstractElement{
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterListTemplate(this._filters);
  }
}
