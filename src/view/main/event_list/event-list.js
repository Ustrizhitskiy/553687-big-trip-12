import {createTripDaysTemplate} from "./subcomponents/trip-day-list";
import {SortType} from "../../../util";

export const createEventListTemplate = (events, sortType) => {
  switch (sortType) {
    case SortType.EVENT:
      events.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);
      break;
    case SortType.PRICE:
      events.sort((previousEvent, nextEvent) => nextEvent.cost - previousEvent.cost);
      break;
    case SortType.TIME:
      events.sort((previousEvent, nextEvent) => (nextEvent.endDate - nextEvent.startDate) - (previousEvent.endDate - previousEvent.startDate));
      break;
    default:
      events.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);
  }

  const tripDays = createTripDaysTemplate(events, sortType);

  return (
    `<ul class="trip-days">
      ${tripDays}
     </ul>`
  );
};
