const db = require('./../models/index');    


async function get(request, response){
    const Batch = db.Batch;
    const batches = await Batch.findAll({
        where: {
            userid: request.user.id
        },
        raw: true
    });
    response.send(batches);
}

exports.get = get;