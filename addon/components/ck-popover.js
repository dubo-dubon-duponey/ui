/* global $:false */
import Ember from 'ember';
const { observer, computed } = Ember;

import layout from '../templates/components/ck-popover';

// XXX if the popover is opened, dynamically changing options will not be updated without a reopen
export default Ember.Component.extend({
  // Fade in and out
  animation: true,
  // Whether to accept html
  html: false,
  // Delay before showing
  delay: 0,
  // Placement
  placement: 'auto', // top bottom left right auto
  // Trigger strategy: click hover focus manual
  triggerStrategy: 'focus',
  // Title
  title: '',
  // Content to use
  content: '',
  contentFrom: '',
  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div>' +
  '<div class="popover-content"></div></div></div>',
  // Resolved options (account for contentFrom)
  options: computed('animation', 'content', 'contentFrom', 'delay', 'html', 'placement', 'template',
    'title', 'triggerStrategy',
    function() {
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
        trigger: this.get('triggerStrategy')
      };
    }),

  changeObserver: observer('animation', 'content', 'contentFrom', 'delay', 'html', 'placement', 'template',
    'title', 'triggerStrategy',
    function() {
      // Modify the options on the fly
      // $(this.element).data('bs.popover').options = this.get('options');
      $(this.element).popover(this.get('options'));
    }),

  // Insert the initial popover
  didInsertElement: function(){
    $(this.element).popover(this.get('options'));
  },

  layout
});
