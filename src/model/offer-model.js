import Observer from "../utils/observer";

export default class OfferModel extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  getOffers() {
    return this._offers;
  }

  setOffers(offerList) {
    this._offers = offerList.slice();
  }

  getOfferObjByType(type) {
    const offerByType = this._offers.find((offer) => offer.type === type);
    return offerByType ? offerByType : [];
  }
}
