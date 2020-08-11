import {ACTIVITY_EVENTS} from "../../../../const";

const isActivityType = (type) => {
  return ACTIVITY_EVENTS.some(elem => elem === type) ? `in` : `to`;
};

export const createEventItemTemplate = (eventMock) => {
  console.log(eventMock);
  console.log((eventMock.endDate - eventMock.startDate));

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventMock.routePointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventMock.routePointType} ${isActivityType(eventMock.routePointType)} ${eventMock.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${eventMock.startDate}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${eventMock.endDate}</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventMock.cost}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">${eventMock.offers.description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${eventMock.offers.cost}</span>
         </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};
