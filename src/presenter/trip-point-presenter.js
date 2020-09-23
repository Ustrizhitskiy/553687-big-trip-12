import {remove, render, RenderPosition, replace} from "../utils/render";
import {UpdateType, UserAction} from "../const";
import {isDatesEqual} from "../utils/point";
import TripPointView from "../view/trip-point-view";
import TripPointEditView from "../view/trip-point-edit-view";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class TripPointPresenter {
  constructor(pointListContainer, changeData, changeMode, api, offerModel, pointType, currentSortType, isDateAfterPrevious) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._offerModel = offerModel;
    this._availableOfferByCurrentType = offerModel.getOfferObjByType(pointType);
    this._currentSortType = currentSortType;
    this._isDateAfterPrevious = isDateAfterPrevious;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;
    this._isNewPoint = false;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint, this._currentSortType, this._isDateAfterPrevious);
    this._tripPointEditComponent = new TripPointEditView(this._isNewPoint, tripPoint, this._availableOfferByCurrentType);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setFormResetClickHandler(this._handleDeleteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._pointListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointComponent, prevTripPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._tripPointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripPointComponent.shake(resetFormState);
        this._tripPointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      const offerByCurrentType = this._offerModel.getOfferObjByType(this._tripPoint.type).offers;
      this._tripPointEditComponent.setAvailableOffers(offerByCurrentType);
      this._tripPointEditComponent.reset(this._tripPoint);
      this._replaceFormToCard();
    }
  }

  async _getDestinations() {
    await this._api.getDestinations()
      .then((cities) => {
        // console.log(`asdsd`);
        this._tripPointEditComponent.setCityChange(cities);
      })
      .catch(() => {
        throw new Error(`Cant' get destinations.`);
      });
  }

  _getOffers() {
    const allOffers = this._offerModel.getOffers();
    this._tripPointEditComponent.setAllOffers(allOffers);
  }

  async _handleEditClick() {
    await this._getDestinations();
    // console.log(this._tripPointEditComponent._destinationList);
    this._getOffers();
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._tripPoint.isFavorite = !this._tripPoint.isFavorite;
    this._changeData(
        UserAction.UPDATE_TRIP_POINT,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._tripPoint
        )
    );
  }

  _handleFormSubmit(update) {
    // Если изменились даты, то надо полностью перерисовать список, если нет, просто обновить уже существующий компонент, оставив на своем месте
    const isMinorUpdate =
      isDatesEqual(this._tripPoint.dateTo, update.dateTo) &&
      isDatesEqual(this._tripPoint.dateFrom, update.dateFrom);

    this._changeData(
        UserAction.UPDATE_TRIP_POINT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.MAJOR,
        update
    );
  }

  _handleDeleteClick(tripPoint) {
    this._changeData(
        UserAction.DELETE_TRIP_POINT,
        UpdateType.MINOR,
        tripPoint
    );
  }

  _handleCancelClick() {
    remove(this._tripPointEditComponent);
  }
}
