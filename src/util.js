export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getOnlyTimeFromDate = (date) => {
  const stringDate = date.toLocaleString();
  const dateTime = stringDate.substring(11, stringDate.length - 6);

  return dateTime.length === 3 ? `0${dateTime}` : dateTime;
};

export const getFormattedDateString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = getOnlyTimeFromDate(date);

  return `${day}/${month}/${year} ${time}`;
};

export const getTimeFromStartToEnd = (startDate, endDate) => {
  const timeInMilliseconds = endDate.getTime() - startDate.getTime();
  const timeInMinutes = Math.trunc(timeInMilliseconds / 1000 / 60);
  const days = Math.trunc(timeInMinutes / 1440);
  const hours = Math.trunc((timeInMinutes - days * 1440) / 60);
  const minutes = timeInMinutes - days * 1440 - hours * 60;

  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`.trim();
};
