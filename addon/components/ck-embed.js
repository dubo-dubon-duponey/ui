import Ember from 'ember';
import layout from '../templates/components/ck-embed';
const {computed} = Ember;

export default Ember.Component.extend({
  ratio: '16by9', // 4by3
  src: '',

  _embed: computed('ratio', function(){
    var t = this.get('ratio');
    if (!t)
      return;
    return 'embed-responsive-' + t;
  }),

  classNameBindings: ['_embed'],

  classNames: ['embed-responsive'],

  layout
});
