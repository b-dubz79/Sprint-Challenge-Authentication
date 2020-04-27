const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets')

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;//where is authorization defined?

    const secret = secrets.jwtSecret;

    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ message: "Wrong password" });
            } else {
                req.decodedToken = decodedToken; //why reassign this??

                next();
            }
        });
    } else{
        res.status(401).json({ you: "shall not pass!"}) 
    }
};
