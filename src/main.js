import {FILTER_ITEMS} from "./const";
import {createRouteAndCostTemplate} from "./view/header/route-and-cost";
import {createMenuTabsTemplate} from "./view/header/menu-tabs";
import {createFilterListTemplate} from "./view/header/filter/filter-list";
import {createFilterItemTemplate} from "./view/header/filter/subcomponents/filter-item";
import {createSortTemplate} from "./view/main/sort";
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
render(filterTitleElement, createFilterListTemplate(), `afterend`);

const filterBlockElement = tripMainHeaderElement.querySelector(`.trip-filters`);
for (let i = 0; i < FILTER_ITEMS.length; i++) {
  render(filterBlockElement, createFilterItemTemplate(FILTER_ITEMS[i]), `afterbegin`);
}

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(sortAndContentElement, createEventCardTemplate(), `beforeend`);
render(sortAndContentElement, createEventListTemplate(events), `beforeend`);
