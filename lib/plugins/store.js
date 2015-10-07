'use strict';

module.exports = function (app) {
  var store = null;
  app.define('store', {
    get: function () {
      if (store) return store;
      var DataStore = require('data-store');
      store = new DataStore('scaffolds');
      return store;
    }
  });
};
