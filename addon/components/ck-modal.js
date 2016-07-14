/* global $:false */
import Ember from 'ember';
const {observer} = Ember;
import layout from '../templates/components/ck-modal';

var uid = 0;

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
      keyboard: this.get('keyboard'),
      show: this.get('show')
    });
  },

  actions: {
    cancel: function(){
      this.set('show', false);
      this.sendAction('cancel');
    },
    ok: function(){
      this.set('show', false);
      this.sendAction('ok');
    },
  },

  layout

//  id: '',
//  ariaHidden: true,
//  attributeBindings: ['id', 'ariaHidden:aria-hidden'],

});

/*

 this.Modal = Ember.View.extend(Ember.DeferredMixin, {


 // Aria description ftw
 ariaDescribedby: false,

 // Might be, but not neccessarily
 id: null,
 layout: Ember.Handlebars.compile('  <div class="modal-dialog">\
 <div class="modal-content">\
 <div class="modal-header">\
 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
 <h4 {{bindAttr id=view.ariaLabelledby}} class="modal-title">{{view.title}}</h4>\
 </div>\
 <div {{bindAttr id=view.ariaDescribedby}} class="modal-body">\
 {{yield}}{{{view.content}}}\
 </div>\
 <div class="modal-footer">\
 {{#if view.cancel}}\
 <button type="button" class="btn btn-default" data-dismiss="modal">{{view.cancel}}</button>\
 {{/if}}\
 <button type="button" class="btn btn-primary" rel="emstrap-modal-primary">{{view.ok}}</button>\
 </div>\
 </div>\
 </div>'),

 defaultTemplate: Ember.Handlebars.compile(''),

 keyPress: function(e){
 var code = e.keyCode || e.which;
 if(code == 13) {
 this.$('[rel=emstrap-modal-primary]').trigger('click');
 e.preventDefault();
 e.stopPropagation();
 }
 },

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

 // Due to the late insertion mechanism, we can't use Ember click handlers
 // click: function(event) {
 //   if (event.target.getAttribute('rel') == 'emstrap-modal-primary') {
 //     this.set('confirmed', true);
 //     this.$().modal('hide');
 //   }
 // },
 });

 this.Modal.reopenClass({
 pop: function(options) {
 var modal = this.create(options || {});
 modal.appendTo('.ember-application');
 return modal;
 }
 });
 });
 */
