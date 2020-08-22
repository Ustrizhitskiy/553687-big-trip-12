import {FilterItems, SortItems} from "./const";
import {generateEvent} from "./mock/eventMock";
import {render, RenderPosition, replace} from "./util/render";
import RouteAndCostView from "./view/header/route-and-cost";
import MenuTabs from "./view/header/menu-tabs";
import FilterList from "./view/header/filter/filter-list";
import SortList from "./view/main/sort-list";
import EventList from "./view/main/event_list/event-list";
import EventEditCard from "./view/main/event_card/event-edit-card";
import TripDayList from "./view/main/event_list/subcomponents/trip-day-list";
import EventItem from "./view/main/event_list/subcomponents/event-item";
import NoEvent from "./view/no-events";

const EVENT_COUNT = 35;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, new RouteAndCostView(events).getElement(), RenderPosition.AFTERBEGIN);

const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, new MenuTabs().getElement(), RenderPosition.AFTEREND);

const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, new FilterList().getElement(), RenderPosition.AFTEREND);

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);

const renderEvent = (eventListPerDay, event) => {
  const eventViewComponent = new EventItem(event);
  const eventFormComponent = new EventEditCard(event);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replace(eventViewComponent, eventFormComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventViewComponent.setEditClickHandler(() => {
    replace(eventFormComponent, eventViewComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventFormComponent.setFormSubmitHandler(() => {
    replace(eventViewComponent, eventFormComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListPerDay, eventViewComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripListWithDays = (eventList) => {
  for (let dayDate of eventList.getTripDayLists().keys()) {
    const dayOfList = new TripDayList(dayDate).getElement();
    render(eventList, dayOfList, RenderPosition.BEFOREEND);

    const eventListPerDay = dayOfList.querySelector(`.trip-events__list`);
    for (let event of eventList.getTripDayLists().get(dayDate)) {
      renderEvent(eventListPerDay, event);
    }
  }
};

const renderTripListWithoutDays = (eventList) => {
  const listWithoutDays = new TripDayList().getElementWithoutDay();
  render(eventList, listWithoutDays, RenderPosition.BEFOREEND);
  const tripEventList = listWithoutDays.querySelector(`.trip-events__list`);
  for (let event of eventList.getEvents()) {
    renderEvent(tripEventList, event);
  }
};

const renderMainContainer = () => {
  const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
  render(tripEventsTitleElement, new SortList().getElement(), RenderPosition.AFTEREND);

  const sort = SortItems.EVENT;
  const eventList = new EventList(events, sort, FilterItems.FUTURE);
  render(sortAndContentElement, eventList.getElement(), RenderPosition.BEFOREEND);

  if (sort === SortItems.EVENT) {
    renderTripListWithDays(eventList);
  } else {
    renderTripListWithoutDays(eventList);
  }
};

if (events.length > 0) {
  renderMainContainer();
} else {
  render(sortAndContentElement, new NoEvent().getElement(), RenderPosition.BEFOREEND);
}
