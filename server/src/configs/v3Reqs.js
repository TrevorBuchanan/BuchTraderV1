const axios = require('axios');
const JWTgenerator = require('../utils/JWTgenerator');

require('dotenv').config();

const USER_AGENT = process.env.USER_AGENT;
const API_KEY_NAME = process.env.COINBASE_API_KEY_NAME;
const PRIVATE_KEY = process.env.COINBASE_PRIVATE_KEY;

if (!USER_AGENT) {
  throw new Error("USER_AGENT environment variable is not set.");
}
if (!API_KEY_NAME) {
  throw new Error("API_KEY_NAME environment variable is not set.");
}
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is not set.");
}

const BASE_URL = 'api.coinbase.com/api/v3/brokerage';


/**
 * Generates headers required for Coinbase API requests
 * @param {string} uri - URI path for the request
 * @returns {object} Headers object
 */
const makeHeaders = (uri) => {
  const token = JWTgenerator.makeJWTtoken(API_KEY_NAME, PRIVATE_KEY, uri);
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
  const url = `https://${BASE_URL}${requestPath}`;
  const headers = makeHeaders(`${method} ${BASE_URL}${requestPath}`);

  console.log("Request URL:", url);
  console.log("Headers:", headers);
  console.log("Request body:", JSON.stringify(data));

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
    console.error('Full Error:', error);
    console.error('Error making API request:', error.response?.data || error.message);
    throw error; // Rethrow the error for handling elsewhere
  }
}

module.exports = {
  makeRequest,
};

