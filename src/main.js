import {FILTER_ITEMS, SORT_ITEMS} from "./const";
import {generateEvent} from "./mock/eventMock";
import {render, RenderPosition} from "./util";
import RouteAndCostView from "./view/header/route-and-cost";
import MenuTabs from "./view/header/menu-tabs";
import FilterList from "./view/header/filter/filter-list";
import SortList from "./view/main/sort-list";
import EventList from "./view/main/event_list/event-list";
import EventEditCard from "./view/main/event_card/event-edit-card";
import TripDayList from "./view/main/event_list/subcomponents/trip-day-list";
import EventItem from "./view/main/event_list/subcomponents/event-item";
import Offer from "./view/main/event_list/subcomponents/offer";

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

const sort = SORT_ITEMS[0];
const eventList = new EventList(events, sort, FILTER_ITEMS[0]);
render(sortAndContentElement, eventList.getElement(), RenderPosition.BEFOREEND);

for (let dayDate of eventList.getTripDayLists().keys()) {
  const dayOfList = new TripDayList(dayDate);
  render(eventList.getElement(), dayOfList.getElement(), RenderPosition.BEFOREEND);


  // получаем элемент, в который будем рендерить список эвентов в день (<ul>)
  const eventListPerDay = dayOfList.getElement().querySelector(`.trip-events__list`);
  // Формируем список эвентов
  for (let event of eventList.getTripDayLists().get(dayDate)) {
    const eventItem = new EventItem(event);
    render(eventListPerDay, eventItem.getElement(), RenderPosition.BEFOREEND);


    // Получаем элемент точки маршрута, в который будем рендерить оффер (<ul class="event__selected-offers">)
    const offerListElement = eventItem.getElement().querySelector(`.event__selected-offers`);
    // Формируем список офферов
    // for (let offer of event.offers) {
    //   const newOffer = new Offer(offer);
    //   render(offerListElement, newOffer.getElement(), RenderPosition.BEFOREEND);
    // }
    let i = 0;
    while (event.offers[i]) {
      if (i === 3) break;
        const newOffer = new Offer(event.offers[i]);
        render(offerListElement, newOffer.getElement(), RenderPosition.BEFOREEND);
        i += 1;
    }


    // Здесь необходимо отрендерить еще форму эвента
    const eventEditCard = new EventEditCard(event);
    render(eventListPerDay, eventEditCard.getElement(), RenderPosition.BEFOREEND);
  }
}
