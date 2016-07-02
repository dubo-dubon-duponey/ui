// v1
/* global $:false */
import Ember from 'ember';
const { observer, computed } = Ember;

// XXX if the popover is opened, dynamically changing content will not be updated without a reopen
export default Ember.Component.extend({
  animation: true,
  content: '',
  contentFrom: '',
  delay: 0,
  html: false,
  placement: 'auto', // top bottom left right auto
  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div><div class="popover-content"></div></div></div>',
  title: '',
  triggerAction: 'focus', // click hover focus manual
  options: computed('animation', 'content', 'delay', 'html', 'placement', 'template', 'title', 'tiggerAction', function() {
    var content = this.get('content');
    var html = this.get('html');
    var cf = this.get('contentFrom');
    if (cf) {
      content = function(){
        return $(cf).html();
      };
      html = true;
    }
    return {
      animation: this.get('animation'),
      content: content,
      delay: this.get('delay'),
      html: html,
      placement: this.get('placement'),
      template: this.get('template'),
      title: this.get('title'),
      trigger: this.get('triggerAction')
    };
  }),

  changeObserver: observer('animation', 'content', 'delay', 'html', 'placement', 'template', 'title', 'tiggerAction', function() {
    // Hack on the ass of the flush directly!
    $(this.element).data('bs.popover').options = this.get('options');
  }),

  didInsertElement: function(){
    $(this.element).popover(this.get('options'));
  }
});
