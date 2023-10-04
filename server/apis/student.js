const db = require('./../models/index');  

async function get(request, response){
    let id = request.query.hasOwnProperty('id')?request.query.id:'1';
    const Student = db.Student;
    const student = await Student.findOne({
        where:{
            userid: request.user.id,
            id: id,
        },
        raw: true,
    });
    response.send(student);
}

exports.get = get;