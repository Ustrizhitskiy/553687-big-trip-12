import {createTripDaysTemplate} from "./subcomponents/trip-day-list";

export const createEventListTemplate = (events, sortType, filter) => {
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
