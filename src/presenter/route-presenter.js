import RouteView from "../view/route-view";
import {remove, render, RenderPosition} from "../utils/render";
import moment from "moment";
import {UpdateType} from "../const";

export default class RoutePresenter {
  constructor(mainContainer, tripPointModel) {
    this._mainContainer = mainContainer;
    this._tripPointModel = tripPointModel;

    this._routeComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._tripPointModel.addObserver(this._handleModelEvent);

    const points = this._getTripPoints();
    const nameListForRender = this._getPointNames(points);
    const totalPrice = this._getTotalPrice(points);
    const datesForRender = this._getDatesForRender(points);

    this._routeComponent = new RouteView(nameListForRender, totalPrice, datesForRender);
    render(this._mainContainer, this._routeComponent, RenderPosition.AFTERBEGIN);
  }

  _getTripPoints() {
    return this._tripPointModel.getTripPoints().slice();
  }

  _sortByDate(nextPoint, previousPoint) {
    return nextPoint.dateFrom - previousPoint.dateFrom;
  }

  _getPointNames(points) {
    points.sort(this._sortByDate);
    const nameList = points.map((point) => point.destination.name);
    const routePointsCount = nameList.length;
    if (routePointsCount <= 3) {
      return nameList.join(` &mdash; `);
    } else {
      return `${nameList[0]} &mdash; ... &mdash; ${nameList[nameList.length - 1]}`;
    }
  }

  _getTotalPrice(points) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return points.map((point) => point.basePrice).reduce(reducer);
  }
  _getDatesForRender(points) {
    const firstDate = moment(points[0].dateFrom).format(`MMM DD`);
    const endDate = moment(points[points.length - 1].dateFrom).format(`MMM DD`);
    return `${firstDate} &mdash; ${endDate}`;
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.MAJOR || updateType === UpdateType.MINOR) {
      remove(this._routeComponent);
      this.init();
    }
  }
}
