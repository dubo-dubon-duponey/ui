import Ember from 'ember';
import layout from '../templates/components/ck-well';
const { computed } = Ember;

export default Ember.Component.extend({

  size: 'small', // small or large

  _size: computed('size', function(){
    var t = this.get('size');
    if (!t)
      return;
    if (t === 'small')
      t = 'sm';
    else
      t = 'lg';
    return 'well-' + t;
  }),

  classNames: ['well'],

  classNameBindings: ['_size'],

  layout
});
