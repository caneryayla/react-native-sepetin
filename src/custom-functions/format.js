export const formatLira = (n) => {
  return parseFloat(n)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1.")
    .replace(/\.(\d+)$/, ",$1");
};

export const formatDate = (date) => {
  const format = new Date(date);
  const result =
    format.getDate() +
    " / " +
    (format.getMonth() + 1) +
    " / " +
    format.getFullYear();

  return result;
};

export const formatDateWithHour = (date) => {
  const format = new Date(date);
  const result =
    format.getDate() +
    " / " +
    (format.getMonth() + 1) +
    " / " +
    format.getFullYear();

  return result;
};
