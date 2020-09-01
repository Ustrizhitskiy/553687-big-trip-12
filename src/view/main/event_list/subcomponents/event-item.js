import {ACTIVITY_EVENTS} from "../../../../const";
import {getOnlyTimeFromDate, getTimeFromStartToEnd} from "../../../../util/date_and_time";
import Offer from "./offer";
import AbstractElement from "../../../abstract-element";

const getPreposition = (type) => {
  return ACTIVITY_EVENTS.some((elem) => elem === type) ? `in` : `to`;
};

const createEventItemTemplate = (event) => {
  const {routePointType, startDate, endDate, cost, city, offers} = event;

  const visuallyOffers = offers.length <= 3 ? offers : offers.slice(0, 3);
  const offersTemplate = visuallyOffers.map((offer) => new Offer(offer).getTemplate()).join(``);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${routePointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${routePointType} ${getPreposition(routePointType)} ${city}</h3>
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

export default class EventItem extends AbstractElement {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventItemTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
