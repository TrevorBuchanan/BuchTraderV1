const v3Reqs = require('../configs/v3Reqs');

const getProductInfo = async (product) => {
    try {
        const response = await v3Reqs.makeRequest('GET', `/products/${product}`); 
        return response.data || response; 
    } catch (error) {
        throw new Error(`Error (service) fetching product ${product}: ${error.message}`);
    }
};

module.exports = {
    getProductInfo,
};
