import {remove, render, RenderPosition} from "../utils/render";
import {UpdateType, UserAction} from "../const";
import TripPointEditView from "../view/trip-point-edit-view";

export default class NewPointPresenter {
  constructor(pointListContainer, changeData, offerModel, destinationModel) {
    this._defaultOffers = [];
    this._offerModel = offerModel;
    this._destinationModel = destinationModel;
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._isNewPoint = true;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._defaultOffers = this._offerModel.getOfferObjByType(`bus`);

    const destinationList = this._destinationModel.getDestinations();

    this._pointEditComponent = new TripPointEditView(this._isNewPoint, undefined, this._defaultOffers, destinationList);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormResetClickHandler(this._handleCancelClick);

    const allOffers = this._offerModel.getOffers();
    this._pointEditComponent.setAllOffers(allOffers);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`click`, this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(tripPoint) {
    this._changeData(
        UserAction.ADD_TRIP_POINT,
        UpdateType.MAJOR,
        tripPoint
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
