import {createElement} from "../../../../util";

const createEventDetailsTemplate = (offers) => {
  const offersList = offers.map((offer, index) =>
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-luggage-1"
        type="checkbox"
        name="event-offer-${offer.type}"
        ${index === 0 ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.description}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
      </label>
    </div>`
  ).join(``);

  return (
    `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>
      </section>`
  );
};

export default class EventDetails {
  constructor(offers) {
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._offers);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
