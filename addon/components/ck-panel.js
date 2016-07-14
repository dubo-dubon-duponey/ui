import Ember from 'ember';
import layout from '../templates/components/ck-panel';
const {computed} = Ember;

// XXX no support for post-body tables and ul right now
export default Ember.Component.extend({
  header: '',
  footer: '',
  title: '',
  type: 'default', // primary, success, info, warning, danger

  _panel: computed('type', function(){
    var t = this.get('type');
    if (!t)
      return;
    return 'panel-' + t;
  }),

  classNames: ['panel'],

  classNameBindings: ['_panel'],

  layout
});
