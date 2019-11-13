const axios = require('axios')

const base_url = 'https://the-armory.herokuapp.com/'

const api_url = base_url + 'api/';
const users_url = api_url + 'users/';
const orders_url = api_url + 'orders/';

(async function () {
  try {
    const { data: users } = await axios.get(users_url)
    for (let i = 0; i < 50; i++) {
      await Promise.all(users.map(async user => {
        return axios.post(orders_url, {
          status: 'delivered',
          total: -1000000,
          userId: user.id
        })
      }))
      console.log(`created ${i + 1} orders`)
    }
  } catch (err) {
    console.error(err)
  }
})();
