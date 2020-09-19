import Observer from "../utils/observer";
import {UpdateType} from "../const";

export default class TripPointModel extends Observer {
  constructor() {
    super();
    this._tripPoints = [];
  }

  getTripPoints() {
    return this._tripPoints;
  }

  setTripPoints(updateType, points) {
    this._tripPoints = points.slice();

    this._notify(updateType);
  }

  updateTripPoint(updateType, update) {
    // console.log(this._tripPoints);
    // console.log(this._tripPoints[0]);
    // console.log(update);
    if (updateType === UpdateType.PATCH) {
      return;
    }

    const index = this._tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip point`);
    }

    this._tripPoints = [
      ...this._tripPoints.slice(0, index),
      update,
      ...this._tripPoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTripPoint(updateType, update) {
    this._tripPoints = [
      update,
      ...this._tripPoints
    ];

    this._notify(updateType, update);
  }

  deleteTripPoint(updateType, update) {
    const index = this._tripPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip point`);
    }

    this._tripPoints = [
      ...this._tripPoints.slice(0, index),
      ...this._tripPoints.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          dateFrom: point.date_from !== null ? new Date(point.date_from) : point.date_from,
          dateTo: point.date_to !== null ? new Date(point.date_to) : point.date_to,
          basePrice: point.base_price,
          isFavorite: point.is_favorite,
          offers: point.offers,
          destination: point.destination,
        }
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "date_from": point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
          "date_to": point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
          "base_price": point.basePrice,
          "is_favorite": point.isFavorite,
        }
    );

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    // alert("1")
    // console.log("----------------------------------");
    // console.log(adaptedPoint);

    return adaptedPoint;
  }
}
