const axios = require('axios');

require('dotenv').config();

const USER_AGENT = process.env.USER_AGENT;

if (!USER_AGENT) {
  throw new Error("USER_AGENT environment variable is not set.");
}

const BASE_URL = 'https://api.exchange.coinbase.com';

const makeExchangeRequest = async (method, requestPath, params = null, data = null, timeout = 5000) => {
  /**
   * Makes an HTTPS request to the Coinbase API using Axios.
   * The maximum number of data points for a single request is 300 candles.
   *
   * @param {string} method - HTTP method (e.g., 'GET', 'POST').
   * @param {string} requestPath - The endpoint path (e.g., '/products/BTC-USD/candles').
   * @param {Object} params - Query parameters (optional).
   * @param {Object} data - Request payload for POST or PUT (optional).
   * @param {number} timeout - Timeout for the request in milliseconds.
   *
   * @returns {Object|null} JSON response from the API or null on error.
   */
  try {
    const url = `${BASE_URL}${requestPath}`;
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT
    };

    const response = await axios({
      method,
      url,
      headers,
      params,
      data,
      timeout
    });

    return response.data; // Return the JSON response
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return null;
  }
};

module.exports = {
  makeExchangeRequest
}
