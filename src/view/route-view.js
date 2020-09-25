import AbstractElement from "./abstract";

const createRouteComponentTemplate = (cityNameList, totalPrice, datesForRender) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cityNameList}</h1>

        <p class="trip-info__dates">${datesForRender}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class RouteView extends AbstractElement {
  constructor(cityNameList, totalPrice, datesForRender) {
    super();
    this._cityNameList = cityNameList;
    this._totalPrice = totalPrice;
    this._datesForRender = datesForRender;
  }

  getTemplate() {
    return createRouteComponentTemplate(this._cityNameList, this._totalPrice, this._datesForRender);
  }
}
