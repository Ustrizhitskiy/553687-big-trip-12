export const createEventTypeGroupTemplate = (typeGroupName) => {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">${typeGroupName}</legend>
    </fieldset>`
  );
};
