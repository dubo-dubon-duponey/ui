/* global $:false */
import Ember from 'ember';
import layout from '../templates/components/ck-data-table';
const {computed, observer} = Ember;

export default Ember.Component.extend({
  // If there is a model, we use DOM, all client side infos dataTable
  model: null,

  // Whether to autowidth with dataTables
  autoWidth: true,
  ordering: true,
  info: true,
  processing: true,

  // Free style dataTable options
  dataTableOptions: null,

  // If no model, we expect a query method to be implemented, that calls us with a single argument as:
  // {meta: {total: 100, filtered: 10}, data: [record1, record]}
  // This is what you typically get from the store
  ajax: function (options, callback/*, settings*/) {
    this.sendAction('query', options, function(data) {
      callback({
        recordsTotal: data ? data.get('meta.total') : 0,
        draw: options.draw,
        recordsFiltered: data ? data.get('meta.filtered') : 0,
        data: data ? data.getEach('data') : []
      });
    }.bind(this));
  },

  serverSide: computed('model', function(){
    return !this.get('model');
  }),

  tagName: 'table',
  classNames: ['table','table-striped','table-bordered','dataTable'],

  _innerDataTable: '',

  // Listen for removals to the model array
  modelRemovalObserver: observer('model.[]', function(){
    this.rehash();
  }),

  // Subtly listen for ids being set (meaning the model is saved)
  modelSavingObserver: observer('model.@each.short', function(){
    this.rehash();
  }),

  // This is probably terribly costly, and will happen everytime elements are added, removed, or saved
  rehash: function(){
    // Build up the lists of existing ids in the model
    var desired = this.get('model').map(function(item){
      if (item.get('short'))
        return 'share-id-' + item.get('short');
    });

    // Enumerate DataTables content
    var dt = this.get('_innerDataTable').api();
    dt.data().map(function(item){
      var findIt = desired.indexOf(item.DT_RowId);
      // If the element is not known in the model, kill it
      if (findIt === -1){
        dt.row('#' + item.DT_RowId).remove().draw();
        return;
      }
      // If it is, remove it from desired
      desired.splice(findIt, 1);
    }, this);

    // Now, we have stuff in there - some of it may still be pending an identifier though - so, wait for everything
    // to come back
    if (desired.indexOf(undefined) !== -1)
      return;

    // Nothing wanted? Tag along.
    if (!desired.length)
      return;

    // Ok, let see...
    var thisIsSoSoVeryWrongKitty = setInterval(function(){
      desired = desired.filter(function(key){
        // Get the physical DOM row - there is no guarantee it will be there yet
        var tr = $('#' + key)[0];
        if (!tr)
          return true;
        // Add it to dt if it is
        dt.row.add(tr);
      });
      // Nothing left?
      if (!desired.length){
        // Clear this
        clearInterval(thisIsSoSoVeryWrongKitty);
        // And.... flush!
        dt.draw();
      }
    }, 100);
  },

  initDataTable: function() {
    $.fn.dataTable.ext.errMode = 'none';
    var opt = this.get('dataTableOptions') || {};
    var def = {
      ordering: this.get('ordering'),
      info: this.get('info'),
      processing: this.get('processing'),
      autoWidth: this.get('autoWidth'),
      ajax: this.get('serverSide') ? this.get('ajax').bind(this) : undefined,
      serverSide: this.get('serverSide'),
      search: {regex: true}
    };
    // Overload with defaults
    Object.keys(def).forEach(function(key){
      if (!(key in opt))
        opt[key] = def[key];
    });
    this.set('_innerDataTable', this.$().dataTable(opt));
  }.on('didInsertElement'),

  layout

});

