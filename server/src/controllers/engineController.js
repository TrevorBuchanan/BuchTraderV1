const engineService = require('../services/engineService');
const exchangeReqsService = require('../services/exchangeReqsService');

const makeStep = async (req, res) => {
    try {
        const { product } = req.body;
        const productStats = await exchangeReqsService.getProductStats(product);
        const price = productStats.last;
        await engineService.makeStep(price);
        res.status(200).json({ message: "Backend step successfully completed" });
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
