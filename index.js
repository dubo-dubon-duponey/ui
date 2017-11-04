/* eslint-env node */
'use strict';

module.exports = {
  name: 'ui',

  included: function included(app) {
    app.import('node_modules/bootstrap/dist/css/bootstrap.css');
//    app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css');
    app.import('node_modules/bootstrap/dist/js/bootstrap.js');
    app.import('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot');
    app.import('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg');
    app.import('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf');
    app.import('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff');
    app.import('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2');
  }
};
