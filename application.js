// require //
  //example:
  // customJsFile = require('./lib/customJsFile.js');

// require custom js files 
var credentials = require('./credentials.js');
 
// require dependencies
var   express = require('express'),
    http = require('http'),
    https = require('https'),
    formidable = require('formidable'),
    Q = require('q'),
    mongoose = require('mongoose');

var app = express();

var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    static: function(name) {
      return require('./lib/static.js').map(name);
    }
  }
});


// engines //
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port //
app.set('port', process.env.PORT || 3000);

// set location of assets //
app.use(express.static('public'));

// mount middleware //

// tests
app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

// connect to database
var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};
switch(app.get('env')){
  case 'development':
    mongoose.connect(credentials.mongo.development.connectionString, opts);
    break;
  case 'production':
    mongoose.connect(credentials.mongo.production.connectionString, opts);
    break;
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'));
}
// error handling //
app.use(function(req, res, next){
  res.status(404).render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).render('500');
});

// listen //
app.listen(app.get('port'), function(){
  console.log('express started on andre:' + app.get('port') + '; Ctrl+C to terminate');
});
