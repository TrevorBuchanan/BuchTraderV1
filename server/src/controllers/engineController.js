const engineService = require('../services/engineService');
const exchangeReqsService = require('../services/exchangeReqsService');

const makeStep = async (req, res) => {
    try {
        const { product } = req.query;
        const productInfo = await exchangeReqsService.getProductInfo(product);
        const price = productInfo.price;

        await engineService.makeStep(price);
    } catch (error) {
        console.error({ message: 'Error (controller) making step', error: error.message })
    }
};

const getStatus = async (req, res) => {
    try {
        const status = await engineService.getStatus();
        res.json(status);
    } catch (error) {
        console.error({ message: 'Error (controller) fetching product history', error: error.message })
    }
};

module.exports = {
    makeStep,
    getStatus
}
