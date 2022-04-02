const path = require('path');
const express = require('express');
const LRU = require('lru-cache');

const app = express();

const { getWeatherByBaidu } = require('./request');
// 加缓存以免百度反爬虫
const weatherCache = new LRU({
  max: 100,
  ttl: 1000 * 60,
  allowStale: false,
  // update the age of items on cache.get(), renewing their TTL
  // boolean, default false
  updateAgeOnGet: true,
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/weather', async (req, res, next) => {
  const { city } = req.query;
  if (!city) {
    res.end();
    return;
  }
  let result = weatherCache.get(city);
  if (!result) {
    console.log('miss cache ...')
    result = await getWeatherByBaidu(city);
    weatherCache.set(city, result);
  }
  // 该接口允许跨域
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.send(result);
});

app.listen(8001, () => {
  console.log('服务已启动，端口8001');
});
