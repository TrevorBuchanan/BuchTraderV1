const exchangeReqsService = require('../services/exchangeReqsService');

const getProductsList = async (req, res) => {
    try {
        const productsList = await exchangeReqsService.getProductsList();
        res.json(productsList);
    } catch (error) {
        console.log("Exchange reqs controller level error");
        res.status(500).json({ message: 'Error (controller) fetching products list', error: error.message });
    }
};

const getProductHistory = async (req, res) => {
    MAX_FETCH = 300  // 300 is max amount of time points to fetch in one call from Coinbase
    try {
        const { product, numTimePoints, granularity } = req.query;

        const secondsBack = granularity * numTimePoints;
        const endTime = Date.now(); // represents the number of milliseconds since January 1, 1970 (Unix epoch)
        let startTime = endTime - secondsBack * 1000;
        let accumulator = [];

        while (startTime < endTime) {
            // Update time parameters for the current batch
            let batchEndTime = new Date(startTime + (granularity * MAX_FETCH * 1000));
        
            // Ensure batchEndTime doesn't go beyond the endTime
            if (batchEndTime > endTime) {
                batchEndTime = endTime;
            }
        
            console.log("Start:")
            console.log(startTime);
            console.log("End:")
            console.log(batchEndTime);

            const productHistory = await exchangeReqsService.getProductHistory(product, startTime, batchEndTime, granularity);
            
            accumulator.push(...productHistory);
            startTime = batchEndTime
        }
        accumulator.sort((a, b) => a[0] - b[0]);
        res.json(accumulator);
    } catch (error) {
        console.error({ message: 'Error (controller) fetching product history', error: error.message })
        res.status(500).json({ message: 'Error (controller) fetching product history', error: error.message });
    }
};

const getProductInfo = async (req, res) => {
    try {
        const { product } = req.query;
        const productInfo = await exchangeReqsService.getProductInfo(product);
        res.json(productInfo);
    } catch (error) {
        console.log("Exchange reqs controller level error");
        res.status(500).json({ message: 'Error (controller) fetching product info', error: error.message });
    }
};

module.exports = {
    getProductsList,
    getProductHistory,
    getProductInfo
}
