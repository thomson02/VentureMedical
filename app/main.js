requirejs(['jquery', 'backbone', 'router', 'facebook'],
    function($, Backbone, Router, FB) {
        $(function() {

            // init the Facebook JS SDK
            FB.init( {
                appId: '152258138262472', // App ID from the App Dashboard
                channelUrl: '//' + window.location.hostname + '/facebook-channel.html', // Channel File for x-domain communication
                status: true, // check the login status upon init?
                cookie: true, // set sessions cookies to allow your server to access the session?
                xfbml: true // parse XFBML tags on this page?
            });

            FB.login(function(response) {
                if (response.authResponse) {
                    var accessToken = response.authResponse.accessToken;
                }
            });

            new Router({});
            Backbone.history.start({ pushState: false, root: "/index.html" });
        });
    });


