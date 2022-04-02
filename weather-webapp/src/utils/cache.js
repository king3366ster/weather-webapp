
export const setCache = (key, value, json = false) => {
  if (json || typeof key !== 'string') {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.setItem(key, value);
  }
};

export const getCache = (key, json = false) => {
  let result = window.localStorage.getItem(key);
  if (json) {
    try {
      result = JSON.parse(result);
    } catch (e) {}
  }
  return result;
};
