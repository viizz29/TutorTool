const db = require('./../models/index');    

async function post(req, res){
    //console.log(req.body);
    const {batchid, name, school, standard, fee, admission_date} = req.body;

    //validate
    if(!(batchid && name && school && standard && fee && admission_date)){
      res.status(400).send("Please provide all the details.");
      res.end();
      return;
    }

    //make entry
    const Student = db.Student;
    const new_student = Student.build(
      {
        'userid': req.user.id,
        'batchid': batchid,
        'name': name,
        'school': school,
        'standard': standard,
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