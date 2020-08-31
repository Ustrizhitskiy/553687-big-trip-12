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
  constructor(tripEvent = CARD_BLANK) {
    super();
    this._data = EventEditCard.parseEventToData(tripEvent);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._chooseTypeClickHandler = this._chooseTypeClickHandler.bind(this);
    this._chooseCityInputHandler = this._chooseCityInputHandler.bind(this);

    this._setInnerHandlers();
  }

  _setInnerHandlers() {}

  resetForm(event) {
    this.updateData(EventEditCard.parseEventToData(event));
  }

  getTemplate() {
    return createEventCardTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEditCard.parseDataToEvent(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _chooseTypeClickHandler(evt) {
    evt.preventDefault();
    this._callback.chooseTypeClick(evt.target.dataset.type);
  }

  _chooseCityInputHandler(evt) {
    evt.preventDefault();
    this._callback.chooseCityClick(evt.target.value);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setChooseTypeClickHandler(callback) {
    this._callback.chooseTypeClick = callback;
    this.getElement()
      .querySelectorAll(`.event__type-item`)
      .forEach((item) => {
        item.addEventListener(`click`, this._chooseTypeClickHandler);
      });
  }

  setChooseCityInput(callback) {
    this._callback.chooseCityClick = callback;
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._chooseCityInputHandler);
  }

  static parseEventToData(tripEvent) {
    return Object.assign(
        {},
        tripEvent
    );
  }

  static parseDataToEvent(data) {
    return Object.assign({},
        data,
        {
          isFavorite: false
        });
  }

  restoreHandlers() {}
}
