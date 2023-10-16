const db = require('./../models/index');    

async function post(req, res){
    //console.log(req.body);
    const {batchid, name, school, standard, fee, admission_date, phone} = req.body;

    //validate
    if(!(batchid && name && school && standard && phone && fee && admission_date)){
      res.status(400).send("Please provide all the details.");
      res.end();
      return;
    }

    const email = req.body.email || null;

    //make entry
    const Student = db.Student;
    const new_student = Student.build(
      {
        'userid': req.user.id,
        'batchid': batchid,
        'name': name,
        'school': school,
        'standard': standard,
        'phone': phone, 
        'email': email,
        'fee': fee,
        'admission_date': admission_date,
      }
    );

    await new_student.save()
    .then((item) => {
      res.status(200).send('Success');
    })
    .catch((error) => {
      res.status(400).send(error.errors[0].message);
    });
    
}

exports.post = post;