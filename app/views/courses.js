define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/courses.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.courses").addClass("active");
            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });