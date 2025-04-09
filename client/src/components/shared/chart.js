import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [state, setState] = useState({
    series: [{
      data: []
    }],
    options: {
      chart: {
        id: 'realtime',
        height: 700,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: 10000, // example range for 10 seconds
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    }
  });

  const getNewSeries = (lastDate, range) => {
    const newDate = lastDate + range; // Update the time
    const newData = {
      x: newDate,
      y: Math.random() * 100 // Random value for illustration
    };
    return newData;
  };

  useEffect(() => {
    let lastDate = new Date().getTime(); // Use let instead of const for lastDate
    const intervalId = window.setInterval(() => {
      const newSeriesData = getNewSeries(lastDate, 1000); // 1000 ms interval (1 second)
      setState(prevState => {
        const newSeries = [...prevState.series[0].data, newSeriesData];
        return {
          ...prevState,
          series: [{
            data: newSeries
          }]
        };
      });

      lastDate = newSeriesData.x; // Now you can reassign lastDate

    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={700} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
