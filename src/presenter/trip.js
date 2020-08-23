import {render, RenderPosition, replace} from "../util/render";
import RouteAndCostView from "../view/header/route-and-cost";
import MenuTabs from "../view/header/menu-tabs";
import FilterList from "../view/header/filter/filter-list";
import NoEvent from "../view/no-events";
import SortList from "../view/main/sort-list";
import {FilterItems, SortItems} from "../const";
import EventList from "../view/main/event_list/event-list";
import TripDayList from "../view/main/event_list/subcomponents/trip-day-list";
import EventItem from "../view/main/event_list/subcomponents/event-item";
import EventEditCard from "../view/main/event_card/event-edit-card";

export default class Trip {
  constructor() {
    this._currentFilter = FilterItems.EVERYTHING;
    this._currentSort = SortItems.EVENT;

    this._menuTabsComponent = new MenuTabs();
    this._filterListComponent = new FilterList();
    this._sortListComponent = new SortList();
    this._noEventComponent = new NoEvent();
  }

  init(events) {
    this._events = events.slice();

    this._renderHeader();

    this._sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);

    if (this._events.length > 0) {
      this._renderEventsContainer(this._sortAndContentElement);
    } else {
      this._renderNoEventContainer();
    }
  }

  _renderNoEventContainer() {
    render(this._sortAndContentElement, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderHeader() {
    const tripMainHeaderElement = document.querySelector(`.trip-main`);
    const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);

    this._renderRouteAndCostComponent(tripMainHeaderElement);
    this._renderMenuTabsComponent(tabsAndFiltersElement);
    this._renderFilterListComponent(tabsAndFiltersElement);
  }

  _renderRouteAndCostComponent(tripMainHeaderElement) {
    render(tripMainHeaderElement, new RouteAndCostView(this._events), RenderPosition.AFTERBEGIN);
  }

  _renderMenuTabsComponent(tabsAndFiltersElement) {
    const tabsTitleElement = tabsAndFiltersElement[0];
    render(tabsTitleElement, this._menuTabsComponent, RenderPosition.AFTEREND);
  }

  _renderFilterListComponent(tabsAndFiltersElement) {
    const filterTitleElement = tabsAndFiltersElement[1];
    render(filterTitleElement, this._filterListComponent, RenderPosition.AFTEREND);
    this._filterListComponent.setFilterTypeChangeHandler((newFilter) => this._renderChangedEventList(newFilter));
  }

  _renderChangedEventList(type) {
    const isFilter = Object.values(FilterItems).some((value) => value === type);
    if (isFilter) {
      this._currentFilter = type;
    } else {
      this._currentSort = type;
    }
    this._eventList.removeElement();
    this._eventList = new EventList(this._events, this._currentSort, this._currentFilter);
    this._renderEventsContainer();
  }

  _renderEventsContainer() {
    const tripEventsTitleElement = this._sortAndContentElement.querySelector(`h2`);
    render(tripEventsTitleElement, this._sortListComponent, RenderPosition.AFTEREND);
    this._sortListComponent.setSortTypeChangeHandler((newSort) => this._renderChangedEventList(newSort));

    this._eventList = new EventList(this._events, this._currentSort, this._currentFilter);
    render(this._sortAndContentElement, this._eventList, RenderPosition.BEFOREEND);

    if (this._currentSort === SortItems.EVENT) {
      this._renderTripListWithDays(this._eventList);
    } else {
      this._renderTripListWithoutDays(this._eventList);
    }
  }

  _renderTripListWithDays(eventList) {
    for (let dayDate of eventList.getTripDayLists().keys()) {
      const dayOfList = new TripDayList(dayDate);
      render(eventList, dayOfList, RenderPosition.BEFOREEND);

      const eventListPerDay = dayOfList.getElement().querySelector(`.trip-events__list`);
      for (let event of eventList.getTripDayLists().get(dayDate)) {
        this._renderEvent(eventListPerDay, event);
      }
    }
  }

  _renderTripListWithoutDays(eventList) {
    const listWithoutDays = new TripDayList().getElementWithoutDay();
    render(eventList, listWithoutDays, RenderPosition.BEFOREEND);
    const tripEventList = listWithoutDays.querySelector(`.trip-events__list`);
    for (let event of eventList.getEvents()) {
      this._renderEvent(tripEventList, event);
    }
  }

  _renderEvent(eventListPerDay, event) {
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

    render(eventListPerDay, eventViewComponent, RenderPosition.BEFOREEND);
  }
}
