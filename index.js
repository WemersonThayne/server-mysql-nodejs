const restify = require('restify');
const restifyErros = require('restify-errors');

//config server
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
  ip : '127.0.0.1'
});
 
//change permissions 
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
//active server
server.listen(3000,function () {
  console.log('%s listening at %s', server.name, server.url);
});

//config knex for concetion on mysql
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'root1234',
      database : 'teste'
    }
  });

  //router
  server.get('/teste', function (req, res, next) {
    res.send('ola mundo');  
    return next();
  });

  server.get('/', function (req, res, next) {
    console.log('getting....');
    knex('test_tb').then((dados)=>{
        res.send(dados);
    },next);   
    return next();
  });