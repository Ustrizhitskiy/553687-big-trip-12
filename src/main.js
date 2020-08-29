import {generateEvent} from "./mock/eventMock";
import TripPresenter from "./presenter/trip-presenter";

const EVENT_COUNT = 35;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripPresenter = new TripPresenter();
tripPresenter.init(events);
