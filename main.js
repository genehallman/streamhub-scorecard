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
        this.lastEventId = 0;

        this.collection.on('add', this._insertItem, this);
        this.collection.on('initialDataLoaded', this.render, this);
    }
});

ScorecardView.prototype._insertItem = function (item, opts) {
    var json = item.toJSON();
	if (json.event > this.lastEventId) {
	    var score1 = this.$el.find('.score1');
	    var score2 = this.$el.find('.score2');
	    var quarterEl = this.$el.find('.quarter');
	    
	    //strip html tags
	    var text = $(document.createElement('div')).html(json.bodyHtml).text().trim();
		try {
			var parts = text.split(' ');
			if (parts.length >= 3 && parts.shift() == "score") {
				var s1 = parseInt(parts.shift());
				var s2 = parseInt(parts.shift());
				var self = this;
				parts.pop(); // popping "date time" from end, for cache busting
				var quarterText = parts.join(' ');
				
				this.$el.fadeOut(function() {
					score1.html(s1);
					score2.html(s2);
					
					if (quarterText.length != 0) { quarterEl.html(quarterText); }
					
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
