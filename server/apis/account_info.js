const db = require('./../models/index');    


async function get(request, response){
    response.send(request.user);
}

exports.get = get;