// const request = require('request')
const https = require("https");

const formatData = (data) => {
  data = data.substr(data.indexOf('window.tplData = ') + 17);
  data = data.substring(0, data.indexOf(';</script>'));
  return data;
};

const getWeatherByBaidu = (city = '') => {
  const url = `https://weathernew.pae.baidu.com/weathernew/pc?query=${encodeURIComponent(city + '天气')}&srcid=4982`;
  return new Promise((resolve, reject) => {
    const req = https.get(url, function (res) {
      let chunk = ''
      res.on('data', (data) => {
        chunk += data;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          let result = formatData(chunk);
          return resolve(result);
        }
      })
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
}

module.exports = {
  getWeatherByBaidu,
};

// getWeatherByBaidu('杭州').then((data) => {
//   console.log(data)
// })
