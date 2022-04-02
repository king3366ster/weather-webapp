import React, { useEffect, useState } from 'react';
import { checkDayNight } from '../utils';

import dayClouds from '../res/icons/weather-icon/day-clouds.svg';
import dayRain from '../res/icons/weather-icon/day-rain.svg';
import daySnow from '../res/icons/weather-icon/day-snow.svg';
import dayStorm from '../res/icons/weather-icon/day-storm.svg';
import daySun from '../res/icons/weather-icon/day-sun.svg';
import dayWind from '../res/icons/weather-icon/day-wind.svg';
import nightClouds from '../res/icons/weather-icon/night-clouds.svg';
import nightSun from '../res/icons/weather-icon/night-moon.svg';
import nightRain from '../res/icons/weather-icon/night-rain.svg';
import nightSnow from '../res/icons/weather-icon/night-snow.svg';
import nightStorm from '../res/icons/weather-icon/night-storm.svg';
import nightWind from '../res/icons/weather-icon/night-wind.svg';
// import rainMiddle from '../res/icons/weather-icon/rain-middle.svg';
// import rainSmall from '../res/icons/weather-icon/rain-small.svg';
// import rain from '../res/icons/weather-icon/rain.svg';
// import snow from '../res/icons/weather-icon/snow.svg';
// import storm from '../res/icons/weather-icon/storm.svg';

const WeatherMapDay = {
  '晴': daySun,
  '阴': dayWind,
  '多云': dayClouds,
  '雨': dayRain,
  '小雨': dayRain,
  '中雨': dayRain,
  '大雨': dayRain,
  '暴雨': dayRain,
  '阵雨': dayRain,
  '雪': daySnow,
  '小雪': daySnow,
  '中雪': daySnow,
  '大雪': daySnow,
  '雷雨': dayStorm,
}

const WeatherMapNight = {
  '晴': nightSun,
  '阴': nightWind,
  '多云': nightClouds,
  '雨': nightRain,
  '小雨': nightRain,
  '中雨': nightRain,
  '大雨': nightRain,
  '暴雨': nightRain,
  '阵雨': nightRain,
  '雪': nightSnow,
  '小雪': nightSnow,
  '中雪': nightSnow,
  '大雪': nightSnow,
  '雷雨': nightStorm,
}

const IconComponent = (props = {}) => {
  const { weather = '', hour } = props; 
  const [ imgSrc, setImgSrc ] = useState(null);
  useEffect(() => {
    const dayNight = checkDayNight(hour);
    if (dayNight === 'day') {
      setImgSrc(WeatherMapDay[weather]);
    } else {
      setImgSrc(WeatherMapNight[weather]);
    }
  }, [weather, hour]);

  return (
    <img style={{ display: 'block', width: '100%', height: 'auto', }} src={imgSrc} alt={weather} />
  );
};

export default IconComponent;
