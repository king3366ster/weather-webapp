import homeIcon from './res/icons/nav-home.svg';
import rainIcon from './res/icons/weather-info/rainfall.svg';
import humidityIcon from './res/icons/weather-info/humidity.svg';
import windIcon from './res/icons/weather-info/wind.svg';
import rainIconS from './res/icons/weather-info/rainfall-s.svg';
import humidityIconS from './res/icons/weather-info/humidity-s.svg';
import windIconS from './res/icons/weather-info/wind-s.svg';

export const ServerConfig = {
  // serverUrl: 'http://127.0.0.1:8001'
  serverUrl: 'http://cs.unicornhunter.cn:8001'
};

export const navBars = [
  {
    type: 'home',
    icon: homeIcon,
  },
];

export const WEATHER_INFO_MAP = {
  rainfall: {
    icon: rainIcon,
    iconS: rainIconS,
    text: '降水量',
    background: 'rgba(101, 142, 217, 0.1)',
    color: '#658ED9',
  },
  humidity: {
    icon: humidityIcon,
    iconS: humidityIconS,
    text: '湿度',
    background: 'rgba(216, 97, 145, 0.1)',
    color: '#D86191',
  },
  wind: {
    icon: windIcon,
    iconS: windIconS,
    text: '风速',
    background: 'rgba(94, 79, 193, 0.1)',
    color: '#5E4FC1',
  },
}