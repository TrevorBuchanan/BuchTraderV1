const exchangeReqs = require('../configs/exchangeReqs');

// Function to get all available assets (trading pairs)
const getAssetsList = async () => {
    try {
        const response = await exchangeReqs.makeExchangeRequest('GET', '/products');
        return response.data || response;
    } catch (error) {
        console.log("Exchange reqs service level error");
        throw new Error(`Error (service) fetching products: ${error.message}`);
    }
};

module.exports = {
    getAssetsList
};