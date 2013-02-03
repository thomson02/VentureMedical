define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/homePage.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.home").addClass("active");
            },

            applyFacePile: function(){
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=184906128237600";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            },

            render: function(){
                this.$el.html(_.template(Template));
                this.applyFacePile();
            }
        });

        return publics;
    });
