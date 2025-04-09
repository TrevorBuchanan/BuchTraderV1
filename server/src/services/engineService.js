
const Engine = require('../utils/engine');
const engine = new Engine();

const makeStep = async (price) => {
    try {
        await engine.step(price);
    } catch (error) {
        throw new Error(`Error (service) making engine step: ${error.message}`);
    }
};

const getStatus = async () => {
    try {
        const status = {
            'price': engine.getPrice(),
            'profitLoss': engine.getProfitLoss(),
            'longLossLimit': engine.getLongLossLimit(),
            'shortLossLimit': engine.getShortLossLimit(),
            'actions': engine.getActions()
        }
        return status;
    } catch (error) {
        throw new Error(`Error (service) getting status: ${error.message}`);
    }
};

module.exports = {
    makeStep,
    getStatus
};