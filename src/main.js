import {generateEvent} from "./mock/eventMock";
import Trip from "./presenter/trip";

const EVENT_COUNT = 35;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripPresenter = new Trip();
tripPresenter.init(events);
