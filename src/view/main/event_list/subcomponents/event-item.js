import {ACTIVITY_EVENTS} from "../../../../const";
import {getOnlyTimeFromDate, getTimeFromStartToEnd} from "../../../../util";
import {createEventItemOfferTemplate} from "./offer";

export const createEventItemTemplate = (eventMock) => {
  const {routePointType, city, startDate, endDate, cost, offers} = eventMock;

  const getPreposition = (type) => {
    return ACTIVITY_EVENTS.some((elem) => elem === type) ? `in` : `to`;
  };

  const preposition = getPreposition(routePointType);
  const visuallyOffers = offers.slice(0, 2);
  const offersTemplate = visuallyOffers.map((offer) => createEventItemOfferTemplate(offer)).join(``);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${routePointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${routePointType} ${preposition} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDate}">${getOnlyTimeFromDate(startDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate}">${getOnlyTimeFromDate(endDate)}</time>
        </p>
        <p class="event__duration">${getTimeFromStartToEnd(startDate, endDate)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
         ${offersTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};
