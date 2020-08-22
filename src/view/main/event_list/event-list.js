import AbstractElement from "../../abstract-element";

const createEventListTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

const getSortedAndFilteredEvents = (events, sort, filter) => {
  let eventsCopy = events.slice();

  switch (sort) {
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
      break;
    case `past`:
      filteredEvents = eventsCopy.filter((event) => event.endDate < dateNow);
      break;
    default:
      filteredEvents = eventsCopy;
  }

  return filteredEvents;
};

const getListOfDayWithEvents = (events) => {
  let newDay = events[0].startDate;
  let allDaysWithEventsList = new Map();
  allDaysWithEventsList.set(newDay, []);
  let firstDatePerDay = events[0].startDate;

  events.forEach((event) => {
    if (event.startDate.getDate() === firstDatePerDay.getDate()) {
      allDaysWithEventsList.get(newDay).push(event);
    } else {
      newDay = event.startDate;
      allDaysWithEventsList.set(newDay, [event]);
      firstDatePerDay = event.startDate;
    }
  });

  return allDaysWithEventsList;
};

export default class EventList extends AbstractElement {
  constructor(events, sortType, filter) {
    super();
    this._events = getSortedAndFilteredEvents(events, sortType, filter);
  }

  getTemplate() {
    return createEventListTemplate();
  }

  getTripDayLists() {
    return getListOfDayWithEvents(this._events);
  }
}
