import Ember from 'ember';
import layout from '../templates/components/ck-button';

// WONTFIX: we don't support states at all.
// They can very easily be added by making the button content binding to an Ember object
// We don't support data-toggle either (implemented instead through toggleable + active)
export default Ember.Component.extend({
  // Public API
  // Whether this is a toggleable button
  toggleable: false,
  // Whether the button is currently disabled
  disabled: false,
  // Whether the toggleable button is currently active
  active: false,
  // Optional aria-label (good for empty buttons)
  label: undefined,
  // Button type
  type: 'default', // primary, default, link, success, info, warning, danger
  // Size
  size: 'large', // small, large, x-small
  // Whether it's a block 100% width button
  block: false,

  _pressed: Ember.computed('toggleable', 'active', function() {
    if (this.get('toggleable'))
      return this.get('active');
    return undefined;
  }),

  // Private attrs
  tagName: 'button',
  _typeAttr: 'button',
  // Workaround browser bugs with this
  _autocomplete: 'off',
  attributeBindings: ['_autocomplete:autocomplete', '_typeAttr:type', 'disabled', 'label:aria-label',
    '_pressed:aria-pressed'],

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

  _block: Ember.computed('block', function(){
    var t = this.get('block');
    if (!t)
      return '';
    return 'btn-block';
  }),

  classNameBindings: ['_type', '_size', '_block', 'active'],

  click: function() {
    if (this.get('toggleable'))
      this.set('active', !this.get('active'));
    this.sendAction();
  },

  layout
});
