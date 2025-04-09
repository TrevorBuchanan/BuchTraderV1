const engine = require('../utils/engine');

const makeStep = async (price) => {
    try {
        engine.step(price);
    } catch (error) {
        throw new Error(`Error (service) making engine step: ${error.message}`);
    }
};

const getStatus = async () => {
    try {
        const status = {
            'Price': engine.price,
            'ProfitLoss': engine.getProfitLoss(),
            'LongLossLimit': engine.getLongLossLimit(),
            'ShortLossLimit': engine.getShortLossLimit(),
            'Actions': engine.getActions()
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