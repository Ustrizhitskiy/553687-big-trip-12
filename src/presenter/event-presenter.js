import EventItem from "../view/main/event_list/subcomponents/event-item";
import EventEditCard from "../view/main/event_card/event-edit-card";
import {remove, render, RenderPosition, replace} from "../util/render";
import {getOffersByType} from "../mock/offerMock";
import {generateDestinationInfo} from "../mock/eventMock";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventViewComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleChooseEventTypeClick = this._handleChooseEventTypeClick.bind(this);
    this._handleChooseCityClick = this._handleChooseCityClick.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventViewComponent = this._eventViewComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventViewComponent = new EventItem(event);
    this._eventEditComponent = new EventEditCard(event);

    this._eventViewComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setChooseTypeClickHandler(this._handleChooseEventTypeClick);
    this._eventEditComponent.setChooseCityInput(this._handleChooseCityClick);

    if (prevEventViewComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventViewComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventListContainer.contains(prevEventViewComponent.getElement())) {
      replace(this._eventViewComponent, prevEventViewComponent);
    }

    if (this._eventListContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventViewComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventViewComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventViewComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventViewComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._event, {isFavorite: !this._event.isFavorite}));
  }

  _handleChooseEventTypeClick(type) {
    if (this._event.routePointType !== type) {
      // Получаем новый список доп предложений по типу (общий список мы получим GET запросом), а пока из функции мока:
      const offersByType = getOffersByType(type);
      this._changeData(Object.assign(
          {},
          this._event,
          {routePointType: type},
          {offers: offersByType}
      ));
    }
  }

  _handleChooseCityClick(city) {
    // console.log(city);
    // Получаем описание места и список фото по нзванию города (список получим GET запросом):
    // const destinationInfo = getDestinationInfoByCity(city);
    // Если нет такого города в списке, ничего не делаем (выходим из метода)

    // , а пока просто сгенерим новый из моков:
    const destinationInfo = generateDestinationInfo();
    this._changeData(Object.assign(
        {},
        this._event,
        {city},
        {destinationInfo}
    ));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.resetView(this._event);
      this._replaceFormToCard();
    }
  }
}
