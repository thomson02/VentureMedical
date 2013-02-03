define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/header.html',
    'bootstrap'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            events: {
                'hover #mainMenu ul li a': 'displayMenu'
            },

            el: $("#header"),

            displayMenu: function(e){
                return;
                var $elem = $(e.currentTarget);
                $elem.parent().find("li:first").addClass('first');
                $elem.parent().find("li:last").addClass('last');

                $elem.parent().find("ul").slideDown('normal').show();

            },

            initialize: function(options){
                $('.dropdown-toggle').dropdown();
            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });

