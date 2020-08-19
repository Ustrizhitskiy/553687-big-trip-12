import {createElement} from "../../../../../../util";

const createItemTypeTemplate = (eventType) => {
  const type = eventType.toLowerCase();

  return (
    `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
        ${eventType}
       </label>
    </div>`
  );
};

export default class EventType {
  constructor(eventType) {
    this._eventType = eventType;
    this._element = null;
  }

  getTemplate() {
    return createItemTypeTemplate(this._eventType);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}
