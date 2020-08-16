import {createEventCardHeaderTemplate} from "./subcomponents/header/event-header";
import {createEventDetailsTemplate} from "./subcomponents/event-details";
import {createEventDestinationTemplate} from "./subcomponents/event-destination";

export const createEventCardTemplate = (event) => {
  let eventForRender;
  if (!event) {
    eventForRender = {
      routePointType: `Flight`,
      city: ``,
      startDate: null,
      endDate: null,
      cost: 0,
      offers: [],
      destinationInfo: {
        description: ``,
        photosSrc: [],
      },
    };
  } else {
    eventForRender = event;
  }

  const cardHeader = createEventCardHeaderTemplate(eventForRender);
  const cardDetails = createEventDetailsTemplate(eventForRender);
  const cardDestinationInfo = createEventDestinationTemplate(eventForRender);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      ${cardHeader}
      ${cardDetails}
      ${cardDestinationInfo}
    </form>`
  );
};
