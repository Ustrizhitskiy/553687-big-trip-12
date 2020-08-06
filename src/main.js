import {createRouteAndCostTemplate} from "./view/route-and-cost";
import {createMenuTabsTemplate} from "./view/menu-tabs";
import {createFilterListTemplate} from "./view/filter/filter-list";
import {createFilterItemTemplate} from "./view/filter/filter-item";
import {createSortTemplate} from "./view/sort";
import {createEventCardTemplate} from "./view/event/event-card";
import {createEventListTemplate} from "./view/event/event-list";
import {createEventItemTemplate} from "./view/event/event-item";

const FILTER_COUNT = 3;
const EVENT_COUNT = 3;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template)
};

const tripMainHeaderElement = document.querySelector(`.trip-main`);
const tabsAndFiltersElement = tripMainHeaderElement.querySelector(`.trip-main__trip-controls`);
render(tabsAndFiltersElement, createRouteAndCostTemplate(), `beforebegin`);

const tabsTitleElement = tabsAndFiltersElement.querySelectorAll(`h2`)[0];
render(tabsTitleElement, createMenuTabsTemplate(), `afterend`);

const filterTitleElement = tabsAndFiltersElement.querySelectorAll(`h2`)[1];
render(filterTitleElement, createFilterListTemplate(), `afterend`);

const filterFormElement = tabsAndFiltersElement.querySelector(`.trip-filters`);
for (let i = 0; i < FILTER_COUNT; i ++) {
  render(filterFormElement, createFilterItemTemplate(), `afterbegin`);
}

const mainContainerElement = document.querySelector(`.page-body__page-main`);
const sortAndContentElement = mainContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);

render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(sortAndContentElement, createEventCardTemplate(), `beforeend`);
render(sortAndContentElement, createEventListTemplate(), `beforeend`);

const dayEventsList = sortAndContentElement.querySelector(`.trip-days .trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(dayEventsList, createEventItemTemplate(), `beforeend`);
}
