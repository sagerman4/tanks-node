var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
  method: 'GET',
  path: '/tanks',
  handler: function (request, reply) {
    reply('some tanks!');
  }
});

server.route({
  method: 'GET',
  path: '/tanks/{id}',
  handler: function (request, reply) {
    reply(request.params.id + ' tanks!');
  }
});


server.start(function() {
  console.log('Server runnin at: ', server.info.uri);
});