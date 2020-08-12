import {FILTER_ITEMS, EVENT_TYPE_GROUPS, TRANSFER_EVENTS, ACTIVITY_EVENTS} from "./const";
import {createRouteAndCostTemplate} from "./view/header/route-and-cost";
import {createMenuTabsTemplate} from "./view/header/menu-tabs";
import {createFilterListTemplate} from "./view/header/filter/filter-list";
import {createFilterItemTemplate} from "./view/header/filter/subcomponents/filter-item";
import {createSortTemplate} from "./view/main/sort";
import {createEventCardTemplate} from "./view/main/event_card/event-card";
import {createEventCardHeaderTemplate} from "./view/main/event_card/subcomponents/header/event-header";
import {createEventDetailsTemplate} from "./view/main/event_card/subcomponents/event-details";
import {createEventTypeGroupTemplate} from "./view/main/event_card/subcomponents/header/subcomponents/event-type-group";
import {createItemTypeTemplate} from "./view/main/event_card/subcomponents/header/subcomponents/event-type-item";
import {createEventDestinationTemplate} from "./view/main/event_card/subcomponents/event-destination";
import {createEventListTemplate} from "./view/main/event_list/event-list";
import {createEventItemTemplate} from "./view/main/event_list/subcomponents/event-item";
import {generateEvent} from "./mock/eventMock";

const EVENT_COUNT = 3;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

export const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

// Вставить маршрут и стоимость
const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, createRouteAndCostTemplate(events), `afterbegin`);

// Вставить меню
const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, createMenuTabsTemplate(), `afterend`);

// Вставить блок фильтров
const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, createFilterListTemplate(), `afterend`);

// Вставить сами фильтры
const filterBlockElement = tripMainHeaderElement.querySelector(`.trip-filters`);
for (let i = 0; i < FILTER_ITEMS.length; i++) {
  render(filterBlockElement, createFilterItemTemplate(FILTER_ITEMS[i]), `afterbegin`);
}

// Вставить основной блок (сортировка, карточка, список карточек)
const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
render(tripEventsTitleElement, createSortTemplate(), `afterend`);
render(sortAndContentElement, createEventCardTemplate(), `beforeend`);

// Вставить хедер карточки
const eventCardElement = sortAndContentElement.querySelector(`.trip-events__item`);
render(eventCardElement, createEventCardHeaderTemplate(), `afterbegin`);

// Всавить первую группу эвентов (трансфер)
const eventTypeListElement = eventCardElement.querySelector(`.event__type-list`);
for (let i = 0; i < EVENT_TYPE_GROUPS.length; i++) {
  render(eventTypeListElement, createEventTypeGroupTemplate(EVENT_TYPE_GROUPS[i]), `beforeend`);
}
// Находим элемент: группы типов эвентов (у нас в нем transfer и activity)
const eventTypeGroupElements = eventTypeListElement.querySelectorAll(`.event__type-group legend`);
// Вставить первую группу эвентов
for (let i = 0; i < TRANSFER_EVENTS.length; i++) {
  render(eventTypeGroupElements[0], createItemTypeTemplate(TRANSFER_EVENTS[i]), `afterend`);
}
// Вставить вторую группу эвентов
for (let i = 0; i < ACTIVITY_EVENTS.length; i++) {
  render(eventTypeGroupElements[1], createItemTypeTemplate(ACTIVITY_EVENTS[i]), `afterend`);
}

// Вставить детали карточки
const eventHeaderElement = eventCardElement.querySelector(`.event__header`);
render(eventHeaderElement, createEventDetailsTemplate(), `afterend`);

// Вставить фотки карточки
const eventDetailsElement = eventCardElement.querySelector(`.event__details`);
render(eventDetailsElement, createEventDestinationTemplate(), `afterend`);

render(sortAndContentElement, createEventListTemplate(), `beforeend`);

const dayEventsList = sortAndContentElement.querySelector(`.trip-days .trip-events__list`);

// Срендерим моки
for (let i = 0; i < events.length; i++) {
  render(dayEventsList, createEventItemTemplate(events[i]), `beforeend`);
}
