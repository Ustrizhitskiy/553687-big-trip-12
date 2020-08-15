import {createEventItemTemplate} from "./event-item";

export const createTripDaysTemplate = (events, sortType) => {
  const getEventList = (sortedEvents) => {
    return sortedEvents.map((event) => createEventItemTemplate(event)).join(``);
  };

  const createEventListWithDay = () => {
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

    return Array.from(allDaysWithEventsList.keys()).map((groupDate) =>
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${groupDate.getDate()}</span>
          <time class="day__date" datetime="${groupDate.getFullYear()}-${groupDate.getMonth() + 1}-${groupDate.getDate()}">
            ${groupDate.getMonth() + 1} ${groupDate.getFullYear()}
          </time>
        </div>
        <ul class="trip-events__list">
          ${getEventList(allDaysWithEventsList.get(groupDate))}
        </ul>
      </li>`
    ).join(``);
  };

  const createEventListWithoutDay = () => {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info"></div>
        <ul class="trip-events__list">
          ${getEventList(events)}
        </ul>
      </li>`
    );
  };

  if (sortType === `event`) {
    return createEventListWithDay();
  } else {
    return createEventListWithoutDay();
  }
};
