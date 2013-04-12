define(function(require) {
	var Hub = require('streamhub-sdk');
	var View = require('streamhub-scorecard');

	return function(sdk, opts) {
		document.getElementById(opts.elementId).innerHTML += [
			"Score 1: <div class='score1'>0</div>",
    		"Score 2: <div class='score2'>0</div>",
    		"Quarter: <div class='quarter'></div>"].join('');
		
		var view = new View({
			streams: Hub.Streams.forCollection($.extend({}, opts, {articleId: opts.articleId1})).start()
			el: document.getElementById(opts.elementId),
		});
        
        return view;
    };
});
