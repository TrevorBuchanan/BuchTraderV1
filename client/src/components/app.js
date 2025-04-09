import React, { useState, useEffect } from 'react';
import RealTimeChart from './shared/chart';

import {
  getCoinbaseProductsList,
  getCoinbaseProductHistory,
  getCoinbaseProductStats,
  makeEngineStep,
  getEngineStatus,
} from '../api'

const TARGET_PRODUCT = 'BTC-USD';

function App() {

  useEffect(() => {
    const stepStatus = async () => {
      try {
        await makeEngineStep(TARGET_PRODUCT);

        const data = await getEngineStatus();
        console.log(data);
      } catch (err) {
        console.error('Error in step or status:', err);
      }
    };
    stepStatus();
  }, []);

  return (
    <div style={{ margin: '100px' }}>
      {/* <RealTimeChart /> */}

    </div>
  );
}

export default App;
