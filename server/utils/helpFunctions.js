const moment = require("moment");

const prevThreeYearFirstDay = moment().subtract(36, "months").startOf("month");
const prevYearFirstDay = moment().subtract(12, "months").startOf("month");
const prevSixMonthFirstDay = moment().subtract(6, "months").startOf("month");
const prevThreeMonthFirstDay = moment().subtract(3, "months").startOf("month");
const prevMonthLastDay = moment().subtract(1, "months").endOf("month");
const thisMonthFirstDay = moment().startOf("month");
const thisMonthLastDay = moment().endOf("month");

module.exports = {
  thisMonthLastDay,
  thisMonthFirstDay,
  prevMonthLastDay,
  prevThreeMonthFirstDay,
  prevSixMonthFirstDay,
  prevYearFirstDay,
  prevThreeYearFirstDay,
};
