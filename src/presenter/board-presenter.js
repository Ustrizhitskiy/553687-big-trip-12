import {SortType, UpdateType, UserAction} from "../const";
import {remove, render, RenderPosition} from "../utils/render";
import {filter} from "../utils/filter";
import BoardView from "../view/board-view";
import NoPointsView from "../view/no-points-view";
import LoadingView from "../view/loading-view";
import SortView from "../view/sort-view";
import NewPointPresenter from "./new-point-presenter";
import TripPointListView from "../view/trip-point-list-view";
import TripPointPresenter, {State as TripPointPresenterViewState} from "./trip-point-presenter";
import moment from "moment";

export default class BoardPresenter {
  constructor(boardContainer, tripPointModel, offerModel, destinationModel, filterModel, api) {
    this._boardContainer = boardContainer;
    this._tripPointModel = tripPointModel;
    this._offerModel = offerModel;
    this._destinationModel = destinationModel;
    this._filterModel = filterModel;
    this._api = api;
    this._currentSortType = SortType.EVENT;
    this._tripPointPresenter = {};
    this._isLoading = true;

    this._sortComponent = null;

    this._boardComponent = new BoardView();
    this._tripPointListComponent = new TripPointListView();
    this._noPointsComponent = new NoPointsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newPointPresenter = new NewPointPresenter(this._tripPointListComponent, this._handleViewAction, this._offerModel, this._destinationModel);
  }

  init() {
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._tripPointListComponent, RenderPosition.BEFOREEND);

    this._tripPointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._tripPointListComponent);
    remove(this._boardComponent);

    this._tripPointModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createNewPoint(callback) {
    this._newPointPresenter.init(callback);
  }

  _getTripPoints() {
    const filterType = this._filterModel.getFilter();
    const tripPoints = this._tripPointModel.getTripPoints();
    const filteredPoints = filter[filterType](tripPoints);

    switch (this._currentSortType) {
      case SortType.EVENT:
        return filteredPoints
          .sort((previousEvent, nextEvent) => previousEvent.dateFrom - nextEvent.dateFrom);
      case SortType.TIME:
        return filteredPoints
          .sort((previousEvent, nextEvent) => (nextEvent.dateTo - nextEvent.dateFrom) - (previousEvent.dateTo - previousEvent.dateFrom));
      case SortType.PRICE:
        return filteredPoints
          .sort((previousEvent, nextEvent) => nextEvent.basePrice - previousEvent.basePrice);
    }

    return filteredPoints;
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    // alert(actionType);
    // console.log(updateType);
    // console.log(update);
    switch (actionType) {
      case UserAction.ADD_TRIP_POINT:
        this._newPointPresenter.setSaving();
        this._api.addTripPoint(update)
          .then((response) => {
            this._tripPointModel.addTripPoint(updateType, response);
          })
          .catch(() => {
            this._newPointPresenter.setAborting();
          });
        break;
      case UserAction.UPDATE_TRIP_POINT:
        if (updateType === UpdateType.PATCH) {
          this._api.updateTripPoint(update);
          return;
        }
        this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.SAVING);
        this._api.updateTripPoint(update)
          .then((response) => {
            this._tripPointModel.updateTripPoint(updateType, response);
          })
          .catch(() => {
            this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.DELETE_TRIP_POINT:
        this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.DELETING);
        this._api.deleteTripPoint(update)
          .then(() => {
            this._tripPointModel.deleteTripPoint(updateType, update);
          })
          .catch(() => {
            this._tripPointPresenter[update.id].setViewState(TripPointPresenterViewState.ABORTING);
          });
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType);
    // console.log(data);
    switch (updateType) {
      case UpdateType.MINOR:
        this._tripPointPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripPoint(point, isDateAfterPrevious) {
    const tripPointPresenter = new TripPointPresenter(
        this._tripPointListComponent,
        this._handleViewAction,
        this._handleModeChange,
        this._api,
        this._offerModel,
        point.type,
        this._currentSortType,
        isDateAfterPrevious
    );
    tripPointPresenter.init(point);
    this._tripPointPresenter[point.id] = tripPointPresenter;
  }

  _renderPoints(points) {
    if (points.length > 0) {
      const isFirstDayDisplay = true;
      this._renderTripPoint(points[0], isFirstDayDisplay);
      for (let i = 1; i < points.length; i++) {
        const isDateAfterPrevious = moment(points[i].dateFrom).isAfter(moment(points[i - 1].dateFrom), `days`);
        this._renderTripPoint(points[i], isDateAfterPrevious);
      }
    }
  }

  _renderLoading() {
    render(this._boardComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._boardComponent, this._noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._newPointPresenter.destroy();
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointsComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getTripPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}
