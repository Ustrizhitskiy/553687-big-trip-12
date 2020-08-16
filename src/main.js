import {FILTER_ITEMS, SORT_ITEMS} from "./const";
import {generateEvent} from "./mock/eventMock";
import {render, RenderPosition} from "./util";
import RouteAndCostView from "./view/header/route-and-cost";
import MenuTabs from "./view/header/menu-tabs";
import FilterList from "./view/header/filter/filter-list";
import SortList from "./view/main/sort-list";
import EventList from "./view/main/event_list/event-list";
import EventCard from "./view/main/event_card/event-card";

const EVENT_COUNT = 25;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripMainHeaderElement = document.querySelector(`.trip-main`);
render(tripMainHeaderElement, new RouteAndCostView(events).getElement(), RenderPosition.AFTERBEGIN);

const tabsAndFiltersElement = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const tabsTitleElement = tabsAndFiltersElement[0];
render(tabsTitleElement, new MenuTabs().getElement(), RenderPosition.AFTEREND);

const filterTitleElement = tabsAndFiltersElement[1];
render(filterTitleElement, new FilterList(FILTER_ITEMS).getElement(), RenderPosition.AFTEREND);

const sortAndContentElement = document.querySelector(`.page-body__page-main .trip-events`);
const tripEventsTitleElement = sortAndContentElement.querySelector(`h2`);
render(tripEventsTitleElement, new SortList(SORT_ITEMS).getElement(), RenderPosition.AFTEREND);

render(sortAndContentElement, new EventCard(events[0]).getElement(), RenderPosition.BEFOREEND);
render(sortAndContentElement, new EventList(events, SORT_ITEMS[0], FILTER_ITEMS[0]).getElement(), RenderPosition.BEFOREEND);
