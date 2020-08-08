export const createItemTypeTemplate = (eventName) => {
  return (
    `<div class="event__type-item">
      <input id="event-type-${eventName.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventName.toLowerCase()}">
      <label class="event__type-label  event__type-label--${eventName.toLowerCase()}" for="event-type-${eventName.toLowerCase()}-1">${eventName}</label>
    </div>`
  );
};
