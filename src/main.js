/** @module ScorecardView */

define(function(require) {
    var View = require('streamhub-sdk/view');

	/**
	 * ScorecardView is a view that uses streamhub data to populate it's child elements.
	 * It reads the bodyHtml of each item and trys to match the format
	 * "score <score1> <score2> <quarter text> <datestamp>" where score1 and score2 are numbers for the
	 * score boxes and anything after that (separated by a space) will be used for the quarter text,
	 * before the last item, the datestamp, which is just used for cache busting streamhub.
	 * @alias module:ScorecardView
	 * @constructor
	 * @param {Object.<string, *>} opts A set of options to configure this instance.
	 * @param {string} opts.metaElement The selector of an element inside the bodyHtml of each content
	 *        item that contains the meta data for this content item. 
	 */
	var ScorecardView = function (opts) {
        opts = opts || {};
        View.call(this, opts);
        this.$el = $(this.el);
        this.lastEventId = 0;
        
        var self = this;
        this.on('add', function(content, stream) {
	           self.add(content, stream);
        });
    };
    $.extend(ScorecardView.prototype, View.prototype);

	/**
	 * Updates the scoreboard based on the bodyHtml of this content item, if its newer than the latest.
	 * @param {Object} item A piece of content that was streamed to this view from Streamhub.
	 * @param {Backbone.Collection} col A reference to the collection that this item was added to.
	 * @return {Object} The $html element that was inserted.
	 * @protected
	 */
	ScorecardView.prototype.add = function (item, stream) {
		if (item.meta.event > this.lastEventId) {
		    var score1 = this.$el.find('.score1');
		    var score2 = this.$el.find('.score2');
		    var quarterEl = this.$el.find('.quarter');
		    //strip html tags
		    var text = $(document.createElement('div')).html(item.body || "").text().trim();
			
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
						
						self.$el.fadeIn(function() {
							self.$el.css('opacity', '1');
						});
					});
                    this.lastEventId = item.meta.event;
				}
			} catch (ex) {
				return;
			}
		}	
	    return;
	};

    return ScorecardView;
});
