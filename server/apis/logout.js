
async function get(req, res){
      res.clearCookie('token');
      res.append('Set-Cookie', 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
      res.send("Success");
}

exports.get = get;