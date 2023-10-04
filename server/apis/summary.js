const db = require('./../models/index');  

async function get(request, response){
    const Batch = db.Batch;
    const batch_count = await Batch.count({
        where:{
            userid: request.user.id
        }
    });

    const Student = db.Student;
    const student_count = await Student.count({
        where:{
            userid: request.user.id
        }
    });

    const data = {
        'student_count': student_count,
        'batch_count': batch_count,
        'earning_this_month': 0,
    }

    response.send(data);
}

exports.get = get;