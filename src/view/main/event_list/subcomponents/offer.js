import {createElement} from "../../../../util";

const createOfferTemplate = (offerItem) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerItem.description}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerItem.cost}</span>
    </li>`
  );
};

export default class Offer {
  constructor(offerItem) {
    this._offerItem = offerItem;
    this._element = null;
  }

  getTemplate() {
    return createOfferTemplate(this._offerItem);
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
