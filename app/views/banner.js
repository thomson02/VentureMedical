define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/banner.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#banner"),

            initialize: function(options){

            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });
