var Hapi = require('hapi');
var Inert = require('inert');
var oracledb = require('oracledb');

var connectionConfig = {user: "TANKS_APP",password: "oracle",connectString: "10.0.2.2:1521/XE"};

var query = function(sql, callback) {
  oracledb.getConnection(connectionConfig, function(err, connection) {
    if(err) { console.error(err.message); return; }
    connection.execute(sql,{},{maxRows: 150000},function(err,result){
      if(err) {console.error(err.message); return; }
      callback(err, result.rows);
    });
  });
};

var server = new Hapi.Server();

server.register(Inert, function () {
  server.connection({ port: 3000 });
  server.route({
    method: 'GET',
    path: '/tanks',
    handler: function (request, reply) {
      var callback = function(err, rows){
        if(err) {reply(err); return;}
        reply(rows);
        return;
      };  
      query("select * from tanks", callback);
  }
 });

 server.route({
   method: 'GET',
   path: '/tanks/{id}',
   handler: function (request, reply) {
     reply(request.params.id + ' tanks!');
   }
 });
 
 server.route({
     method: 'GET',
     path: '/{param*}',
     handler: {
         directory: {
             path: '.'
         }
     }
 });
 
 server.start(function() {
   console.log('Server runnin at: ', server.info.uri);
 });
});


