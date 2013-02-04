requirejs(['jquery', 'backbone', 'router'],
    function($, Backbone, Router) {
        $(function() {
            new Router({});
            Backbone.history.start({ pushState: false, root: "/index.html" });
        });
    });


