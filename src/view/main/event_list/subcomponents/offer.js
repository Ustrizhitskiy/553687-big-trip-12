import AbstractElement from "../../../abstract-element";

const createOfferTemplate = (offerItem) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerItem.description}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerItem.cost}</span>
    </li>`
  );
};

export default class Offer extends AbstractElement {
  constructor(offerItem) {
    super();
    this._offerItem = offerItem;
  }

  getTemplate() {
    return createOfferTemplate(this._offerItem);
  }
}
