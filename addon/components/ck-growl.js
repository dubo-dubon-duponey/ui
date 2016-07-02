// v1
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  all: Ember.computed(function(){
    return this.get('store').peekAll('alert');
  }),

  items: Ember.computed('all.[]', function(){
    var m = this.get('max');
    var d = this.get('all');
    if(!m)
      return d;
    return d.slice(0, m);// length - m, m);
  }),

  max: 10,
  classNames: ['growl'],
  actions: {
    close: function(item) {
      item.destroyRecord();
    }
  }
});
