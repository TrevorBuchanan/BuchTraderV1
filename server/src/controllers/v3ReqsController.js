const v3ReqsService = require('../services/v3ReqsService');


const getProductInfo = async (req, res) => {
    try {
        const { product } = req.query;
        const productInfo = await v3ReqsService.getProductInfo(product);
        res.json(productInfo);
    } catch (error) {
        console.error({ message: 'Error (controller) fetching product info', error: error.message })
        res.status(500).json({ message: 'Error (controller) fetching product info', error: error.message });
    }
};

module.exports = {
    getProductInfo,
}
