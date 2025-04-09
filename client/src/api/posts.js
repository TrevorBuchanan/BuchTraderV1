import axios from "axios";

const getCoinbaseProductsList = async () => {
    try {
        const response = await axios.get(`/api/coinbase/products-list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products list:', error);
    }
};

const getCoinbaseProductHistory = async (product, numTimePoints, granularity) => {
    try {
        const params = {
            'product': product,
            'numTimePoints': numTimePoints,
            'granularity': granularity
        }
        const response = await axios.get(`/api/coinbase/product-history`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching product history:', error);
    }
};

const getCoinbaseProductInfo = async (product) => {
    try {
        const params = { 'product': product }
        const response = await axios.get(`/api/coinbase/product-info`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching product info:', error);
    }
};

const makeEngineStep = async (product) => {
    try {
        const params = { 'product': product }
        const response = await axios.post(`/api/engine/step`, { params });
        return response.data;
    } catch (error) {
        console.error('Error making engine step:', error);
    }
}

const getEngineStatus = async () => {
    try {
        const response = await axios.get(`/api/engine/status`);
        return response.data;
    } catch (error) {
        console.error('Error getting engine status:', error);
    }
}

export {
    getCoinbaseProductsList,
    getCoinbaseProductHistory,
    getCoinbaseProductInfo,
    makeEngineStep,
    getEngineStatus,
}