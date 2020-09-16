import AbstractElement from "./abstract";
import moment from "moment";
import {getPreposition} from "../utils/point";
import {capitalizeFirstLetter} from "../utils/render";

const getTimeFromStartToEnd = (startDate, endDate) => {
  try {
    const timeInMilliseconds = endDate.getTime() - startDate.getTime();
    const timeInMinutes = Math.trunc(timeInMilliseconds / 1000 / 60);
    const days = Math.trunc(timeInMinutes / 1440);
    const hours = Math.trunc((timeInMinutes - days * 1440) / 60);
    const minutes = timeInMinutes - days * 1440 - hours * 60;

    return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`.trim();
  } catch (e) {
    throw new Error(`Input parameters are not Date object.`);
  }
};

const createTripPointTemplate = (point) => {
  const {type, dateFrom, dateTo, basePrice, destination, offers} = point;
  const visuallyOffers = offers.length <= 3 ? offers : offers.slice(0, 3);

  const offersTemplate = visuallyOffers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join(``);

  const day = moment(dateFrom).date();
  const month = moment(dateFrom).month() + 1;
  const year = moment(dateFrom).year();

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${day}</span>
          <time class="day__date" datetime="${year}-${month}-${day}">
            ${month} ${year}
          </time>
        </div>
        <ul class="trip-events__list">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${capitalizeFirstLetter(type)} ${getPreposition(type)} ${destination.name}</h3>


            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${dateFrom}">${moment(dateFrom).format(`HH:mm`)}</time>
                &mdash;
                <time class="event__end-time" datetime="${dateTo}">${moment(dateTo).format(`HH:mm`)}</time>
              </p>
              <p class="event__duration">${getTimeFromStartToEnd(dateFrom, dateTo)}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${offersTemplate}
            </ul>


            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </ul>
      </li>`
  );
};

export default class TripPointView extends AbstractElement {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
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
