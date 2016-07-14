import Ember from 'ember';
import layout from '../templates/components/pk-progress-bar';

export default Ember.Component.extend({
  min: 0,
  max: 100,
  value: 0,
  label: false,
  percent: false,
  striped: false,
  active: false,
  type: 'success', // success, info, warning, danger

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
    var ret = '';
    if (dis)
      ret = 'min-width: 2em;';
    return Ember.String.htmlSafe(ret + 'width: ' + Math.round((Math.max(v, mn) - mn) / (mx - mn) * 100) + '%');
  }),

  _label: Ember.computed('value', 'min', 'max', 'percent', function(){
    var p = this.get('percent');
    var v = this.get('value');
    if (!p)
      return v;
    var mx = this.get('max');
    return Math.round(v/mx*100) + '%';
  }),

  classNames: ['progress-bar'],

  classNameBindings: ['striped:progress-bar-striped', 'active', '_type'],

  attributeBindings: ['role', 'min:aria-valuemin', 'max:aria-valuemax', 'value:aria-valuenow', '_style:style'],

  role: 'progressbar',

  layout
});
