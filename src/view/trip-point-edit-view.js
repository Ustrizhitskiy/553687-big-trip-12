import SmartElement from "./smart";
import {getPreposition} from "../utils/point";
import flatpickr from "flatpickr";
import {ACTIVITY_EVENTS, TRANSFER_EVENTS} from "../const";
import he from "he";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {capitalizeFirstLetter} from "../utils/render";

const POINT_BLANK = {
  type: `bus`,
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  isFavorite: false,
  offers: [],
  destination: {
    description: ``,
    name: ``,
    pictures: [],
  }
};

const createPointTypeTemplate = (typeList, currentType) => {
  return typeList
    .map((type) => {
      return (
        `<div class="event__type-item">
          <input
            id="event-type-${type}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${type}">
          <label
            class="event__type-label  event__type-label--${type} ${currentType === type ? `event__type-label--active` : ``}"
            data-type="${type}"
            for="event-type-${type}-1">
            ${capitalizeFirstLetter(type)}
           </label>
        </div>`
      );
    })
    .join(``);
};

const createTypeListTemplate = (type) => {
  const transferTypes = createPointTypeTemplate(TRANSFER_EVENTS, type);
  const activityTypes = createPointTypeTemplate(ACTIVITY_EVENTS, type);

  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${transferTypes}
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      ${activityTypes}
    </fieldset>`
  );
};

const createDestinationListTemplate = (destinationNameList) => {
  return destinationNameList
    .map((destination) => {
      return `<option value="${destination}"></option>`;
    })
    .join(``);
};

const createHeader = (data, cityList, isNewPoint) => {
  const {type, destination, basePrice, isFavorite, dateFrom, dateTo, isSaving, isDeleting, isDisabled} = data;

  const eventTypeList = createTypeListTemplate(type);
  const preposition = getPreposition(type);
  const destinationNameList = createDestinationListTemplate(cityList);

  return (
    `<header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type ? type : `bus`}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          ${eventTypeList}
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type ? capitalizeFirstLetter(type) : `Bus`} ${preposition}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
            value="${destination ? he.encode(`${destination.name}`) : ``}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationNameList}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? dateFrom : ``}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? dateTo : ``}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice ? he.encode(`${basePrice}`) : 0}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving` : `Save`}</button>
      ${isNewPoint ? `<button class="event__reset-btn" type="reset">Cancel</button>` : `<button class="event__reset-btn" type="reset">${isDeleting ? `Deleting` : `Delete`}</button>`}
      ${!isNewPoint ? `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>` : ``}
      ${!isNewPoint ? `<button class="event__rollup-btn" type="button">` : ``}
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`
  );
};

const createDetailsTemplate = (currentOffers, availableOffers) => {
  if (!availableOffers || availableOffers.length === 0) {
    return ``;
  }

  const offersForHTMLParams = availableOffers.map((offer) => {
    return {
      titleForAttr: offer.title.split(` `).join(`-`).toLowerCase(),
      title: offer.title,
      price: offer.price
    };
  });

  const offersList = offersForHTMLParams.map((offer) =>
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${offer.titleForAttr}"
        type="checkbox"
        name="${offer.titleForAttr}"
        ${currentOffers && currentOffers.some((offerFromPoint) => offerFromPoint.title === offer.title) ? `checked` : ``}>
      <label class="event__offer-label" for="${offer.titleForAttr}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
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

const createDestinationInfoTemplate = (destination) => {
  if (!destination || (destination.description === `` && destination.pictures.length === 0)) {
    return ``;
  }

  const {description, pictures} = destination;

  const photos = pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join(``);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos}
        </div>
      </div>
    </section>`
  );
};

