const db = require('./../models/index');  

async function get(request, response){
    let id = request.query.hasOwnProperty('id')?request.query.id:'1';
    const Batch = db.Batch;
    const batch = await Batch.findOne({
        where:{
            userid: request.user.id,
            id: id,
        },
        raw: true
    });
    response.send(batch);
}

exports.get = get;