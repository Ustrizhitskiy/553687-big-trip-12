import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartElement from "./smart";
import {ACTIVITY_EVENTS, TRANSFER_EVENTS} from "../const";

const BAR_HEIGHT = 55;

const getDurationInHours = (milliseconds) => {
  const timeInMinutes = Math.trunc(milliseconds / 1000 / 60);
  const days = Math.trunc(timeInMinutes / 1440);
  const hours = Math.trunc((timeInMinutes - days * 1440) / 60) + days * 24;

  return `${hours > 0 ? hours : 0}`.trim();
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const getOverallBillByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  return pointsByType.length > 0 ? pointsByType.map((point) => point.basePrice).reduce(reducer) : 0;
};

const getTimesCountByType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

const getDurationByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);
  return pointsByType.length > 0 ? pointsByType.map((point) => point.dateTo - point.dateFrom).reduce(reducer) : 0;
};

const renderMoneyChart = (moneyCtx, points) => {
  moneyCtx.height = BAR_HEIGHT * 4;

  const allEvenType = [...TRANSFER_EVENTS, ...ACTIVITY_EVENTS];
  const billsByType = new Map();
  for (const type of allEvenType) {
    billsByType[type] = getOverallBillByType(points, type);
  }

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK_IN`, `SIGHTSEEING`, `RESTAURANT`],
      datasets: [{
        data: [billsByType[`taxi`], billsByType[`bus`], billsByType[`train`], billsByType[`ship`],
          billsByType[`transport`], billsByType[`drive`], billsByType[`flight`], billsByType[`check-in`],
          billsByType[`sightseeing`], billsByType[`restaurant`]],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, points) => {
  transportCtx.height = BAR_HEIGHT * 4;

  const allEvenType = [...TRANSFER_EVENTS, ...ACTIVITY_EVENTS];
  const timesCountByType = new Map();
  for (const type of allEvenType) {
    timesCountByType[type] = getTimesCountByType(points, type);
  }

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK_IN`, `SIGHTSEEING`, `RESTAURANT`],
      datasets: [{
        data: [timesCountByType[`taxi`], timesCountByType[`bus`], timesCountByType[`train`], timesCountByType[`ship`],
          timesCountByType[`transport`], timesCountByType[`drive`], timesCountByType[`flight`], timesCountByType[`check-in`],
          timesCountByType[`sightseeing`], timesCountByType[`restaurant`]],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, points) => {
  timeSpendCtx.height = BAR_HEIGHT * 4;

  const allEvenType = [...TRANSFER_EVENTS, ...ACTIVITY_EVENTS];
  const timesSpendByType = new Map();
  for (const type of allEvenType) {
    timesSpendByType[type] = getDurationInHours(getDurationByType(points, type));
  }

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`TAXI`, `BUS`, `TRAIN`, `SHIP`, `TRANSPORT`, `DRIVE`, `FLIGHT`, `CHECK_IN`, `SIGHTSEEING`, `RESTAURANT`],
      datasets: [{
        data: [timesSpendByType[`taxi`], timesSpendByType[`bus`], timesSpendByType[`train`], timesSpendByType[`ship`],
          timesSpendByType[`transport`], timesSpendByType[`drive`], timesSpendByType[`flight`], timesSpendByType[`check-in`],
          timesSpendByType[`sightseeing`], timesSpendByType[`restaurant`]],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val} H`
        }
      },
      title: {
        display: true,
        text: `TIME_SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<div class="page-body__container">
      <section class="statistics" style="margin-left: 100px">
        <h2>Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>
    </div>`
  );
};

export default class StatisticsView extends SmartElement {
  constructor(points) {
    super();

    this._data = {
      points
    };

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpendChart = null;
    }

    const {points} = this._data;
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._transportChart = renderTransportChart(transportCtx, points);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, points);
  }
}
