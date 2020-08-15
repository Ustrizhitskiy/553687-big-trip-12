import {createEventCardHeaderTemplate} from "./subcomponents/header/event-header";
import {createEventDetailsTemplate} from "./subcomponents/event-details";
import {createEventDestinationTemplate} from "./subcomponents/event-destination";

export const createEventCardTemplate = (event) => {
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
