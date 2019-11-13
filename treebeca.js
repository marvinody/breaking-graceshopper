const axios = require('axios')

const base_api_url = "https://treebeca-grace-shopper.herokuapp.com/api/";

(async function () {
  try {

    // grab all users
    const users_url = base_api_url + 'users/'
    const { data: users } = await axios.get(users_url)
    // then do something for each
    await Promise.all(users.map(async user => {
      // make their activeCart url
      const cart_url = users_url + user.id + '/' + 'activeCart/'
      // grab their cart stuff
      const { data: items } = await axios.get(cart_url)
      // per each item in active cart
      await Promise.all(items.map(async item => {
        const delete_url = cart_url + 'delete/' + item.id
        await axios.delete(delete_url)
      }))
    }))
  } catch (err) {
    console.error(err)
  }
})()
