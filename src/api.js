import TripPointModel from "./model/trip-point-model";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((points) => {
        return points.map(TripPointModel.adaptToClient);
      });
  }

  addTripPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(TripPointModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripPointModel.adaptToClient);
  }

  updateTripPoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripPointModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripPointModel.adaptToClient);
  }

  deleteTripPoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON)
      .then((cities) => {
        return cities;
      });
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON)
      .then((offers) => {
        return offers;
      });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    const isWrongStatus = response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX;
    if (isWrongStatus) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static toJSON(response) {
    return response.json();
  }
}
