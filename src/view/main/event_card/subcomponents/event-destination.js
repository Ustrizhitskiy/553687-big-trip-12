export const createEventDestinationTemplate = (event) => {
  const {description, photosSrc} = event.destinationInfo;

  const photos = photosSrc.map((src) =>
    `<img class="event__photo" src="${src}" alt="Event photo">`
  ).join(``);

  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photos}
          </div>
        </div>
      </section>`
  );
};
