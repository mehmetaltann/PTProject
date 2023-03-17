import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

export const uniqListFunc = (arr, att, track = new Set()) =>
  arr.filter((cat) => (track.has(cat[att]) ? false : track.add(cat[att])));
