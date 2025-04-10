const Utils = require('./utilFunctions');

class Engine {
    #actions

    #goodForLen

    #sellFraction

    // FIXME: Could make series a dequeue of length 'goodForLen' for space efficiency 
    #series

    #price

    #profitLoss

    #isLonging
    #isShorting

    #longEntryPrice
    #shortEntryPrice

    #justClosedLong
    #justClosedShort

    #longLossLimit
    #shortLossLimit

    #maxLossLimit

    constructor() {
        this.#actions = [];

        this.#goodForLen = 2;

        this.#sellFraction = 0.5;
        this.#maxLossLimit = 10; // FIXME: Experiment with different values

        this.#series = [];
        this.#price = null;

        this.#isLonging = false;
        this.#isShorting = false;

        this.#justClosedLong = false;
        this.#justClosedShort = false;

        this.#profitLoss = 0;

        this.#longEntryPrice = null;
        this.#shortEntryPrice = null;

        this.#longLossLimit = null;
        this.#shortLossLimit = null;
    }

    step(price) {
        const convertedPrice = Number(price);

        // Check if the conversion was successful (if it results in NaN)
        if (isNaN(convertedPrice)) {
            throw new Error(`Invalid price passed to step: ${price}`);
        }

        this.#actions = []

        if (this.#price === convertedPrice) { return }

        this.#price = convertedPrice;
        this.#series.push(convertedPrice);

        if (this.#series.length < this.#goodForLen) { return }

        this.#justClosedLong = false;
        this.#justClosedShort = false;

        this.#updateLimits();

        this.#checkLong();
        this.#checkShort();

        this.#checkCloseLong();
        this.#checkCloseShort();

        this.#checkHold();
    }

    closeAllPositions() {
        this.#actions = []
        if (this.#isLonging) {
            this.#actions.push("Close Long");
            this.#justClosedLong = true;
            this.#profitLoss += this.#price - this.#longEntryPrice;
            this.#isLonging = false;
        }
        if (this.#isShorting) {
            this.#actions.push("Close Short");
            this.#justClosedShort = true;
            this.#profitLoss += this.#shortEntryPrice - this.#price;
            this.#isShorting = false;
        }
    }

    #updateLimits() {
        if (this.#isLonging) {
            if (this.#longLossLimit !== null) {
                const longLossLimitType = typeof this.#longLossLimit;
                const priceType = typeof this.#price;
                const sellFractionType = typeof this.#sellFraction;

                if (longLossLimitType !== "number" || priceType !== "number" || sellFractionType !== "number") {
                    throw new Error(`Invalid input types for lerp in updateLimits: 
                    longLossLimit (${longLossLimitType}): ${this.#longLossLimit}, 
                    price (${priceType}): ${this.#price}, 
                    sellFraction (${sellFractionType}): ${this.#sellFraction}`);
                }

                this.#longLossLimit = Utils.lerp(this.#longLossLimit, this.#price, this.#sellFraction);
            } else {
                throw new Error("longLossLimit is null when trying to update limits");
            }
        }

        if (this.#isShorting) {
            if (this.#shortLossLimit !== null) {
                const shortLossLimitType = typeof this.#shortLossLimit;
                const priceType = typeof this.#price;
                const sellFractionType = typeof this.#sellFraction;

                if (shortLossLimitType !== "number" || priceType !== "number" || sellFractionType !== "number") {
                    throw new Error(`Invalid input types for lerp in updateLimits: 
                    shortLossLimit (${shortLossLimitType}): ${this.#shortLossLimit}, 
                    price (${priceType}): ${this.#price}, 
                    sellFraction (${sellFractionType}): ${this.#sellFraction}`);
                }

                this.#shortLossLimit = Utils.lerp(this.#shortLossLimit, this.#price, this.#sellFraction);
            } else {
                throw new Error("shortLossLimit is null when trying to update limits");
            }
        }
    }

    #checkLong() {
        if (this.#shouldLong()) {
            this.#longEntryPrice = this.#price;
            this.#isLonging = true;
            this.#longLossLimit = this.#price - this.#maxLossLimit
            this.#actions.push("Long");
        }
    }

    #checkCloseLong() {
        if (this.#shouldCloseLong()) {
            this.#justClosedLong = true;
            this.#profitLoss += this.#price - this.#longEntryPrice;
            this.#isLonging = false;
            this.#actions.push("Close Long");
        }
    }

    #checkShort() {
        if (this.#shouldShort()) {
            this.#shortEntryPrice = this.#price;
            this.#isShorting = true;
            this.#shortLossLimit = this.#price + this.#maxLossLimit
            this.#actions.push("Short");
        }
    }

    #checkCloseShort() {
        if (this.#shouldCloseShort()) {
            this.#justClosedShort = true;
            this.#profitLoss += this.#shortEntryPrice - this.#price;
            this.#isShorting = false;
            this.#actions.push("Close Short");
        }
    }

    #checkHold() {
        if (this.#actions.length === 0) {
            if (this.#isLonging) {
                this.#actions.push("Hold Long");
            }
            if (this.#isShorting) {
                this.#actions.push("Hold Short");
            }
        }
    }

    #shouldLong() {
        return Utils.upTrendForLength(this.#series, this.#goodForLen) && !this.#isLonging;
    }

    #shouldShort() {
        return Utils.downTrendForLength(this.#series, this.#goodForLen) && !this.#isShorting;
    }

    #shouldCloseLong() {
        return this.#isLonging && this.#price <= this.#longLossLimit;
    }

    #shouldCloseShort() {
        return this.#isShorting && this.#price >= this.#shortLossLimit;
    }

    // _________________________ Not critical to engine but for fetching _________________________

    getLongLossLimit() {
        if (this.#justClosedLong) {
            this.#justClosedLong = false;
            return this.#longLossLimit;
        }
        if (this.#isLonging) {
            return this.#longLossLimit;
        }
        this.#longLossLimit = null;
        return null;
    }

    getShortLossLimit() {
        if (this.#justClosedShort) {
            this.#justClosedShort = false;
            return this.#shortLossLimit;
        }
        if (this.#isShorting) {
            return this.#shortLossLimit;
        }
        this.#shortLossLimit = null;
        return null;
    }

    getProfitLoss() {
        return this.#profitLoss;
    }

    getActions() {
        return this.#actions;
    }

    getPrice() {
        return this.#price;
    }
}

module.exports = Engine;