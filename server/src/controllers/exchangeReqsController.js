const exchangeReqsService = require('../services/exchangeReqsService');

const getAssetsList = async (req, res) => {
    try {
        const assetsList = await exchangeReqsService.getAssetsList();
        res.json(assetsList);
    } catch (error) {
        console.log("Exchange Reqs Controller level error");
        res.status(500).json({ message: 'Error (controller) fetching assets list', error: error.message });
    }
};

module.exports = {
    getAssetsList
}
