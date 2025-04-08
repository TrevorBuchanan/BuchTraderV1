import React, { useState, useEffect } from 'react';

import {
  getCoinbaseAssetsList
} from '../api'

const TARGET_ASSET = 'BTC-USD';

function App() {
  const [assets, setAssets] = useState([]);

  // Fetch assets
  useEffect(() => {
    // To show if wanted:
    // {assets.length > 0 ? (
    //   assets.map((asset, index) => (
    //     <p key={index}>{asset.id}</p>
    //   ))
    // ) : (
    //   <p>No assets available</p>
    // )}
    const fetchAssets = async () => {
      try {
        const data = await getCoinbaseAssetsList();
        console.log(data);
        const assets = data;
        setAssets(assets);
      } catch (err) {
        console.error('Error fetching assets list:', err);
      }
    };
    fetchAssets();
  }, []);



  return (
    <div style={{ margin: '100px'}}>
      <p> Temp </p>
    </div>
  );
}

export default App;
