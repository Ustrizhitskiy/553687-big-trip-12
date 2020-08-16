import {createTripDaysTemplate} from "./subcomponents/trip-day-list";
import {createElement} from "../../../util";

const createEventListTemplate = (events, sortType, filter) => {
  let eventsCopy = events.slice();

  switch (sortType) {
    case `event`:
      eventsCopy.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);
      break;
    case `price`:
      eventsCopy.sort((previousEvent, nextEvent) => nextEvent.cost - previousEvent.cost);
      break;
    case `time`:
      eventsCopy.sort((previousEvent, nextEvent) => (nextEvent.endDate - nextEvent.startDate) - (previousEvent.endDate - previousEvent.startDate));
      break;
    default:
      eventsCopy.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);
  }

  let filteredEvents = [];
  const dateNow = new Date().getTime();
  switch (filter) {
    case `future`:
      filteredEvents = eventsCopy.filter((event) => event.startDate > dateNow);
      console.log(eventsCopy.length);
      console.log(filteredEvents.length);
      break;
    case `past`:
      filteredEvents = eventsCopy.filter((event) => event.endDate < dateNow);
      console.log(eventsCopy.length);
      console.log(filteredEvents.length);
      break;
    default:
      filteredEvents = eventsCopy;
  }

  const tripDays = createTripDaysTemplate(filteredEvents, sortType, filter);

  return (
    `<ul class="trip-days">
      ${tripDays}
     </ul>`
  );
};

export default class EventList {
  constructor(events, sortType, filter) {
    this._events = events;
    this._sortType = sortType;
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createEventListTemplate(this._events, this._sortType, this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
