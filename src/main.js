/** @module ScorecardView */

define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    ContentTemplate = require('text!streamhub-backbone/templates/Content.html'),
    ContentView = require('streamhub-backbone/views/ContentView'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

/**
 * ScorecardView is a view that uses streamhub data to populate it's child elements.
 * It reads the bodyHtml of each item and trys to match the format
 * "score <score1> <score2> <quarter text> <datestamp>" where score1 and score2 are numbers for the
 * score boxes and anything after that (separated by a space) will be used for the quarter text,
 * before the last item, the datestamp, which is just used for cache busting streamhub.
 * @alias module:ScorecardView
 * @constructor
 * @param {Object.<string, *>} opts A set of options to configure this instance.
 * @param {Object.<string, *>} opts.sources A set of source specific options.
 * @param {string} opts.metaElement The selector of an element inside the bodyHtml of each content
 *        item that contains the meta data for this content item. 
 */
var ScorecardView = Backbone.View.extend(
{
	/**
	 * Initializes a ScorecardView, and is called by backbone during view construction.
	 * Binds to the collection's add event.
	 * @param {Object.<string, *>} opts A set of options to configure this instance.
	 * @protected
	 */
    initialize: function (opts) {
        opts = opts || {};
        this._sourceOpts = opts.sources || {};
        this.lastEventId = 0;

        if (this.collection) {
	        this.collection.on('add', this._insertItem, this);
	        this.collection.on('initialDataLoaded', this.render, this);
        }
    }
});

/**
 * Updates the scoreboard based on the bodyHtml of this content item, if its newer than the latest.
 * @param {Object} item A piece of content that was streamed to this view from Streamhub.
 * @param {Backbone.Collection} col A reference to the collection that this item was added to.
 * @return {Object} The $html element that was inserted.
 * @protected
 */
ScorecardView.prototype._insertItem = function (item, col) {
    var json = item.toJSON();
	if (json.event > this.lastEventId) {
		this.lastEventId = json.event;
	
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
				this.$el.stop(true, true);
				this.$el.fadeOut(function() {
					score1.html(s1);
					score2.html(s2);
					
					if (quarterText.length != 0) { quarterEl.html(quarterText); }
					
					self.$el.fadeIn();
				});
			}
		} catch (ex) {
			return;
		}
	}	
    return;
};

return ScorecardView;
});
