import AbstractElement from "./abstract-element";

const createNoEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoEvent extends AbstractElement {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoEventsTemplate();
  }
}
