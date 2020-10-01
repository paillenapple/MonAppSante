import { format } from "date-fns";

const formatDate = (date, pattern="dd/MM/yyyy") => {
  return format(new Date(date), pattern);
};

const sortAlphabetically = (array, criteria) => {
  const toBeSorted = array.slice();
  return toBeSorted.sort((a, b) => {
    if (a[criteria] < b[criteria]) return -1;
      else if (a[criteria] > b[criteria]) return 1;
      return 0;
  })
}

export { formatDate, sortAlphabetically};
