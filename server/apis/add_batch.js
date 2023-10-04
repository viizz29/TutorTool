const db = require('./../models/index');    

async function post(req, res){
    //console.log(req.body);
    const { title, subject, standard, fee, startedon } = req.body;
    // Validate user input
    if (!(title && subject && standard && fee && startedon)) {
      res.status(400).send("Please profile all details.");
      res.end();
      return;
    }

    const Batch = db.Batch;
    const new_batch = Batch.build(
      {'userid': req.user.id,
        'title': title,
      'subject': subject,
      'standard': standard,
      'fee': fee,
      'startedon': startedon,
      });
    await new_batch.save()
    .then((item) => {
      res.status(200).send("Success");
    })
    .catch((error) => {
      res.status(400).send(error.errors[0].message);
    });
}

exports.post = post;