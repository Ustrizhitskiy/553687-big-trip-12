import EventDestination from "./subcomponents/event-destination";
import EventDetails from "./subcomponents/event-details";
import EventEditHeader from "./subcomponents/header/event-header";
import SmartElement from "../../smart-element";

const CARD_BLANK = {
  routePointType: `Flight`,
  city: ``,
  startDate: null,
  endDate: null,
  cost: 0,
  isFavorite: false,
  offers: [],
  destinationInfo: {
    description: ``,
    photosSrc: [],
  }
};

const createEventCardTemplate = (data) => {
  const cardHeader = new EventEditHeader(data).getTemplate();
  const cardDetails = new EventDetails(data.offers).getTemplate();
  const cardDestinationInfo = new EventDestination(data.destinationInfo).getTemplate();

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${cardHeader}
      ${cardDetails}
      ${cardDestinationInfo}
    </form>`
  );
};

export default class EventEditCard extends SmartElement {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent || CARD_BLANK;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventCardTemplate(this._tripEvent);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._tripEvent);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  restoreHandlers() {}
}
