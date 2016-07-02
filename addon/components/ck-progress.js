// v1
import Ember from 'ember';

export default Ember.Component.extend({
  min: 0,
  max: 100,
  value: 0,
  label: false,
  percent: false,
  striped: false,
  active: false,
  type: '', // success, info, warning, danger

  _type: Ember.computed('type', function(){
    var t = this.get('type');
    if (!t)
      return '';
    return 'progress-bar-' + t;
  }),

  _style: Ember.computed('value', 'min', 'max', 'label', function(){
    var v = this.get('value');
    var mn = this.get('min');
    var mx = this.get('max');
    var dis = this.get('label');
    var ret = ''
    if (dis)
      ret = 'min-width: 2em;'
    return Ember.String.htmlSafe(ret + 'width: ' + Math.round((Math.max(v, mn) - mn) / (mx - mn) * 100) + '%');
  }),

  _label: Ember.computed('value', 'min', 'max', 'percent', 'label', function(){
    if(!this.get('label'))
      return '';
    var p = this.get('percent');
    var v = this.get('value');
    if(!p)
      return v;
    var mx = this.get('max');
    return Math.round(v/mx*100) + '%';
  }),

  _subClass: Ember.computed('striped', 'active', function(){
    return 'progress-bar ' +
      (this.get('striped') ? 'progress-bar-striped ' : '') +
      (this.get('active') ? 'active ' : '') +
      this.get('_type');
  }),

  classNames: ['progress']
});

// stacked progress bar TODO: multi progress-bar inside a single widget
