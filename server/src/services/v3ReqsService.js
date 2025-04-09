const v3Reqs = require('../configs/v3Reqs');

const getProduct = async (product) => {
    try {
        const response = await v3Reqs.makeRequest('GET', `/products/${product}`); // Dynamically include product_id
        return response.data || response; // Return the relevant part of the response
    } catch (error) {
        throw new Error(`Error (service) fetching product ${product}: ${error.message}`);
    }
};

module.exports = {
    getProduct,
};
