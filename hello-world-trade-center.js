const axios = require('axios')

const base_api_url = "https://pommesdeterre.herokuapp.com/api/";

(async function () {
  try {

    // grab all users
    const users_url = base_api_url + 'users/'
    const { data: users } = await axios.get(users_url)
    // then do something for each
    await Promise.all(users.map(async user => {
      // grab their general url
      const user_url = users_url + user.id
      // delete all of them
      await axios.delete(user_url)
    }))
  } catch (err) {
    console.error(err)
  }
})()
