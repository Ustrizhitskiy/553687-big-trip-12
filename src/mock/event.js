import {TRANSFER_EVENTS, ACTIVITY_EVENTS} from "../const";
import {generateOffer} from "./offer";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Генерируем тип точки маршрута
const generateTypeEvent = () => {
  const typeEvent = TRANSFER_EVENTS.concat(ACTIVITY_EVENTS);

  const randomIndex = getRandomInteger(0, typeEvent.length - 1);

  return typeEvent[randomIndex];
};

// Генерируем город точки маршрута
const generateCityDestination = () => {
  const routeCities = [`Amsterdam`, `Prague`, `Milan`, `Chamonix`, `Geneva`];

  const randomIndex = getRandomInteger(0, routeCities.length - 1);

  return routeCities[randomIndex];
};

// Генерируем дату начала точки маршрута
const generateStartAndEndDate = () => {
  const startDate = new Date();
  startDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59), getRandomInteger(0, 59), 1);

  let endDate;
  do {
    endDate = new Date();
    endDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59), getRandomInteger(0, 59), 999);
  } while (endDate.getTime() <= startDate.getTime());

  return [startDate, endDate];
};

// Генерируем стоимость точки маршрута без дополнителных опций
const generateCostEvent = () => {
  return getRandomInteger(10, 1000);
};

// Генерируем описание и фото пункта назначения
const generateDestinationInfo = () => {
  const originalText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const sentenceList = originalText.split(`.`);
  sentenceList.pop();

  let generatedText = [];
  const sentenceRandomCount = getRandomInteger(1, 5);
  for (let i = 0; i < sentenceRandomCount; i++) {
    const randomIndex = getRandomInteger(0, sentenceList.length - 1);

    generatedText.push(`${sentenceList[randomIndex]}.`);
  }
  const generatedDescription = generatedText.join(``);

  let generatedPhotosSrc = [];
  const photoCount = getRandomInteger(0, 5);
  for (let i = 0; i < photoCount; i++) {
    generatedPhotosSrc.push(`http://picsum.photos/248/152?r=${Math.random()}`)
  }

  return {
    description: generatedDescription,
    photosSrc: generatedPhotosSrc,
  };
};

export const generateEvent = () => {
  const generatedStartAndEndDates = generateStartAndEndDate();

  return {
    routePointType: generateTypeEvent(),
    city: generateCityDestination(),
    startDate: generatedStartAndEndDates[0],
    endDate: generatedStartAndEndDates[1],
    cost: generateCostEvent(),
    offers: generateOffer(),
    destinationInfo: generateDestinationInfo(),
  };
};