const createPointEditTemplate = (data, availableOfferList, destinationNameList, isNewPoint) => {
  const {
    offers,
    destination,
  } = data;

  const pointHeaderTemplate = createHeader(data, destinationNameList, isNewPoint);
  const pointDetailsTemplate = createDetailsTemplate(offers, availableOfferList);
  const pointDestinationInfo = createDestinationInfoTemplate(destination);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${pointHeaderTemplate}
      ${pointDetailsTemplate}
      ${pointDestinationInfo}
    </form>`
  );
};

export default class TripPointEditView extends SmartElement {
  constructor(isNewPoint = false, tripPoint = POINT_BLANK, availableOffer = [], destinationList = []) {
    super();
    this._data = TripPointEditView.parsePointToData(tripPoint);
    this._startDatepicker = null;
    this._endtDatepicker = null;
    this._destinationList = destinationList;
    this._allOffersEntity = [];
    this._availableOfferList = availableOffer.offers;
    this._isNewPoint = isNewPoint;

    this._changePointTypeHandler = this._changePointTypeHandler.bind(this);
    this._changeCityHandler = this._changeCityHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._chooseOfferClickHandler = this._chooseOfferClickHandler.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setAvailableEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endtDatepicker) {
      this._endtDatepicker.destroy();
      this._endtDatepicker = null;
    }
  }

  reset(tripPoint) {
    this.updateData(
        TripPointEditView.parsePointToData(tripPoint)
    );
  }

  getTemplate() {
    this._data.isDisabled = this._data.destination.name === `` || !this._data.dateFrom || !this._data.dateTo || this._data.dateTo < this._data.dateFrom;
    const destinationNameList = this._destinationList.map((destination) => destination.name);
    return createPointEditTemplate(this._data, this._availableOfferList, destinationNameList, this._isNewPoint);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setAvailableEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormResetClickHandler(this._callback.resetClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          [`time_24hr`]: true,
          defaultDate: this._data.dateFrom,
          maxDate: this._data.dateTo,
          onClose: this._dateFromChangeHandler
        }
    );
  }

  _setAvailableEndDatepicker() {
    if (this._data.dateTo) {
      this._setEndDatepicker();
    }
    if (!this._data.dateFrom) {
      this.getElement().querySelector(`#event-end-time-1`).disabled = true;
    }
  }

  _setEndDatepicker() {
    if (this._endtDatepicker) {
      this._endtDatepicker.destroy();
      this._endtDatepicker = null;
    }

    this._endtDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          [`time_24hr`]: true,
          defaultDate: this._data.dateTo,
          minDate: this._data.dateFrom,
          onClose: this._dateToChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.event__type-item`)
      .forEach((item) => {
        item.addEventListener(`click`, this._changePointTypeHandler);
      });
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._changeCityHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._changePriceHandler);
    this.getElement()
      .querySelectorAll(`.event__reset-btn`)
      .forEach((item) => {
        item.addEventListener(`click`, this._deleteClickHandler);
      });
    this.getElement()
      .querySelectorAll(`.event__offer-selector`)
      .forEach((item) => {
        item.addEventListener(`click`, this._chooseOfferClickHandler);
      });
  }

  _chooseOfferClickHandler(evt) {
    const id = evt.target.id;
    if (id && id !== ``) {
      const newOfferList = this._data.offers.slice();
      const titleWords = id.split(`-`);
      const isCheckInOrCheckOut = (titleWords[titleWords.length - 1] === `in` || titleWords[titleWords.length - 1] === `out`) && titleWords[titleWords.length - 2] === `check`;
      if (isCheckInOrCheckOut) {
        titleWords[titleWords.length - 2] = titleWords[titleWords.length - 2] + `-` + titleWords[titleWords.length - 1];
        titleWords.pop();
      }
      const offerTitle = capitalizeFirstLetter(titleWords.join(` `));
      const clickedOffer = this._availableOfferList.find((offer) => offer.title === offerTitle);
      const coincidence = this._data.offers.find((offer) => offer.title === clickedOffer.title);
      if (coincidence) {
        const index = newOfferList.indexOf(coincidence);
        newOfferList.splice(index, 1);
      } else {
        newOfferList.push(clickedOffer);
      }
      this.updateData({
        offers: newOfferList
      });
    }
  }

  setAllOffers(offerList) {
    this._allOffersEntity = offerList;
    const newOffer = this._allOffersEntity.find((offerItem) => this._data.type === offerItem.type);
    this._availableOfferList = newOffer.offers;
  }

  setAvailableOffers(offerList) {
    this._availableOfferList = offerList;
  }

  _changePointTypeHandler(evt) {
    evt.preventDefault();
    const newOffer = this._allOffersEntity.find((offerItem) => evt.target.dataset.type === offerItem.type);
    if (!newOffer || this._data.type === newOffer.type) {
      return;
    }
    this._availableOfferList = newOffer.offers;
    this.updateData({
      type: newOffer.type,
      offers: []
    });
  }

  setCityChange(cityList) {
    this._destinationList = cityList;
  }

  _changeCityHandler(evt) {
    evt.preventDefault();
    const newDestination = this._destinationList.find((destination) => evt.target.value === destination.name);
    if (!newDestination) {
      return;
    }
    this._data.destination = newDestination;
    this.updateData({
      destination: newDestination
    });
  }

  _dateFromChangeHandler(dateListPicker) {
    if (!dateListPicker.target) {
      this._data.dateFrom = dateListPicker[0];
      this.updateData({
        dateFrom: dateListPicker[0]
      });
      if (this._data.dateFrom) {
        this._setEndDatepicker();
      }
    }
  }

  _dateToChangeHandler(dateListPicker) {
    if (!dateListPicker.target) {
      if (dateListPicker.length === 0) {
        return;
      }
      this._data.dateTo = dateListPicker[0];
      this.updateData({
        dateTo: dateListPicker[0]
      });
    }
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.resetClick(TripPointEditView.parseDataToPoint(this._data));
  }

  setFormResetClickHandler(callback) {
    this._callback.resetClick = callback;
    this.getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, this._deleteClickHandler);
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  setFavoriteClickHandler(callback) {
    if (this._isNewPoint) {
      return;
    }
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _handleCloseClick() {
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._handleCloseClick);
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    const priceToNumber = parseInt(evt.target.value, 10);
    if (typeof priceToNumber === `number`) {
      this._data.basePrice = priceToNumber;
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripPointEditView.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._formSubmitHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
