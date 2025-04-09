const exchangeReqs = require('../configs/exchangeReqs');

// Function to get all available products (trading pairs)
const getProductsList = async () => {
    try {
        const response = await exchangeReqs.makeExchangeRequest('GET', '/products');
        return response.data || response;
    } catch (error) {
        throw new Error(`Error (service) fetching products: ${error.message}`);
    }
};

const getProductHistory = async (product, startTime, endTime, granularity) => {
    try {
        const params = {
            'granularity': granularity,
            'start': startTime,
            'end': endTime
        }
        const response = await exchangeReqs.makeExchangeRequest('GET', `/products/${product}/candles`, params);
        return response.data || response;
    } catch (error) {
        throw new Error(`Error (service) fetching products: ${error.message}`);
    }
};

const getProductInfo = async (product) => {
    try {
        const response = await exchangeReqs.makeExchangeRequest('GET', `/products/${product}`);
        return response.data || response;
    } catch (error) {
        throw new Error(`Error (service) fetching product info: ${error.message}`);
    }
};


module.exports = {
    getProductsList,
    getProductHistory,
    getProductInfo
};