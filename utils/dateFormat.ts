export const dateFormat = (date: string | Date) => {
  let dateObj = new Date(date);
  let month = String(dateObj.getMonth() + 1);
  let day = String(dateObj.getDate());
  let year = String(dateObj.getFullYear());
  if (Number(month) < 10) {
    month = `0${month}`;
  }
  if (Number(day) < 10) {
    day = `0${day}`;
  }
  let newdate = year + "-" + month + "-" + day;
  if (date) {
    return newdate;
  } else return "";
};
