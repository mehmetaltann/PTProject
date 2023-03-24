import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

export const dateFormatMonths = (date) => {
  return moment(date).format("MM-YYYY");
};

export const dateFormatYears = (date) => {
  return moment(date).format("YYYY");
};

export const sortDate = (dateA, dateB, direction = "asc") => {
  const formats = ["DD-MM-YYYY"]; // can be several
  return (
    (moment(dateA, formats).isBefore(moment(dateB, formats))
      ? -1
      : moment(dateA, formats).isAfter(moment(dateB, formats))
      ? 1
      : 0) * (direction === "asc" ? 1 : -1)
  );
};

export const uniqListFunc = (arr, att, track = new Set()) =>
  arr.filter((cat) => (track.has(cat[att]) ? false : track.add(cat[att])));
