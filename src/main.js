import {FILTER_ITEMS, SORT_ITEMS} from "./const";
import {createRouteAndCostTemplate} from "./view/header/route-and-cost";
import {createMenuTabsTemplate} from "./view/header/menu-tabs";
import {createFilterListTemplate} from "./view/header/filter/filter-list";
import {createSortTemplate} from "./view/main/sort-list";
import {createEventCardTemplate} from "./view/main/event_card/event-card";
import {createEventListTemplate} from "./view/main/event_list/event-list";
import {generateEvent} from "./mock/eventMock";

const EVENT_COUNT = 25;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

export const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, createRouteAndCostTemplate(events), `afterbegin`);

const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, createMenuTabsTemplate(), `afterend`);

const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, createFilterListTemplate(FILTER_ITEMS), `afterend`);

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
render(tripEventsTitleElement, createSortTemplate(SORT_ITEMS), `afterend`);

render(sortAndContentElement, createEventCardTemplate(events[0]), `beforeend`);
render(sortAndContentElement, createEventListTemplate(events, SORT_ITEMS[0]), `beforeend`);
