import AbstractElement from "../../../abstract-element";

const createEventDetailsTemplate = (offers) => {
  if (offers.length === 0) {
    return ``;
  }

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

export default class EventDetails extends AbstractElement {
  constructor(offers) {
    super();
    this._offers = offers;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._offers);
  }
}
