// requir //
  //example:
  // customJsFile = require('./lib/customJsFile.js');

var express = require('express');

var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fv(this);
      return null;
    }
  }
});

// engines //

// set port //
app.set('port', process.env.PORT || 3000);

// set location of assets //
app.use(express.static('public'));

// mount middleware //
  // example:
  // app.use(function(req, res, next){
  //  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  //  next();
  // });

// routes //
  // example:
  // app.get('/path', function(req, res){
  //  res.render('path')
  // });

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
