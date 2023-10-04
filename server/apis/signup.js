const bcrypt = require('bcryptjs');
const db = require('./../models/index');    

async function post(req, res){
  
    //console.log(req.body);
    const { firstname, lastname, email, password } = req.body;
    // Validate user input
    if (!(firstname && lastname && email && password)) {
      res.status(400).send("Please profile all details.");
      res.end();
      return;
    }
    let password_hash = await bcrypt.hash(password,10);
    //console.log(password_hash);
    const User = db.User;
    const john_doe = User.build(
      {'firstName': firstname,
      'lastName': lastname,
      'email': email,
      'password': password_hash
      });
    await john_doe.save()
    .then((item) => {
      res.status(200).send("Success");
    })
    .catch((error) => {
      //console.log(error.parent.errno);
      let knownError= false;
      if(error.hasOwnProperty('parent'))
      {
        if(error.parent.hasOwnProperty('errno'))
        {
          if(error.parent.errno == 1062)
          {
            knownError = true;
            res.status(400).send("An account with this email already exists.");
          }
        }
      }
      if(!knownError)
      {
        res.status(400).send(error.errors[0].message);
      }
    });
}

exports.post = post;