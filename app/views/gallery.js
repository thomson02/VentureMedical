define([
    'underscore',
    'jquery',
    'backbone',
    'text!templates/gallery.html',
    'text!templates/album.html',
    'colorbox'
],
    function(_, $, Backbone, PageTemplate, AlbumTemplate) {

        var publics = {};

        function GetFacebookAlbums(facebookId, callback){
            $.getJSON("http://graph.facebook.com/" + facebookId + "/albums", function(allAlbums){
                var albums = _.filter(allAlbums.data, function(d){
                    return d.type === "normal" && d.name !== "Cover Photos";
                });

                var deferreds = [];
                _.each(albums, function(album){
                    deferreds.push(
                        $.getJSON("http://graph.facebook.com/" + album.id + "/photos", function(photos){
                            album.photos = photos.data;
                        })
                    );
                });

                $.when.apply(null, deferreds).done(function(){
                    var filteredAlbums = _.filter(albums, function(album){
                        return album.photos.length > 0;
                    });

                    callback(filteredAlbums);
                });
            });
        }


        var AlbumView = Backbone.View.extend({
            tagName: "li",

            className: "span3",

            events: {
                'click': 'colorbox'
            },

            colorbox: function(e){
                var groupName = "group" + this.model.get("id");
                $("." + groupName).colorbox({
                    rel: groupName,
                    open: true,
                    onClosed: function(){
                        $.colorbox.remove();
                    }
                });
            },

            render: function(){
                this.$el.html(_.template(AlbumTemplate, this.model.toJSON()));
                return this;
            }
        });

        var AlbumCollectionView = Backbone.View.extend({
            render : function() {
                var that = this;
                $(this.el).empty();

                this.collection.each(function(album) {
                    var view = new AlbumView({
                        model : album
                    });

                    that.$el.append(view.render().el);
                });
            }
        });

        /* VIEW */
        publics.View = Backbone.View.extend({

            el: $("#content"),

            initialize: function(options){
                $("#mainMenu li").removeClass("active");
                $("#mainMenu li.gallery").addClass("active");

                _.bindAll(this, 'updateAlbums', 'render');
                this.albums = new Backbone.Collection();
                this.albums.bind("reset", this.render);
                GetFacebookAlbums("VentureMedicalUK", this.updateAlbums);
            },

            updateAlbums: function(albums){
                if (!this.closed){
                    this.albums.reset(albums);
                }
            },

            onClose: function(){
                this.closed = true;
            },

            render: function(){
                this.$el.html(PageTemplate);

                if (this.albums && this.albums.models.length > 0){
                    this.$el.find("div.container h2 h4.loading").remove();
                    new AlbumCollectionView({ collection: this.albums, el: 'ul.thumbnails' }).render();
                }
                else {
                    this.$el.find("div.container h2").after('<h4 class="loading" style="margin-top: 15px; margin-left: 15px;">Loading...</h4>');
                }
            }
        });

        return publics;
    });