/* jshint node: true */
/*eslint-env node*/

module.exports = {
  name: 'closerkit',

  included: function included(app) {
    app.import('bower_components/bootstrap/dist/css/bootstrap.css');
//    app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css');
    app.import('bower_components/bootstrap/dist/js/bootstrap.js');
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot');
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg');
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf');
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff');
    app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2');
  }
};
