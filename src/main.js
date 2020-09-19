import Api from "./api";
import TripPointModel from "./model/trip-point-model";
import FilterModel from "./model/filter-model";
import SiteMenuView from "./view/site-menu-view";
import {render, RenderPosition} from "./utils/render";
import {FilterType, MenuItem, UpdateType} from "./const";
import FilterPresenter from "./presenter/filter-presenter";
import BoardPresenter from "./presenter/board-presenter";
import OfferModel from "./model/offer-model";

const AUTHORIZATION = `Basic kTy9gIdsz2317rD`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const tripMainHeaderElement = document.querySelector(`.trip-main`);
const tabsAndFiltersTitles = tripMainHeaderElement.querySelectorAll(`.trip-main__trip-controls h2`);
const menuTitleElement = tabsAndFiltersTitles[0];

// const siteMainElement = document.querySelector(`.page-body__page-main .trip-events`);

const filterModel = new FilterModel();
const tripPontModel = new TripPointModel();
const offerModel = new OfferModel();
const api = new Api(END_POINT, AUTHORIZATION);

const handleNewFormClose = () => {};

// let statisticComponent = null;

const handleSiteMenuClick = (menuItem) => {
  siteMenuComponent.setMenuItem(menuItem);
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      boardPresenter.init();
      boardPresenter.createNewPoint(handleNewFormClose);
      // console.log(siteMenuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`));
      // siteMenuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`).disabled = true;
      break;
    case MenuItem.TABLE:
      // Перейти на страницу со списком точек маршрута, если она не открыта
      break;
    case MenuItem.STATISTICS:
      // Перейти на страницу со статистикой, если она не открыта
      break;
  }
};

const siteMenuComponent = new SiteMenuView();
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
render(menuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);

const filterTitleComponent = tabsAndFiltersTitles[1];
const filterPresenter = new FilterPresenter(filterTitleComponent, filterModel, tripPontModel);
filterPresenter.init();

const boardContainer = document.querySelector(`.trip-events`);
const boardPresenter = new BoardPresenter(boardContainer, tripPontModel, offerModel, filterModel, api);

const getInitDataFromServer = async (firstFun, secondFun) => {
  await firstFun()
    .then((offers) => {
      offerModel.setOffers(offers);
    })
    .catch(() => {
      throw new Error(`Can't get offers`);
    });

  await secondFun()
    .then((points) => {
      tripPontModel.setTripPoints(UpdateType.INIT, points);
    })
    .catch(() => {
      tripPontModel.setTripPoints(UpdateType.INIT, []);
      throw new Error(`Can't get trip points`);
    });
};

const getOffersFromServer = () => {
  return api.getOffers();
};

const getPointsFromServer = () => {
  return api.getPoints();
};

getInitDataFromServer(getOffersFromServer, getPointsFromServer).then(() => {});

boardPresenter.init();
