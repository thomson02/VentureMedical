define([
    'underscore',
    'jquery',
    'backbone',
    'calendarEvents',
    'text!templates/courses/adventurous_activities.html',
    'text!templates/courses/security_operatives.html',
    'text!templates/courses/canine.html',
    'text!templates/courses/intervention.html',
    'text!templates/courses/general_and_dental.html',
    'text!templates/courses/hse_emergency.html',
    'text!templates/courses/hse_refresher.html',
    'text!templates/courses/hse_work.html',
    'text!templates/courses/childcare.html',
    'text!templates/courses/aed_training.html',
    'text!templates/courses/anaphylaxis.html',
    'text!templates/courses/family.html',
    'text!templates/courses/bike.html',
    'text!templates/courses/winter_hills.html',
    'text!templates/courses/outdoor_refresh.html',
    'text!templates/courseDate.html',
    'text!templates/courseEnquiry.html',
    'dateFormat'
],
    function(_, $, Backbone, calendarEvents, tmplA, tmplB, tmplC, tmplD, tmplE, tmplF, tmplG, tmplH, tmplI, tmplJ, tmplK, tmplL, tmplM, tmplN, tmplO, courseDateTemplate, courseEnquiryTemplate) {

        var publics = {};

        var templateMapping = {
            'adventurous_activities': tmplA,
            'security_operatives': tmplB,
            'canine': tmplC,
            'intervention': tmplD,
            'general_and_dental': tmplE,
            'hse_emergency': tmplF,
            'hse_refresher': tmplG,
            'hse_work': tmplH,
            'childcare': tmplI,
            'aed_training': tmplJ,
            'anaphylaxis': tmplK,
            'family': tmplL,
            'bike': tmplM,
            'winter_hills': tmplN,
            'outdoor_refresh': tmplO
        };

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            events: {
              'click a.enquire': 'displayEnquiryModal',
              'click #btnEnquiry': 'sendEnquiry'
            },

            displayEnquiryModal: function(e){
                e.preventDefault();
                var courseName = this.$el.find("div.container h2").first().text();
                var courseDate = $(e.currentTarget).parent().siblings("div.span10").find("h4").text();
                this.$el.find("#inputMessage").text("I would like to enquire about the " + courseName + " on " + courseDate + ".");
                this.$el.find("#modalEnquiry").modal();
            },

            sendEnquiry: function(e){
                this.$el.find("#inputName").parent().parent().toggleClass("error", this.$el.find("#inputName").val().length === 0);
                this.$el.find("#inputEmail").parent().parent().toggleClass("error", !this.validateEmail(this.$el.find("#inputEmail").val()));
                this.$el.find("#inputPhone").parent().parent().toggleClass("error", this.$el.find("#inputPhone").val().length === 0);
                this.$el.find("#inputMessage").parent().parent().toggleClass("error", this.$el.find("#inputMessage").val().length === 0);

                if (this.$el.find("div.modal-body div.error").length === 0){
                    $.post("/email", {
                            name: this.$el.find("#inputName").val(),
                            email: this.$el.find("#inputEmail").val(),
                            phone: this.$el.find("#inputPhone").val(),
                            message: this.$el.find("#inputMessage").val(),
                            subject: "Course Enquiry"
                        });

                    this.$el.find("#modalEnquiry").modal("hide");
                }
            },

            validateEmail: function(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.courses").addClass("active");

                this.courseName = options.courseName;
            },

            render: function(){
                this.$el.html(_.template(templateMapping[this.courseName])());
                this.$el.append(_.template(courseEnquiryTemplate, { courseName: this.courseName }));

                var dates = calendarEvents && calendarEvents[this.courseName] ? calendarEvents[this.courseName] : [];
                dates = _.filter(dates, function(d){
                   return d.date >= new Date(); // in the future
                });

                this.$el.find("#tab3").append(_.template(courseDateTemplate, { dates: dates }));
            }
        });

        return publics;
    });