const moment = require("moment");

const prevThreeYearFirstDay = moment()
  .subtract(36, "months")
  .startOf("month")
  .toDate();
const prevYearFirstDay = moment()
  .subtract(12, "months")
  .startOf("month")
  .toDate();
const prevSixMonthFirstDay = moment()
  .subtract(6, "months")
  .startOf("month")
  .toDate();
const prevThreeMonthFirstDay = moment()
  .subtract(3, "months")
  .startOf("month")
  .toDate();
const prevMonthLastDay = moment().subtract(1, "months").endOf("month").toDate();
const thisMonthFirstDay = moment().startOf("month").toDate();
const thisMonthLastDay = moment().endOf("month").toDate();
const birthday = new Date("1987-09-09T07:45:00Z");

const calculateSum = (array, property) => {
  let sum = 0;
  array.forEach((element) => {
    sum += element[property];
  });
  return sum;
};

module.exports = {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevMonthLastDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
  calculateSum,
  birthday,
};
