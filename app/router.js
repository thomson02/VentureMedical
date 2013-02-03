// The backbone router
define([
    'underscore',
    'jquery',
    'backbone',
    'views/header',
    'views/banner',
    'views/footer',
    'views/homePage',
    'views/courses',
    'views/individualCourse',
    'views/gallery',
    'views/instructors',
    'views/faq',
    'views/contact'
],
    function(
        _,
        $,
        Backbone,
        Header,
        Banner,
        Footer,
        HomePage,
        Courses,
        IndividualCourse,
        Gallery,
        Instructors,
        Faq,
        Contact) {

        var AppView = {
            currentView: null,
            showView: function(view) {

                if (this.currentView) {
                    this.currentView.close();
                }

                this.currentView = view;
                this.currentView.render();
            }
        };

        var Router = Backbone.Router.extend({
            routes: {
                'home': 'homePage',
                'courses': 'courses',
                'courses/:courseName': 'individualCourse',
                'instructors': 'instructors',
                'faqs': 'faq',
                'gallery': 'gallery',
                'contact': 'contact',
                '*actions': 'defaultAction'
            },

            initialize: function() {
                this.appView = AppView;
                new Header.View().render();
                new Banner.View().render();
                new Footer.View().render();
            },

            homePage: function(){
                var view = new HomePage.View();
                this.appView.showView(view);
            },

            courses: function(){
                var view = new Courses.View();
                this.appView.showView(view);
            },

            individualCourse: function(courseName){
                var view = new IndividualCourse.View({
                    courseName: courseName
                });
                this.appView.showView(view);
            },

            instructors: function(){
                var view = new Instructors.View();
                this.appView.showView(view);
            },

            faq: function(){
                var view = new Faq.View();
                this.appView.showView(view);
            },

            contact: function(){
                var view = new Contact.View();
                this.appView.showView(view);
            },

            gallery: function(){
                var view = new Gallery.View();
                this.appView.showView(view);
            },

            defaultAction: function(actions) {
                this.homePage();
                console.log('No route:', actions);
            }
        });

        return Router
    });