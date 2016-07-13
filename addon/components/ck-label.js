// v1
import Ember from 'ember';
import layout from '../templates/components/ck-label';

export default Ember.Component.extend({
  // Public
  type: 'default', // default, primary, success, info, warning, danger

  // Private
  tagName: 'span',

  // Private classes
  _type: Ember.computed('type', function(){
    var t = this.get('type');
    if (!t)
      t = 'default';
    return 'label label-' + t;
  }),
  classNameBindings: ['_type'],

  layout
});
