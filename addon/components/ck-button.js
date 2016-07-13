/* global $:false */
// v1
import Ember from 'ember';
import layout from '../templates/components/ck-button';

// TODO aria-label en cas de contenu vide du button
export default Ember.Component.extend({
  // Public properties
  disabled: false,
  active: false,
  type: '', // primary, default, link, success, info, warning, danger
  size: '', // small, large, x-small
  label: undefined,
  toggleable: false,
  loading: '',
  state: Ember.computed({
    get: function(/*key*/) {
      return '';
    },
    set: function(key, value) {
      $(this.element).button(value);
      return value;
    }
  }),

  _pressed: Ember.computed('toggleable', 'active', function() {
    if (this.get('toggleable'))
      return this.get('active');
    return undefined;
  }),

  _toggle: Ember.computed('toggleable', 'active', function() {
    if (this.get('toggleable'))
      return 'button';
    return undefined;
  }),

  // Private attrs
  tagName: 'button',
  _typeAttr: 'button',
  _autocomplete: 'off',
  attributeBindings: ['_autocomplete:autocomplete', '_typeAttr:type', 'disabled', 'label:aria-label',
    '_toggle:data-toggle', '_pressed:aria-pressed', 'loading:data-loading-text'],

  // Private classes
  classNames: ['btn'],
  _type: Ember.computed('type', function(){
    var t = this.get('type');
    if (!t)
      return '';
    return 'btn-' + t;
  }),
  _size: Ember.computed('size', function(){
    var t = this.get('size');
    if (!t)
      return '';
    switch (t){
      case 'small':
        t = 'sm';
        break;
      case 'x-small':
        t = 'xs';
        break;
      default:
      case 'large':
        t = 'lg';
        break;
    }
    return 'btn-' + t;
  }),
  classNameBindings: ['_type', '_size', 'active'],

  /*  reset: function(){
   this.set('state', 'reset');
   },*/


  /*
   toggle: function(){
   $(this.element).button('toggle');
   },
   */

  click: function() {
    this.sendAction();
    /*if(this.get('toggleable')){
     this.set('active', !this.get('active'));
     }*/
    // return false;
  },

  layout
});


/*
 <button data-loading-text="Loading...">
 Loading state
 </button>
 */
