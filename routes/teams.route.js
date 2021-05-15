const request = require('request');
module.exports = function (app, fs, multer, dir) {
  console.log('events route...');
  app.get('/getAllTeams',(req,res,next)=>{
    request('http://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English_Premier_League',
     function (error, response, body) {
         res.send(body)
    });  
  });
  app.get('/getTeamDetails/:id',(req,res,next)=>{
    request('https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+req.params.id,
     function (error, response, body) {
         res.send(body)
    });  
  });

  function readJsonFileSync(fs, filepath, encoding) {
    if (typeof encoding == 'undefined') {
      encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
  }


};
