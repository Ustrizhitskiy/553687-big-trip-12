import {createTripDaysTemplate} from "./subcomponents/trip-day-list";
import {SortType} from "../../../util";

export const createEventListTemplate = (events, sortType) => {
  let eventsCopy = events.slice();

  switch (sortType) {
    case SortType.EVENT:
      eventsCopy.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);
      break;
    case SortType.PRICE:
      eventsCopy.sort((previousEvent, nextEvent) => nextEvent.cost - previousEvent.cost);
      break;
    case SortType.TIME:
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
