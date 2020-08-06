import {createRouteAndCostTemplate} from "./view/header/route-and-cost";
import {createMenuTabsTemplate} from "./view/header/menu-tabs";
import {createFilterListTemplate} from "./view/header/filter-list";
import {createSortTemplate} from "./view/main/sort";
import {createEventCardTemplate} from "./view/main/event_card/event-card";
import {createEventListTemplate} from "./view/main/event_list/event-list";
import {createEventItemTemplate} from "./view/main/event_list/subcomponents/event-item";
import {render} from "./app";

const EVENT_COUNT = 3;

const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, createRouteAndCostTemplate(), `afterbegin`);

const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, createMenuTabsTemplate(), `afterend`);

const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, createFilterListTemplate(), `afterend`);

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(sortAndContentElement, createEventCardTemplate(), `beforeend`);
render(sortAndContentElement, createEventListTemplate(), `beforeend`);

const dayEventsList = sortAndContentElement.querySelector(`.trip-days .trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(dayEventsList, createEventItemTemplate(), `beforeend`);
}
