requirejs(['jquery', 'backbone', 'router', 'facebook'],
    function($, Backbone, Router, FB) {
        $(function() {

            $.getJSON('https://graph.facebook.com/oauth/access_token?client_id=152258138262472&amp;client_secret=74f75f611a69cb0a2e47f1d2c897c5a2&amp;grant_type=client_credentials', function(r){

            });

            new Router({});
            Backbone.history.start({ pushState: false, root: "/index.html" });
        });
    });


