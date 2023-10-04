var fs = require('fs');
var mime = require('mime-types')

const dps = ['dp_unknown.png', 'dp_male.jpeg', 'dp_female.jpeg']


function get(request, response){
    let id = request.query.hasOwnProperty('id')?parseInt(request.query.id):0;
    let filePath = './images/'+dps[id%dps.length];
    fs.readFile(filePath, function(error, content){
        if (error) {
            response.writeHead(404);
            response.end('Not Found\n');
            response.end(); 
        }
        else {
            response.writeHead(200, { 'Content-Type': mime.contentType(filePath) });
            response.end(content);
        }
    });
}

exports.get = get;