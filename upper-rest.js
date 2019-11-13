const axios = require('axios');

const base_api_url = 'https://theupperrestsidegraceshopper.herokuapp.com/'
const user_url = base_api_url + 'auth/signup'
const clothes_url = base_api_url + 'api/clothes';

const clothes_data = {
  "name": "manny was here",
  "category": "manny",
  "size": 10,
  "inventory": 5000,
  "price": -1000
};

(async function () {
  try {
    // make the user
    const { data: user, headers } = await axios.post(user_url, {
      email: "manny_was_here" + (Math.random() * 100),
      // give me admin!
      isAdmin: true,
    })
    // this will grab and save the cookie for later!
    const [cookie] = headers["set-cookie"]; // get cookie from request
    axios.defaults.headers.Cookie = cookie; // attach cookie to axios requests later
    console.log('made user:', user.email)

    const { data: clothing } = await axios.post(
      clothes_url,
      clothes_data,
    )
    console.log('made clothing:', clothing.id)

  } catch (err) {
    console.error(err)
  }
})()
