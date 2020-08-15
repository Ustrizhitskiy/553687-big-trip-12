export const createItemTypeTemplate = (eventName) => {
  const name = eventName.toLowerCase();

  return (
    `<div class="event__type-item">
      <input
        id="event-type-${name}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${name}">
      <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">
        ${eventName}
       </label>
    </div>`
  );
};
