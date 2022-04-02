import React, { useContext, useState } from 'react';
import { Context } from '../store';

import backIcon from '../res/icons/back.svg';
import './detail.scss';
import WeatherIcon from '../components/WeatherIcon';
import WeatherChart from '../components/WeatherChart';
import { WEATHER_INFO_MAP } from '../configs';
import { getWeek } from '../utils/datetime';

const WeatherTip = (props = {}) => {
  const { type = 'rainfall', value } = props
  const infoSymbol = WEATHER_INFO_MAP[type]
  return (
    <div className="tip" style={{ background: infoSymbol.background, color: infoSymbol.color }}>
      <img className="icon" src={infoSymbol.iconS} alt={infoSymbol.text}/>
      <div>{value}</div>
    </div>
  );
};

const TempItem = (props = {}) => {
  const { item } = props;
  const hours = item.hour.substr(8);
  let hour12 = +hours + ' am';
  if (+hours > 12) {
    hour12 = (+hours - 12) + ' pm';
  }
  return (
    <div className="temp-item">
      <div className="label">
      {item.temperature} <span className="symbol">℃</span>
      </div>
      <div className="desc">{ hour12 }</div>
    </div>
  );
};

const WeekItem = (props = {}) => {
  const { item } = props;
  return (
    <div className="week_item">
      <div className="left">{ getWeek(item.date) }</div>
      <div className="mid">
        <WeatherIcon weather={item.weatherDay}/>
      </div>
      <div className="right">
        <span>
          {item.temperatureDay}
          <span className="symbol">℃</span>
        </span>
        <span style={{ marginLeft: '10px', color: 'rgba(51, 40, 33, 0.5)' }}>
          {item.temperatureNight}
          <span className="symbol">℃</span>
        </span>
      </div>
    </div>
  );
};

const Page = () => {
  const { feature, position } = useContext(Context);

  const tempItemData = feature.hourForecast.filter((item) => {
    if (+item.hour % 3 === 0) {
      return true;
    }
    return false;
  });
  return (
    <div className="detail-container">
      <div className="top">
        <div className="weather-icon">
          <WeatherIcon weather = { feature.weather } />
        </div>
        <img src={backIcon} alt="back" onClick={() => { window.history.back(); }} />
        <div className="city">
          <div>{ position.country }</div>
          <div>{ position.city }</div>
        </div>
        <div className="tempreature">
          <span>{ feature.temperature }</span>
          <span style={{ margin: '12px 2px 0', fontSize: '24px', lineHeight: '17px' }}>℃</span>
        </div>
        <div className="tips">
          <WeatherTip type="rainfall" value={feature.precipitation && (feature.precipitation + '%')} />
          <WeatherTip type="humidity" value={feature.humidity && (feature.humidity + '%')} />
          <WeatherTip type="wind" value={feature.windPower || ''} />
        </div>
      </div>
      <div className="chart">
        <div className="temp-chart">
          <WeatherChart hourForecast = { feature.hourForecast } />
        </div>
        <div className="temp-list">
          {
            tempItemData.map(item => (
              <TempItem key={item.hour} item={item} />
            ))
          }
        </div>
      </div>
      <div className="week">
        {
          feature.dayForecast.map(item => (
            <WeekItem key={item.date} item={item} />
          ))
        }
      </div>
    </div>
  )
};

export default Page;