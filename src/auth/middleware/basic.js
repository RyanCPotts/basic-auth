// Inside basic.js

// Import necessary modules
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('./models'); // Import the Users model from the models folder

// Define the middleware function for basic authentication
async function basicAuth(req, res, next) {
  let basicHeaderParts = request.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
    req.user = user;
    next()
    }
    else {
      throw new Error('Invalid User');
    }

    // Authentication logic here
  } catch (error) {
    console.error('Error in basic authentication middleware:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Export the middleware function
module.exports = basicAuth;