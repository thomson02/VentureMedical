define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/faq.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            events: {
                'click #faq li span': 'toggleFaqs'
            },

            toggleFaqs: function(e){
                $(e.currentTarget).parent().toggleClass("active");
                $(e.currentTarget).siblings("div").slideToggle();
            },

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.faqs").addClass("active");
            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });
