import {EVENT_TYPE_GROUPS, TRANSFER_EVENTS, ACTIVITY_EVENTS} from "../../../../../../const";
import {createElement} from "../../../../../../util";
import EventType from "./event-type-item";

const createEventTypeListTemplate = () => {
  const typeGroupWithTypeItems = new Map();
  typeGroupWithTypeItems.set(EVENT_TYPE_GROUPS[0], TRANSFER_EVENTS);
  typeGroupWithTypeItems.set(EVENT_TYPE_GROUPS[1], ACTIVITY_EVENTS);

  const eventTypeGroup = Array.from(typeGroupWithTypeItems);

  const itemListByType = (typeGroup) => {
    return typeGroup.map((typeItem) =>
      new EventType(typeItem).getTemplate()
    ).join(``);
  };

  return eventTypeGroup.map((itemGroup) =>
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${itemGroup[0]}</legend>
      ${itemListByType(itemGroup[1])}
    </fieldset>`
  ).join(``);
};

export default class EventTypeList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventTypeListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
