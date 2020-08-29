import EventItem from "../view/main/event_list/subcomponents/event-item";
import EventEditCard from "../view/main/event_card/event-edit-card";
import {remove, render, RenderPosition, replace} from "../util/render";

export default class EventPresenter {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventViewComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventViewComponent = this._eventViewComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventViewComponent = new EventItem(event);
    this._eventEditComponent = new EventEditCard(event);

    this._eventViewComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventViewComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventViewComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventListContainer.getElement().contains(prevEventViewComponent.getElement())) {
      replace(this._eventViewComponent, prevEventViewComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventViewComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventViewComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventViewComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._eventViewComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }
}
