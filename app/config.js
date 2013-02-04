requirejs.config({
    deps: ['main'],
    paths: {
        'jquery': 'components/jquery/jquery',
        'underscore': 'components/underscore/underscore',
        'backbone': 'components/backbone/backbone',
        'bootstrap': 'components/bootstrap/bootstrap.min',
        'text': 'components/requirejs/plugins/text',
        'colorbox': 'components/jquery/plugins/colorbox-min',
        'dateFormat': 'components/utils/date.format',
        'facebook': 'https://connect.facebook.net/en_US/all/debug.js'
    },
    shim: {
        'facebook': {
            exports: 'FB'
        },
        'underscore': {
            exports: '_'
        },
        'colorbox': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone',
            init: function($, _) {

                // Extend Backbone object
                Backbone.View.prototype.close = function() {
                    this.$el.empty();   // this.remove();
                    this.unbind();
                    if (this.onClose) {
                        this.onClose();
                    }
                };

                return Backbone;
            }
        }
    }
});
