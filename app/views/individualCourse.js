define([
    'underscore',
    'jquery',
    'backbone',
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
    'text!templates/courseDate.html',
    'text!templates/courseEnquiry.html',
    'dateFormat'
],
    function(_, $, Backbone, tmplA, tmplB, tmplC, tmplD, tmplE, tmplF, tmplG, tmplH, tmplI, tmplJ, tmplK, tmplL, courseDateTemplate, courseEnquiryTemplate) {

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
            'family': tmplL
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
                this.calendarEvents = [];
                this.calendarUrl = "http://www.google.com/calendar/feeds/venture-medical.com_c4s74l58last7cus0aiuakjk6s@group.calendar.google.com/public/full?alt=json&q=%22" + encodeURIComponent(this.courseName) + "%22&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true";
            },

            fetchDates: function(){
                var that = this;
                $.getJSON(this.calendarUrl, function(data){
                    if (data.feed.entry && data.feed.entry.length > 0){
                        that.calendarEvents = _.map(data.feed.entry, function(entry){
                            var endTime = new Date(entry.gd$when[0].endTime);
                            endTime.setHours(endTime.getHours() - 2)

                            return {
                              title: entry.title.$t,
                              description: entry.content.$t,
                              where: entry.gd$where[0].valueString,
                              when: that.toReadableDateString(new Date(entry.gd$when[0].startTime), endTime)
                            };
                        });
                    }

                    that.$el.find("#tab3").append(_.template(courseDateTemplate, { dates: that.calendarEvents }));
                });
            },

            toReadableDateString: function(startDate, endDate){
                var sameDay = startDate.getFullYear() == endDate.getFullYear() &&
                              startDate.getMonth() == endDate.getMonth() &&
                              startDate.getDay() == endDate.getDay();

                if (sameDay){
                    return startDate.format("mmmm dS, yyyy");
                }
                else{
                    if (startDate.getMonth() == endDate.getMonth()){
                        return startDate.format("mmmm dS") + " and " + endDate.format("dS, yyyy");
                    }
                    else {
                        return startDate.format("mmmm dS") + " to " + endDate.format("mmmm dS, yyyy");
                    }
                }
            },

            render: function(){
                this.$el.html(_.template(templateMapping[this.courseName])());
                this.$el.append(_.template(courseEnquiryTemplate, { courseName: this.courseName }));

                this.fetchDates();
            }
        });

        return publics;
    });