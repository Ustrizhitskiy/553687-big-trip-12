import {createEventCardHeaderTemplate} from "./subcomponents/header/event-header";
import {createEventDetailsTemplate} from "./subcomponents/event-details";
import {createEventDestinationTemplate} from "./subcomponents/event-destination";
import {createElement} from "../../../util";

const CARD_BLANK = {
  routePointType: `Flight`,
  city: ``,
  startDate: null,
  endDate: null,
  cost: 0,
  offers: [],
  destinationInfo: {
    description: ``,
    photosSrc: [],
  }
};

const createEventCardTemplate = (event) => {
  const cardHeader = createEventCardHeaderTemplate(event);
  const cardDetails = createEventDetailsTemplate(event);
  const cardDestinationInfo = createEventDestinationTemplate(event);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${cardHeader}
      ${cardDetails}
      ${cardDestinationInfo}
    </form>`
  );
};

export default class EventCard {
  constructor(tripEvent) {
    this._tripEvent = tripEvent || CARD_BLANK;
    this._element = null;
  }

  getTemplate() {
    return createEventCardTemplate(this._tripEvent);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element
  }

  removeElement() {
    this._element = null;
  }
}
