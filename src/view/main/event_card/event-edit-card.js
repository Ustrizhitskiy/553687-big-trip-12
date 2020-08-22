import EventDestination from "./subcomponents/event-destination";
import EventDetails from "./subcomponents/event-details";
import EventEditHeader from "./subcomponents/header/event-header";
import AbstractElement from "../../abstract-element";

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

export default class EventEditCard extends AbstractElement {
  constructor(tripEvent) {
    super();
    this._tripEvent = tripEvent || CARD_BLANK;
  }

  getTemplate() {
    return createEventCardTemplate(this._tripEvent);
  }
}
