/* global $:false */
import Ember from 'ember';
const {observer} = Ember;
import layout from '../templates/components/ck-modal';

var uid = 0;

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export default Ember.Component.extend({
  tagName: 'div',
  ariaRole: 'dialog',
  tabindex: '-1',
  classNames: ['modal'],
  classNameBindings: ['fade'],
  attributeBindings: ['_labelledBy:aria-labelledby', 'tabindex', '_describedBy:aria-describedby'],
  _labelledBy: 'modalLabelledByUID-' + uid,
  _describedBy: 'modalDescribedByUID-' + uid,
  _size: Ember.computed('size', function(){
    if (!this.get('size'))
      return '';
    return 'modal-' + (this.get('size') === 'small' ? 'sm' : 'lg');
  }),

  title: '',
  // Wether to fade-in / out or not
  fade: true,
  size: null, // small, large

  ok: null,
  cancel: null,
  // Content can be yield alternatively
  content: null,

  // Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't
  // close the modal on click.
  backdrop: true, // true, false, static
  // Closes the modal when escape key is pressed, or not
  keyboard: true,
  // Shows the modal when initialized, or not
  show: true,

  changeObserver: observer('show', function(){
    $(this.element).modal(this.get('show') ? 'show' : 'hide');
  }),

  didInsertElement: function(){
    /* eslint no-underscore-dangle:0 */
    this._super(...arguments);
    uid++;
    // Init the modal itself
    $(this.element).modal({
      backdrop: this.get('backdrop'),
      keyboard: false,
      show: this.get('show')
    });
  },

  keyDown: function(e) {
    if (!this.get('keyboard'))
      return;
    var code = e.keyCode || e.which;
    // Don't act if it's a textarea
    if (e.target.nodeName.toLowerCase() === 'textarea')
      return;
    if (code === RETURN_KEY) {
      e.preventDefault();
      e.stopPropagation();
      $('[rel=ck-ok]', this.element).trigger('click');
    }
    if (code === ESCAPE_KEY) {
      e.preventDefault();
      e.stopPropagation();
      $('[rel=ck-cancel]', this.element).trigger('click');
    }
  },

  // Due to the late insertion mechanism, we can't use Ember click handlers
  mouseDown: function(e) {
    if (!this.get('backdrop'))
      return;
    if (e.target === this.element) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  mouseUp: function(e) {
    if (!this.get('backdrop'))
      return;
    if (e.target === this.element) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  click: function(e) {
    if (!this.get('backdrop'))
      return;
    if (e.target === this.element){
      $('[rel=ck-cancel]', this.element).trigger('click');
      e.preventDefault();
      e.stopPropagation();
    }
  },

  actions: {
    cancel: function(){
      this.set('show', false);
      this.sendAction('cancel');
    },
    ok: function(){
      this.set('show', false);
      this.sendAction('ok');
    }
  },

  layout

//  id: '',
//  ariaHidden: true,
//  attributeBindings: ['id', 'ariaHidden:aria-hidden'],

});

/*
 // Aria description ftw
 ariaDescribedby: false,

 didInsertElement: function(){
 this._super();

 // Bind description aria stuff
 this.set('ariaLabelledby', 'emstrap-modal-label-' + uid);
 this.set('ariaDescribedby', 'emstrap-modal-describe-' + uid);
 uid++;

 // Init the modal itself
 this.$().modal({
 backdrop: this.get('backdrop'),
 keyboard: this.get('keyboard'),
 show: this.get('show'),
 remote: this.get('remote')
 });

 // If show was initially false, and changes to true, pop the modal-up
 this.addObserver('show', function(){
 if(this.get('show'))
 this.$().modal('show');
 });

 // this.$().on('hide.bs.modal', function (e) {
 //   if($(e.target).context != this.$().context)
 //     return;
 //   if(this.get('confirmed'))
 //     this.resolve();
 //   else
 //     this.reject();
 // }.bind(this));

 // Destroy on hide completion
 this.$().on('hidden.bs.modal', function (e) {
 if($(e.target).context != this.$().context)
 return;
 var prevent = false;
 if(this.get('confirmed'))
 prevent = this.resolve();
 else
 prevent = this.reject();
 // XXX Avoid bad flickering effect likely due to bootstrap unsynchronized event dispatching
 // Destroy if neither promise out prevent us...
 if(!prevent)
 this.destroy();

 // Ember.run.sync();
 // Ember.run.later(this, this.destroy, 5000);
 }.bind(this));

 // Due to the late insertion mechanism, we can't use Ember click handlers
 this.$().on('click', function(e){
 if (e.target.getAttribute('rel') == 'emstrap-modal-primary') {
 this.set('confirmed', true);
 this.$().modal('hide');
 }
 }.bind(this));

 // this.$().on('dragstart', function(e){
 //   console.warn('dragStart', e.originalEvent.target);
 //   this.set('_estore', e.originalEvent);
 // }.bind(this));

 // this.$().on('drag', function(){
 //   // console.warn('drag');
 // });

 // this.$().on('dragend', function(e){
 //   var eo = this.get('_estore');
 //   console.warn(e.originalEvent.pageX, e.originalEvent.pageY, eo.pageX, eo.pageY, e, eo);
 // }.bind(this));

 // this.$().on('drop', function(){
 //   console.warn('drop');
 // });

 // this.$().on('dragenter', function(){
 //   console.warn('dragEnter');
 // });

 // this.$().on('dragleave', function(){
 //   console.warn('dragLeave');
 // });
 }


 this.Modal.reopenClass({
 pop: function(options) {
 var modal = this.create(options || {});
 modal.appendTo('.ember-application');
 return modal;
 }
 });
 });
 */
