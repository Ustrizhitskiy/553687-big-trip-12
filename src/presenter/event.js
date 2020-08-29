import EventItem from "../view/main/event_list/subcomponents/event-item";
import EventEditCard from "../view/main/event_card/event-edit-card";
import {render, RenderPosition, replace} from "../util/render";

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

    this._eventViewComponent = new EventItem(event);
    this._eventEditComponent = new EventEditCard(event);

    this._eventViewComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventListContainer, this._eventViewComponent, RenderPosition.BEFOREEND);
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
