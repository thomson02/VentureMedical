define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/contact.html'
],
    function(_, $, Backbone, Template) {

        var publics = {};

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            events: {
                'click #btnSubmit': 'submitForm'
            },

            submitForm: function(e){
                this.$el.find("#inputName").parent().parent().toggleClass("error", this.$el.find("#inputName").val().length === 0);
                this.$el.find("#inputEmail").parent().parent().toggleClass("error", !this.validateEmail(this.$el.find("#inputEmail").val()));
                this.$el.find("#inputPhone").parent().parent().toggleClass("error", this.$el.find("#inputPhone").val().length === 0);
                this.$el.find("#inputMessage").parent().parent().toggleClass("error", this.$el.find("#inputMessage").val().length === 0);

                if (this.$el.find("div.well-large div.error").length === 0){
                    $.post("/email", {
                        name: this.$el.find("#inputName").val(),
                        email: this.$el.find("#inputEmail").val(),
                        phone: this.$el.find("#inputPhone").val(),
                        message: this.$el.find("#inputMessage").val(),
                        subject: "Contact Form"
                    });

                    this.$el.find(":input").val("");
                }
            },

            validateEmail: function(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.contact").addClass("active");
            },

            render: function(){
                this.$el.html(_.template(Template));
            }
        });

        return publics;
    });
