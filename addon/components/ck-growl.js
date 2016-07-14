// WARNING note this is dependent on model objects that have a title, message, and optionally:
// - type that reflects alerts types: success, info, warning, danger (+dark, full)
// - destructIn to make it disappear
import Ember from 'ember';
import layout from '../templates/components/ck-growl';

export default Ember.Component.extend({
  // Maximum number of items to display at once
  max: 10,
  model: [],

  items: Ember.computed('model.[]', function(){
    var m = this.get('max');
    var d = this.get('model');
    if (!m || !d)
      return d;
    return d.slice(0, m);
  }),

  classNames: ['growl'],
  actions: {
    destroy: function(item) {
      item.destroyRecord();
    }
  },

  layout
});
