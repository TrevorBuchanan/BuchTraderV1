import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SeriesChart = ({ newValues }) => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        id: 'realtime',
        height: 350,
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
        range: 30000, // example range for 10 seconds
      },
      legend: {
        show: true
      },
    }
  });

  useEffect(() => {
    if (newValues && newValues.length > 0) {
      const timestamp = new Date().getTime();

      setState(prevState => {
        // Create a copy of the existing series
        let updatedSeries = [...prevState.series];

        // Loop through each name-value pair in newValues
        newValues.forEach(({ name, value }) => {
          // Find the existing series by name
          const seriesIndex = updatedSeries.findIndex(series => series.name === name);

          if (seriesIndex !== -1) {
            // If the series exists, append the new value
            updatedSeries[seriesIndex].data = [
              ...updatedSeries[seriesIndex].data,
              { x: timestamp, y: value }
            ];
          } else {
            // If the series does not exist, create a new one
            updatedSeries.push({
              name,
              data: [{ x: timestamp, y: value }]
            });
          }
        });

        return {
          ...prevState,
          series: updatedSeries
        };
      });
    }
  }, [newValues]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" />
      </div>
    </div>
  );
};

export default SeriesChart;
