/* global $:false */
// v1
import Ember from 'ember';
import layout from '../templates/components/ck-alert';

export default Ember.Component.extend({
  // Whether it's possible to explicitly close the alert
  dismissible: false,
  // Type of the alert: success, info, warning, danger (+dark, full)
  type: 'info',
  // Number of seconds before the alert will disappear (will not if 0)
  destructIn: 0,

  classNames: ['alert', 'fade', 'in'],// XXX maybe make fading configurable?
  ariaRole: 'alert',

  // "dismissible" true will add "alert-dismissible" class
  // interpolated "_type" will return the right alert class
  classNameBindings: ['_type', 'dismissible:alert-dismissible'],

  // Private computed class
  _type: Ember.computed('type', function(){
    var t = this.get('type');
    if (!t)
      return '';
    return 'alert-' + t;
  }),

  didInsertElement: function(){
    /* eslint no-underscore-dangle:0 */
    this._super(...arguments);
    // Set a timebomb if we are told to do so
    if (this.get('destructIn'))
      Ember.run.later(function() {
        $(this.element).alert('close');
      }.bind(this), this.get('destructIn') * 1000);

    // Send action when the close completes (will avoid competing re-render when models are updated with fade here)
    $(this.element).on('closed.bs.alert', function () {
      this.sendAction();
    }.bind(this));
  },

  // Ensure links are styled
  didRender: function(){
    /* eslint no-underscore-dangle:0 */
    this._super(...arguments);
    $('a', $(this.element)).each(function(idx, anchor){
      if (!$(anchor).hasClass('alert-link'))
        $(anchor).addClass('alert-link');
    });
  },

  layout
});
