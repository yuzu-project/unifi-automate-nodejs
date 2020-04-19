const client = require('./api-client');
const AuthenticationToken = require('./auth-token');
const logger = require('../util/logger');

async function authenticate(username, password) {
  const baseURL = process.env.UNIFI_BASE_URL;
  try {
    const response = await client.post(process.env.UNIFI_LOGIN_RESOURCE, {
      baseURL,
      data: {
        username: `${username}`,
        password: `${password}`,
      },
    });
    const cookies = response.headers['set-cookies'];
    return new AuthenticationToken(baseURL, cookies);
  } catch (exception) {
    logger.error(`Failed to authenticate: ${exception.message}`);
    throw exception;
  }
}

module.exports = {
  authenticate,
};
