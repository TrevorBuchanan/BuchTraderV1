import React, { useState, useEffect } from 'react';
import SeriesChart from './shared/chart';

import {
  getCoinbaseProductsList,
  getCoinbaseProductHistory,
  getCoinbaseProductStats,
  getCoinbaseProductInfo,
  makeEngineStep,
  getEngineStatus,
} from '../api'

const TARGET_PRODUCT = 'BTC-USD';
const UPDATE_TIME = 2; // In seconds

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchStepAndStatus = async () => {
  //     try {
  //       // Make the step call
  //       await makeEngineStep(TARGET_PRODUCT);

  //       // Fetch the status
  //       const engineData = await getEngineStatus();

  //       // TEMP
  //       const tempData = await getCoinbaseProductInfo(TARGET_PRODUCT);
  //       console.log(tempData);
  //       // TEMP

  //       // Extract the relevant data (e.g., price)
  //       const price = engineData.price;
  //       const profitLoss = engineData.profitLoss;
  //       const longLossLimit = engineData.longLossLimit;
  //       const shortLossLimit = engineData.shortLossLimit;
  //       const actions = engineData.actions;
  //       console.log(actions);
  //       console.log(profitLoss);

  //       // Update the data for the chart
  //       setData([
  //         { name: 'Price', value: price },
  //         { name: 'Long Loss Limit', value: longLossLimit },
  //         { name: 'Short Loss Limit', value: shortLossLimit },
  //       ]);
  //     } catch (err) {
  //       console.error('Error in step or status:', err);
  //     }
  //   };

  //   // Set an interval to fetch data regularly
  //   const interval = setInterval(fetchStepAndStatus, UPDATE_TIME * 1000);

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    (async () => {
      try {
        const tempData = await getCoinbaseProductInfo(TARGET_PRODUCT);
        console.log(tempData);
      } catch (err) {
        console.error('Error in step or status:', err);
      }
    })(); 
  }, []);

  return (
    <div style={{ margin: '100px' }}>
      <SeriesChart newValues={data} />
    </div>
  );
}

export default App;
