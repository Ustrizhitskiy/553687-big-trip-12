import {createTripDaysTemplate} from "./subcomponents/trip-day-list";

export const createEventListTemplate = (events, sortType) => {
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

  const tripDays = createTripDaysTemplate(eventsCopy, sortType);

  return (
    `<ul class="trip-days">
      ${tripDays}
     </ul>`
  );
};
