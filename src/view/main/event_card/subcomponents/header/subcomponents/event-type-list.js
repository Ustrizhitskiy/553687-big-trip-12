import {createItemTypeTemplate} from "./event-type-item";
import {EVENT_TYPE_GROUPS, TRANSFER_EVENTS, ACTIVITY_EVENTS} from "../../../../../../const";

export const createEventTypeListTemplate = () => {
  const typeGroupWithTypeItems = new Map();
  typeGroupWithTypeItems.set(EVENT_TYPE_GROUPS[0], TRANSFER_EVENTS);
  typeGroupWithTypeItems.set(EVENT_TYPE_GROUPS[1], ACTIVITY_EVENTS);

  const eventTypeGroup = Array.from(typeGroupWithTypeItems);

  const itemListByType = (typeGroup) => {
    return typeGroup.map((typeItem) =>
      createItemTypeTemplate(typeItem)
    ).join(``);
  };

  return eventTypeGroup.map((itemGroup) =>
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${itemGroup[0]}</legend>
      ${itemListByType(itemGroup[1])}
    </fieldset>`
  ).join(``);
};
