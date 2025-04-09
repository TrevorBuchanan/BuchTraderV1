const axios = require('axios');
const JWTgenerator = require('../utils/JWTgenerator');

require('dotenv').config();

const USER_AGENT = process.env.USER_AGENT;

if (!USER_AGENT) {
  throw new Error("USER_AGENT environment variable is not set.");
}

const BASE_URL = 'https://api.exchange.coinbase.com/api/v3/brokerage';

const API_KEY = process.env.COINBASE_API_KEY;
const PRIVATE_KEY = process.env.COINBASE_PRIVATE_KEY;

/**
 * Generates headers required for Coinbase API requests
 * @param {string} uri - URI path for the request
 * @returns {object} Headers object
 */
const makeHeaders = (uri) => {
  const token = JWTgenerator.makeECJWT(API_KEY, PRIVATE_KEY, uri);
  return {
    'User-agent': USER_AGENT,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Makes a request to the Coinbase API with specified parameters.
 * @param {string} method - HTTP method (e.g., GET, POST)
 * @param {string} requestPath - Endpoint path for the request
 * @param {object} params - URL parameters for the request
 * @param {object} data - Payload for the request
 * @param {number} timeout - Request timeout in milliseconds
 * @returns {object} Response data from the API
 */
const makeRequest = async (method, requestPath, params = {}, data = {}, timeout = 5000) => {
  const url = `${BASE_URL}${requestPath}`;
  const headers = makeHeaders(`${method} ${BASE_URL}${requestPath}`);

  try {
    const response = await axios({
      method,
      url,
      params,
      data,
      headers,
      timeout,
    });
    return response.data; // Return the response data from the API
  } catch (error) {
    throw error; // Rethrow the error for handling elsewhere
  }
}

module.exports = {
  makeRequest,
};