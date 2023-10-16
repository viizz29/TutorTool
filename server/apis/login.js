const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./../models/index');    




async function post(req, res){
    // Our login logic starts here
  try {
    // Get user input

    //console.log(req.headers);
    //console.log(req.body);
    const { email, password } = req.body;
    

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("Please provide a valid email and password");
      res.end();
      return;
    }
    
    const User = db.User;

    // Validate if user exist in our database
    const user = await User.findOne({ 
      where:{
        email: email 
      }
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        {id: user.id, firstName: user.firstName, email: email},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      // user.token = token;

      // user
      //res.status(200).json({'token': token});
      //res.cookie('token', token, {maxAge: 9000000000, httpOnly: true, secure: true });
      //res.append('Set-Cookie', 'token=' + token + ';');
      res.send({'code': 200, 'msg': "Authentication Success", 'token': token});
      
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}

exports.post = post;