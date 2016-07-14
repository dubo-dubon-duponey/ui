/* global $:false */
import Ember from 'ember';
import layout from '../templates/components/ck-tooltip';
const {computed, observer} = Ember;

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
  triggerStrategy: 'hover',// hover focus
  // Title
  title: '',
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">' +
    '</div></div>',
  // Resolved options (account for contentFrom)
  options: computed('animation', 'delay', 'html', 'placement', 'template', 'title', 'triggerStrategy',
    function() {
      return {
        animation: this.get('animation'),
        delay: this.get('delay'),
        html: this.get('html'),
        placement: this.get('placement'),
        template: this.get('template'),
        title: this.get('title'),
        trigger: this.get('triggerStrategy')
      };
    }),

  changeObserver: observer('animation', 'delay', 'html', 'placement', 'template', 'title', 'triggerStrategy',
    function() {
      // Modify the options on the fly
      $(this.element).data('bs.tooltip').options = this.get('options');
    }),

  // Insert the initial popover
  didInsertElement: function(){
    $(this.element).tooltip(this.get('options'));
  },

  layout
});
