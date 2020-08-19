import {createElement} from "../../../util";
import EventDestination from "./subcomponents/event-destination";
import EventDetails from "./subcomponents/event-details";
import EventEditHeader from "./subcomponents/header/event-header";

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
  const cardHeader = new EventEditHeader(event).getTemplate();
  const cardDetails = new EventDetails(event.offers).getTemplate();
  const cardDestinationInfo = new EventDestination(event.destinationInfo).getTemplate();

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${cardHeader}
      ${cardDetails}
      ${cardDestinationInfo}
    </form>`
  );
};

export default class EventEditCard {
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

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
