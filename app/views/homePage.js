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

                // get auth token
                $.get('https://graph.facebook.com/oauth/access_token?client_id=152258138262472&client_secret=74f75f611a69cb0a2e47f1d2c897c5a2&grant_type=client_credentials', function(r){
                    var access_token = console.log(r.split('=')[1]);
                    $.getJSON('https://graph.facebook.com/VentureMedicalUk/posts?limit=5&access_token=' + access_token, function(response) {

                    });
                });



                /*
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=184906128237600";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
                */
            },

            render: function(){
                this.$el.html(_.template(Template));
                this.applyFacePile();
            }
        });

        return publics;
    });
