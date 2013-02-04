define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/homePage.html',
    'text!templates/facebookPosts.html'
],
    function(_, $, Backbone, Template, FacebookPostsTemplate) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.home").addClass("active");
            },

            displayFacebookPosts: function(){
                // get auth token
                var that = this;
                $.get('https://graph.facebook.com/oauth/access_token?client_id=152258138262472&client_secret=74f75f611a69cb0a2e47f1d2c897c5a2&grant_type=client_credentials', function(r){
                    var access_token = r.split('=')[1];
                    // get 5 posts
                    $.getJSON('https://graph.facebook.com/VentureMedicalUk/posts?fields=created_time,description,message,name,picture,link&limit=10&access_token=' + access_token, function(response) {
                        var posts = _.chain(response.data).filter(function(post){ return post.message; }).first(5).value();
                        that.$("#facebookPosts").html(_.template(FacebookPostsTemplate, { posts: posts }));
                    });
                });
            },

            render: function(){
                this.$el.html(_.template(Template));
                this.displayFacebookPosts();
            }
        });

        return publics;
    });
