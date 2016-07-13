// v1
import Ember from 'ember';
import layout from '../templates/components/ck-icon';

export default Ember.Component.extend({
  // Public
  icon: '',
  collection: 'glyphicon',

  // Private
  tagName: 'span',
  _hidden: 'true',
  attributeBindings: ['_hidden:aria-hidden'],

  // Private classes
  _icon: Ember.computed('icon', 'collection', function(){
    var t = this.get('icon');
    if (!t)
      return '';
    var c = this.get('collection');
    return c + ' ' + c + '-' + t;
  }),
  classNameBindings: ['_icon'],

  layout
});

// TODO: no support for sr-only right now (<span class="sr-only">Error:</span>)
