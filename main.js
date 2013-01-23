define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    ContentTemplate = require('text!streamhub-backbone/templates/Content.html'),
    ContentView = require('streamhub-backbone/views/ContentView'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

var ScorecardView = Backbone.View.extend(
{
    initialize: function (opts) {
        this._contentViewOpts = opts.contentViewOptions || {};
        this._sourceOpts = opts.sources || {};
        this.$el.addClass(this.className);
        this.$el.hide();
        this.lastEventId = 0;

        this.collection.on('add', this._insertItem, this);
        this.collection.on('initialDataLoaded', this.render, this);
    },
    className: "hub-ScorecardView",
    score_history: {
    },
    render: function () {
        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    }
});

ScorecardView.prototype._insertItem = function (item, opts) {
    var json = item.toJSON();
	console.log(json);

	if (json.event > this.lastEventId) {
	    var score1 = this.$el.find('.score1');
	    var score2 = this.$el.find('.score2');
		try {	
			var parts = json.bodyHtml.split(' ');
			if (parts.length >= 3 && parts[0] == "score") {
				var s1 = parseInt(parts[1]);
				var s2 = parseInt(parts[2]);
				var self = this;
				this.$el.fadeOut(function() {
					score1.html(s1);
					score2.html(s2);
					self.$el.fadeIn();
				});
				this.lastEventId = json.event;
			}
		} catch (ex) {
			return;
		}
	}	
    return;
};

return ScorecardView;
});
