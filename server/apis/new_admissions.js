const db = require('./../models/index');

async function get(request, response){
    const Student = db.Student;
    const students = await Student.findAll({
        where:{
            userid: request.user.id
        },
        order: [['createdAt', 'DESC']],
        limit: 6,
        raw: true
    });
    response.send(students);
}

exports.get = get;