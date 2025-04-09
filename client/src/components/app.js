import React, { useState, useEffect } from 'react';
import RealTimeChart from './shared/chart';

import {
  getCoinbaseProductsList,
  getCoinbaseProductHistory,
  getCoinbaseProductInfo,
  makeEngineStep,
  getEngineStatus,
} from '../api'

const TARGET_PRODUCT = 'BTC-USD';

function App() {
  // const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({});
  // const [productHistory, setProductHistory] = useState({})
  const [series, setSeries] = useState([]);

  // // Fetch products
  // useEffect(() => {
  //   // To show if wanted:
  //   // {products.length > 0 ? (
  //   //   products.map((product, index) => (
  //   //     <p key={index}>{product.id}</p>
  //   //   ))
  //   // ) : (
  //   //   <p>No products available</p>
  //   // )}
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await getCoinbaseProductsList();
  //       const products = data;
  //       setProducts(products);
  //     } catch (err) {
  //       console.error('Error fetching products list:', err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   // To show if wanted:

  //   const fetchProduct = async () => {
  //     try {
  //       const data = await getCoinbaseProductInfo(TARGET_PRODUCT);
  //       console.log(data);
  //       const product = data;
  //       setProduct(product);
  //     } catch (err) {
  //       console.error('Error fetching products list:', err);
  //     }
  //   };
  //   fetchProduct();
  // }, []);

  // useEffect(() => {
  //   // To show if wanted:

  //   const fetchProductHistory = async () => {
  //     try {
  //       const data = await getCoinbaseProductHistory(TARGET_PRODUCT, 350, 60);
  //       console.log(data);
  //       const product = data;
  //       setProduct(product);
  //     } catch (err) {
  //       console.error('Error fetching products list:', err);
  //     }
  //   };
  //   fetchProductHistory();
  // }, []);

  useEffect(() => {
    // To show if wanted:

    const stepStatus = async () => {
      try {
        const response = await makeEngineStep(TARGET_PRODUCT);
        console.log(response);

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
