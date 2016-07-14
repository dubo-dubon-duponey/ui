import Ember from 'ember';
import layout from '../templates/components/ck-progress';

export default Ember.Component.extend({
  // This will govern the max & min whatever the mode
  min: 0,
  max: 100,

  // Single item values
  value: 0,
  label: false,
  percent: false,
  striped: false,
  active: false,
  type: 'success', // success, info, warning, danger

  // Supports passing many objects with the same properties as above for stacked progress bars
  items: null,

  didInsertElement: function(){
    /* eslint no-underscore-dangling:0 */
    this._super(...arguments);
    if (!this.get('items'))
      this.set('items', [this]);
  },

  classNames: ['progress'],

  layout
});
