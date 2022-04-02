const WeekMap = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
};

export const getDatetimeData = () => {
  const datetime = new Date();
  const hours = datetime.getHours();
  let showHour = hours + ' am';
  if (hours > 12) {
    showHour = (hours - 12) + ' pm';
  }
  return {
    week: WeekMap[datetime.getDay()],
    hour12: showHour,
    hours,
  }
};

export const getWeek = (datetime) => {
  datetime = new Date(datetime);
  return WeekMap[datetime.getDay()];
};
