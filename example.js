define(function(require) {
	var Hub = require('streamhub-sdk');
	var View = require('streamhub-scorecard');

    var MockStream = function() {
	    this.score1 = 0;
	    this.score2 = 0;
	    this.quarter = 1;
	    this.iterator = 0;
	    this.intervalId = null;
    };
    MockStream.prototype = new Hub.Stream();
    
    MockStream.prototype._read = function() {
        var self = this;
        if (self.intervalId) {
            clearInterval(self.intervalId);
        }
        self.intervalId = setInterval(function() {
	        self.score1 = self.score1 + Math.floor(Math.random() * 10);
	        self.score2 = self.score2 + Math.floor(Math.random() * 10);
	        self.iterator++;
	        if (self.iterator > 8) {
	            self.iterator = 0;
	            self.quarter++;
	            if (self.quarter > 4) {
	                self.quarter = 1;
	                self.score1 = 0;
	                self.score2 = 0;
	            }
	        }
	        var content = new Hub.Content(["score", self.score1, self.score2, "Quarter", self.quarter, Date.now()].join(" "));
	        content.meta = {event: Date.now()};
	        self._push(content);
	        console.log('here', self);
        }, 1500);
    };
    
	return function(el) {
		var streams = new Hub.StreamManager({ main: new MockStream() });

		var innerEl = document.createElement("div");
		innerEl.innerHTML = [
			"<div class='score1'>0</div>",
    		"<div class='score2'>0</div>",
    		"<div class='quarter'></div>"].join('');
		
		el.appendChild(innerEl);
		
		var view = new View({el: innerEl});
		
		streams.bind(view).start();
		
    	return view;
	};

});
