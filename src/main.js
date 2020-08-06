import {createRouteAndCostTemplate} from "./view/route-and-cost";
import {createMenuTabsTemplate} from "./view/menu-tabs";
import {createFilterListTemplate} from "./view/filter/filter-list";
import {createFilterItemTemplate} from "./view/filter/filter-item";
import {createSortTemplate} from "./view/sort";
import {createEventCardTemplate} from "./view/event/card/event-card";
import {createEventTypeGroupTemplate} from "./view/event/card/subcomponents/event-type-group";
import {createEventTypeItemTemplate} from "./view/event/card/subcomponents/event-type-item";
import {createEventOffersTemplate} from "./view/event/card/subcomponents/event-offers";
import {createEventListTemplate} from "./view/event/event-list";
import {createEventItemTemplate} from "./view/event/event-item";

const FILTER_COUNT = 3;
const EVENT_TYPE_GROUP_COUNT = 2;
const TRANSFER_EVENT_COUNT = 7;
const ACTIVITY_EVENT_COUNT = 3;
const OFFERS_COUNT = 5;
const EVENT_COUNT = 3;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const tripMainHeaderElement = document.querySelector(`.trip-main`);
const tabsAndFiltersElement = tripMainHeaderElement.querySelector(`.trip-main__trip-controls`);
render(tabsAndFiltersElement, createRouteAndCostTemplate(), `beforebegin`);

const tabsTitleElement = tabsAndFiltersElement.querySelectorAll(`h2`)[0];
render(tabsTitleElement, createMenuTabsTemplate(), `afterend`);

const filterTitleElement = tabsAndFiltersElement.querySelectorAll(`h2`)[1];
render(filterTitleElement, createFilterListTemplate(), `afterend`);

const filterFormElement = tabsAndFiltersElement.querySelector(`.trip-filters`);
for (let i = 0; i < FILTER_COUNT; i++) {
  render(filterFormElement, createFilterItemTemplate(), `afterbegin`);
}

const mainContainerElement = document.querySelector(`.page-body__page-main`);
const sortAndContentElement = mainContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);

render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(sortAndContentElement, createEventCardTemplate(), `beforeend`);

const eventTypeListElement = sortAndContentElement.querySelector(`.event__type-list`);
for (let i = 0; i < EVENT_TYPE_GROUP_COUNT; i++) {
  render(eventTypeListElement, createEventTypeGroupTemplate(), `afterbegin`);
}

const eventTypeTransferElement = eventTypeListElement.querySelectorAll(`.event__type-group`)[0];
for (let i = 0; i < TRANSFER_EVENT_COUNT; i++) {
  render(eventTypeTransferElement, createEventTypeItemTemplate(), `beforeend`);
}

const eventTypeActivityElement = eventTypeListElement.querySelectorAll(`.event__type-group`)[1];
for (let i = 0; i < ACTIVITY_EVENT_COUNT; i++) {
  render(eventTypeActivityElement, createEventTypeItemTemplate(), `beforeend`);
}

const offersBlockElement = sortAndContentElement.querySelector(`.event__available-offers`);
for (let i = 0; i < OFFERS_COUNT; i++) {
  render(offersBlockElement, createEventOffersTemplate(), `beforeend`);
}

render(sortAndContentElement, createEventListTemplate(), `beforeend`);

const dayEventsList = sortAndContentElement.querySelector(`.trip-days .trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(dayEventsList, createEventItemTemplate(), `beforeend`);
}
