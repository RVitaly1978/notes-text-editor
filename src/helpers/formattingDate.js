const formattingDate = (dateStr, isTime = true) => {
  if (dateStr === undefined) {
    return 'no data';
  }

  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dayStr = day < 9 ? `0${String(day)}` : String(day);
  const monthStr = month < 9 ? `0${String(month)}` : String(month);
  const yearStr = String(year);
  const hoursStr = hours < 9 ? `0${String(hours)}` : String(hours);
  const minutesStr = minutes < 9 ? `0${String(minutes)}` : String(minutes);

  return isTime
    ? `${dayStr}.${monthStr}.${yearStr} ${hoursStr}:${minutesStr}`
    : `${dayStr}.${monthStr}.${yearStr}`;
};

export default formattingDate;
