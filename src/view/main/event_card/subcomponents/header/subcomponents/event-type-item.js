import AbstractElement from "../../../../../abstract-element";

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
      <label
       class="event__type-label  event__type-label--${type}"
       data-type="${eventType}"
       for="event-type-${type}-1">
        ${eventType}
       </label>
    </div>`
  );
};

export default class EventType extends AbstractElement {
  constructor(eventType) {
    super();
    this._eventType = eventType;
  }

  getTemplate() {
    return createItemTypeTemplate(this._eventType);
  }
}
