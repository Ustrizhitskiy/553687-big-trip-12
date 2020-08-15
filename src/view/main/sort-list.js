import {createSortItemTemplate} from "./sort-item";

export const createSortTemplate = (sortItems) => {

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
