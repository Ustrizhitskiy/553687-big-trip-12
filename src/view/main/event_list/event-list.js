export const createEventListTemplate = (events) => {
  const startDates = [];
  events.forEach(event => {
    startDates.push(event.startDate);
  });
  console.log(startDates);

  const day = startDates[0].getDate();
  const month = startDates[0].toString().substring(4, 7).toUpperCase();
  const year = startDates[0].getFullYear();

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${day}</span>
          <time class="day__date" datetime="${year}-${month}-${day}">${month} ${year}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
     </ul>`
  );
};
