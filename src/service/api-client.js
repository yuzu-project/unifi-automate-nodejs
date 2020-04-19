const axios = require('axios');
const https = require('https');
const util = require('util');
const env = require('../util/env');
const logger = require('../util/logger');

const MAX_RETRIES = 3;
const RETRY_TIMEWAIT_MILLIS = 250;
const TIMEOUT_LIMIT = 5000;

async function timeout(timeInMillis) {
  const setTimeoutPromisified = util.promisify(setTimeout);
  await setTimeoutPromisified(timeInMillis);
}

async function retryOnError(fn, maxRetries = MAX_RETRIES) {
  try {
    return fn();
  } catch (error) {
    if (error.response || maxRetries === 0) {
      return error;
    }
    await timeout(RETRY_TIMEWAIT_MILLIS);
    return retryOnError(fn, maxRetries - 1);
  }
}

async function execute(url, method, fields) {
  const agent = new https.Agent({
    rejectUnauthorized: !process.env.API_CLIENT_IGNORE_CERTIFICATE_ERRORS,
  });
  return axios({
    ...fields,
    url,
    method,
    httpsAgent: agent,
    timeout: TIMEOUT_LIMIT,
    validateStatus: (status) => status >= 200 && status < 300,
  }).then((response) => {
    if (!env.is_production()) {
      logger.verbose(response);
    }
  });
}

async function get(url, fields, maxRetries = MAX_RETRIES) {
  return retryOnError(() => execute(url, 'GET', fields, maxRetries));
}

async function put(url, fields, maxRetries = MAX_RETRIES) {
  return retryOnError(() => execute(url, 'PUT', fields, maxRetries));
}

async function post(url, fields, maxRetries = MAX_RETRIES) {
  return retryOnError(() => execute(url, 'POST', fields, maxRetries));
}

async function patch(url, fields, maxRetries = MAX_RETRIES) {
  return retryOnError(() => execute(url, 'PATCH', fields, maxRetries));
}

async function del(url, fields, maxRetries = MAX_RETRIES) {
  return retryOnError(() => execute(url, 'DELETE', fields, maxRetries));
}

module.exports = {
  get,
  put,
  post,
  patch,
  del,
};
