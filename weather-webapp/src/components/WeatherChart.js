import React from 'react';
import ReactECharts from 'echarts-for-react';


const ChartComponent = (props = {}) => {
  const { hourForecast = [] } = props;
  const xData = hourForecast.map(item => {
    const hours = item.hour.substr(8);
    if (+hours > 12) {
      return (+hours - 12) + ' pm';
    }
    return hours + ' am'
  });
  const yData = hourForecast.map(item => +item.temperature);
  const option = {
    color: ['#E9C939'],
    grid: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: false
    },
    xAxis : [
      {
        type : 'category',
        boundaryGap : false,
        data : xData,
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'24小时文档',
        type:'line',
        areaStyle: {normal: {}},
        data: yData,
      }
    ]
  };

  return <ReactECharts
    option={option}
    style={{ width: '100%', height: '100%' }}
  />;
};

export default ChartComponent;
