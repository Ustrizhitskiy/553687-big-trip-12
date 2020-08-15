export const createEventItemOfferTemplate = (offer) => {
  return (
    `<li class="event__offer">
        <span class="event__offer-title">${offer.description}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
      </li>`);
};
