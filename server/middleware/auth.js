const jwt = require("jsonwebtoken");
const db = require('./../models/index');  

const verifyToken = async (req, res, next) => {
  //console.log(req.headers.cookie);
  //console.log(req.query);
    const token = req.headers["x-access-token"] || req.query.token; //||req.cookies.token || req.body.token ;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    
    /*const email = decoded.email;
    const User = db.User;
    const user = await User.findOne({
      attributes: [
        'id', 'firstName', 'lastName', 'email'
      ],
      where: {
        email: email
      }
    });

    req.user = user;
    */
    //console.log(decoded);
    req.user = decoded;

  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
    
  }
  return next();
}
module.exports = verifyToken;