// add handlers for the routes in the respective handler files

var main = require('./handlers/main.js');

module.exports = function(app){
  app.get('/', main.home);
};