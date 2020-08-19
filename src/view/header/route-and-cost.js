import {createElement} from "../../util";

const createRouteAndCostTemplate = (events) => {
  const getTripRoute = (sortedEventsByDate) => {
    if (sortedEventsByDate.length >= 3) {
      const {city: firstCity} = sortedEventsByDate[0];
      const secondCity = sortedEventsByDate.length > 3 ? `&mdash; ... &mdash;` : ` &mdash; ${sortedEventsByDate[1].city} &mdash; `;
      const {city: lastCity} = sortedEventsByDate[sortedEventsByDate.length - 1];
      return `${firstCity} ${secondCity} ${lastCity}`;
    } else if (sortedEventsByDate.length === 2) {
      const {city: firstCity} = sortedEventsByDate[0];
      const {city: lastCity} = sortedEventsByDate[1];
      return `${firstCity} &mdash; ${lastCity}`;
    } else if (sortedEventsByDate.length === 1) {
      const {city} = sortedEventsByDate[0];
      return `${city}`;
    } else {
      return ``;
    }
  };

  const getTripDates = (sortedEventsByDate) => {
    if (sortedEventsByDate.length >= 2) {
      const {startDate} = sortedEventsByDate[0];
      const {endDate} = sortedEventsByDate[sortedEventsByDate.length - 1];
      const firstDay = `${startDate.getDate()} ${startDate.toString().substring(4, 7)}`;
      const lastDay = `${endDate.getDate()} ${endDate.toString().substring(4, 7)}`;
      return `${firstDay} &mdash; ${lastDay}`;
    } else if (sortedEventsByDate.length === 1) {
      const {startDate} = sortedEventsByDate[0];
      const {endDate} = sortedEventsByDate[0];
      const firstDay = `${startDate.getDate()} ${startDate.toString().substring(4, 7)}`;
      const lastDay = `${endDate.getDate()} ${endDate.toString().substring(4, 7)}`;
      return startDate.getDate() !== endDate.getDate() ? `${firstDay} &mdash; ${lastDay}` : `${firstDay}`;
    } else {
      return ``;
    }
  };

  let sortedEventsByDate = events.slice();
  sortedEventsByDate.sort((previousEvent, nextEvent) => previousEvent.startDate - nextEvent.startDate);

  const tripRoute = getTripRoute(sortedEventsByDate);
  const tripDates = getTripDates(sortedEventsByDate);

  let totalCost = 0;
  sortedEventsByDate.forEach((event) => {
    totalCost += event.cost;
  });

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>
        <p class="trip-info__dates">${tripDates}</p>
      </div>
      
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
};

export default class RouteAndCostView {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._events);
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
