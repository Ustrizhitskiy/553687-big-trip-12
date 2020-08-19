import {FILTER_ITEMS, SORT_ITEMS} from "./const";
import {generateEvent} from "./mock/eventMock";
import {createElement, render, RenderPosition} from "./util";
import RouteAndCostView from "./view/header/route-and-cost";
import MenuTabs from "./view/header/menu-tabs";
import FilterList from "./view/header/filter/filter-list";
import SortList from "./view/main/sort-list";
import EventList from "./view/main/event_list/event-list";
import EventEditCard from "./view/main/event_card/event-edit-card";
import TripDayList from "./view/main/event_list/subcomponents/trip-day-list";
import EventItem from "./view/main/event_list/subcomponents/event-item";

const EVENT_COUNT = 35;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, new RouteAndCostView(events).getElement(), RenderPosition.AFTERBEGIN);

const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, new MenuTabs().getElement(), RenderPosition.AFTEREND);

const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, new FilterList(FILTER_ITEMS).getElement(), RenderPosition.AFTEREND);

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);

const renderEvent = (eventListPerDay, event) => {
  const eventViewComponent = new EventItem(event);
  const eventFormComponent = new EventEditCard(event);

  const replaceEventViewToEventForm = () => {
    eventListPerDay.replaceChild(eventFormComponent.getElement(), eventViewComponent.getElement());
  };

  const replaceEventFormToEventView = () => {
    eventListPerDay.replaceChild(eventViewComponent.getElement(), eventFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEventFormToEventView();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventViewComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventViewToEventForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventFormComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEventFormToEventView();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListPerDay, eventViewComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderMainContainer = () => {
  const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
  render(tripEventsTitleElement, new SortList(SORT_ITEMS).getElement(), RenderPosition.AFTEREND);

  const sort = SORT_ITEMS[0];
  const eventList = new EventList(events, sort, FILTER_ITEMS[0]);
  render(sortAndContentElement, eventList.getElement(), RenderPosition.BEFOREEND);

  for (let dayDate of eventList.getTripDayLists().keys()) {
    const dayOfList = new TripDayList(dayDate);
    render(eventList.getElement(), dayOfList.getElement(), RenderPosition.BEFOREEND);

    const eventListPerDay = dayOfList.getElement().querySelector(`.trip-events__list`);
    for (let event of eventList.getTripDayLists().get(dayDate)) {
      renderEvent(eventListPerDay, event);
    }
  }
};

if (events.length > 0) {
  renderMainContainer();
} else {
  const noPointsElement = createElement(`<p class="trip-events__msg">Click New Event to create your first point</p>`);
  render(sortAndContentElement, noPointsElement, RenderPosition.BEFOREEND);
}
