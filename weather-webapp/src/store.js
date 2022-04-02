import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, mapKeysToCamelCase  } from './utils';
import { setCache, getCache } from './utils/cache';
import { getDatetimeData } from './utils/datetime';

const Cache = {
  timer: null,
};

export const Context = React.createContext(null);

export const Store = (props = {}) => {
  const { children } = props;
  
  const [position, setPosition] = useState({
    city: '',
    country: '',
  });

  const [feature, setFeature] = useState({
    // 温度
    temperature: '0',
    // 降水量
    precipitation: '0.0',
    // 湿度
    humidity: '0.0',
    // 风速
    windPower: '0级',
    // 天气
    weather: '多云',
    // 体感
    bodytempInfo: '',
    // 15日天气预测
    dayForecast: [],
    // 24小时天气预测
    hourForecast: [],
  });

  const [time, setTime] = useState({
    week: '周一',
    hour12: '0 am',
    hours: 0,
  });

  const updateWeatherData = useCallback(async (city = '杭州') => {
    let result = await fetchWeatherData(city);
    result = mapKeysToCamelCase(result);
    const newFeature = {
      feature,
      ...result.weather,
      dayForecast: result['15DayForecast']?.info || [],
      hourForecast: result['24HourForecast']?.info || [],
    };
    setFeature(newFeature);
    setPosition(result.position);
    setCache('feature', newFeature, true);
    setCache('position', result.position, true);
  }, []);

  const updateTimeData = useCallback(() => {
    setTime(getDatetimeData());
  }, []);

  useEffect(() => {
    Cache.timer = window.setInterval(() => {
      updateTimeData();
      updateWeatherData(position.city);
    }, 60 * 1000);

    const feature = getCache('feature', true);
    const position = getCache('position', true);
    if (position && feature) {
      setFeature(feature);
      setPosition(position);
      updateWeatherData(position.city);
    } else {
      updateWeatherData('杭州');
    }
    
    updateTimeData();
  }, [updateTimeData, updateWeatherData]);

  return (
    <Context.Provider value={{ feature, time, position, updateWeatherData, updateTimeData }}>
      { children }
    </Context.Provider>
  );
};
