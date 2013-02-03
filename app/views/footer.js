define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/footer.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#footer"),

            initialize: function(options){

            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });
