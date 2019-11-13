const axios = require('axios')

const base_url = 'https://stacksfifth.herokuapp.com/'
const auth_url = base_url + 'auth/';
const login_url = auth_url + 'login/';

const api_url = base_url + 'api/';
const users_url = api_url + 'users/';

(async function () {
  try {
    // login as a user from the seed file
    const { data: user, headers } = await axios.post(login_url, {
      email: "malka@email.com",
      password: '123',
    })
    // this will grab and save the cookie for later!
    const [cookie] = headers["set-cookie"]; // get cookie from request
    axios.defaults.headers.Cookie = cookie; // attach cookie to axios requests later
    console.log('logged in as:', user.email)

    const { data: users } = await axios.get(users_url)

    await Promise.all(
      users
        .filter(ded => user.id !== ded.id) // filter people who aren't malka
        .map(user => axios.delete(users_url + user.id)) // delete everyone else
    )
    // finally, delete the admin themself
    await axios.delete(users_url + user.id)
    console.log(`deleted all ${users.length} users`)
  } catch (err) {
    console.error(err)
  }
})();
