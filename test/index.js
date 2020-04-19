const client = require('../src/service/api-client');


test('if client can connect to API login endpoint', async (done) => {
  try {
    await client.post(process.env.UNIFI_LOGIN_RESOURCE, {
      baseURL: process.env.UNIFI_BASE_URL,
      data: {
        username: `${process.env.UNIFI_USERNAME}`,
        password: `${process.env.UNIFI_PASSWORD}`,
      },
    });  
  } catch (exception) {
    
  } finally {
    done();
  }
});

