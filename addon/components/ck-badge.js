// v1
import Ember from 'ember';
import layout from '../templates/components/ck-badge';

export default Ember.Component.extend({
  // Public
  value: '',

  // Private
  tagName: 'span',
  classNames: ['badge'],

  layout

});
