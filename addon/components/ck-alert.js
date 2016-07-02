// v1
import Ember from 'ember';

export default Ember.Component.extend({
  // Whether it's possible to explicitly close the alert
  dismissible: false,
  // Type of the alert: success, info, warning, danger (+dark, full)
  type: 'info',
  // Number of seconds before the alert will disappear (will not if 0)
  destruct: 0,

  // Private stuff below
  _type: Ember.computed('type', function(){
    var t = this.get('type');
    if (!t)
      return '';
    return 'alert-' + t;
  }),

  classNames: ['alert'],
  ariaRole: 'alert',
  classNameBindings: ['_type', 'dismissible:alert-dismissible'],

  didRender: function(){
    this._super(...arguments);
    if(this.get('destruct'))
      Ember.run.later(function() {
        $(this.element).alert('close');
      }.bind(this), this.get('destruct') * 1000);

    $(this.element).on('closed.bs.alert', function () {
      this.sendAction();
    }.bind(this))

  }
});
