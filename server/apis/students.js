const db = require('./../models/index');

async function get(request, response){
    let batchid = request.query.hasOwnProperty('batchid')?request.query.batchid:'1';
    
    const Student = db.Student;
    const students = await Student.findAll(
        {
            where:{
                userid: request.user.id,
                batchid: batchid,
            },
            raw: true
        }
    );
    response.send(students);
}

exports.get = get;