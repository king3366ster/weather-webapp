import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../store';

import './main.scss';
import logo from '../res/icons/logo.png';

import dotIcon from '../res/icons/dot.svg';

import WeatherIcon from '../components/WeatherIcon';

import { navBars, WEATHER_INFO_MAP } from '../configs';

const MidCard = () => {
  const { feature, time, position, updateWeatherData } = useContext(Context);
  const [newCity, setNewCity] = useState('杭州');
  const [changeCity, setCityChange] = useState(false);

  return (
    <div className="mid-card">
      <div className="change-city" onClick={() => {
        setCityChange(true)
      }}>切换城市</div>
      <div className="weather-icon">
        <WeatherIcon weather = { feature.weather } />
      </div>
      <div className="address" onClick={() => {
          setCityChange(true)
      }}>
        {
          changeCity ? (
            <div>
              <input type="text" onChange={(event) => {
                setNewCity(event.target.value);
              }}></input>
              <span className="btn" onClick={(event) => {
                setCityChange(false);
                if (newCity) {
                  updateWeatherData(newCity);
                }
                setNewCity('');
                event.stopPropagation();
              }}>保存</span>
            </div>
          ) : (
            <div>
              { position.country } { position.city }
            </div>
          )
        }
      </div>
      <div className="body">
        <div className="left">
          <div className="tempreature">
            <span>{ feature.temperature }</span>
            <span style={{ margin: '6px 2px 0', fontSize: '14px', lineHeight: '17px' }}>℃</span>
          </div>
          <div className="clock">
            <span>{ time.week }</span>
            <span>{ time.hour12 }</span>
          </div>
        </div>
        <div className="right">
          {
            feature.bodytempInfo ? (
              <div className="tip tip1">{ feature.bodytempInfo }</div>
            ) : null
          }
          {
            feature.weather ? (
              <div className="tip tip2">{ feature.weather }</div>
            ) : null
          }
        </div>
      </div>
      <Link to='/detail'>
        <div className="detail-btn">
          详情
        </div>
      </Link>
    </div>
  )
}

const WeatherInfoRow = (props = {}) => {
  const { type = 'rainfall', value } = props
  const infoSymbol = WEATHER_INFO_MAP[type]
  return (
    <div className="weather-info_row">
      <div>
        <img className="icon" src={infoSymbol.icon} alt={infoSymbol.text}/>
        <span className="label">{infoSymbol.text}</span>
      </div>
      <div>{value}</div>
    </div>
  )
}

const WeatherInfo = () => {
  const { feature } = useContext(Context);
  return (
    <div className="weather-info">
      <WeatherInfoRow type="rainfall" value={feature.precipitation && (feature.precipitation + '%')} />
      <WeatherInfoRow type="humidity" value={feature.humidity && (feature.humidity + '%')} />
      <WeatherInfoRow type="wind" value={feature.windPower || ''} />
      <img className="dot" style={{top: '20px', right: '-60px', width: '5px'}} src={dotIcon} alt="dot"/>
      <img className="dot" style={{bottom: '20px', left: '-40px', width: '4px'}} src={dotIcon} alt="dot"/>
      <img className="dot" style={{bottom: '-10px', left: '-70px', width: '11px'}} src={dotIcon} alt="dot"/>
      <img className="dot" style={{bottom: '-40px', left: '-10px', width: '5px'}} src={dotIcon} alt="dot"/>
    </div>
  );
}

const NavBar = () => {
  return (
    <div className="nav-bar">
      {
        navBars.map((item) => (<img className="nav-bar-icon" src={item.icon} alt={item.type} />))
      }
    </div>
  )
}

const Page = () => {
  const { updateWeatherData } = useContext(Context);
  return (
    <div className="main-container">
      <img src={logo} className="logo" alt="logo" onClick={ updateWeatherData } />
      <img className="dot" style={{top: '10px', right: '16%', width: '8px'}} src={dotIcon} alt="dot"/>
      <img className="dot" style={{top: '30px', right: '40%', width: '5px'}} src={dotIcon} alt="dot"/>
      <MidCard />
      <WeatherInfo />
      <NavBar />
    </div>
  )
};

export default Page;