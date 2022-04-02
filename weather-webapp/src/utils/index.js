import { ServerConfig } from '../configs';

export const checkDayNight = (hours) => {
  if (typeof hours !== 'number') {
    const currTime = new Date();
    hours = currTime.getHours();
  }
  if (hours >= 19) {
    return 'night';
  }
  if (hours <= 5) {
    return 'night';
  }
  return 'day';
};

export const fetchWeatherData = async (city = '') => {
  const result = await fetch(
    `${ServerConfig.serverUrl}/api/weather?city=${encodeURIComponent(city)}`,
    {
      method: 'GET',
      mode: 'cors',
    },
  );
  return result.json();
};

export const toCamelCase = (str) => {
  return str.replace(/_[a-z]/g, (item) => item[1].toUpperCase());
};

export const mapKeysToCamelCase = (value, deep = true) => {
  let res: typeof value;
  if (Array.isArray(value) && value.length > 0) {
    res = [];
  } else if (value === null) {
    return null;
  } else if (typeof value === 'object' && Object.keys(value).length > 0) {
    res = {};
  } else {
    return value;
  }

  const keys = Object.keys(value);
  const { length } = keys;
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    let val = value[key];
    if (deep) {
      val = mapKeysToCamelCase(val);
    }
    const newKey = typeof key === 'string' ? toCamelCase(key) : key;
    res[newKey] = val;
  }
  return res;
};
