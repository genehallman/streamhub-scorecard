define(function(require) {
	var Hub = require('streamhub-backbone');
	var View = require('streamhub-scorecard');

	return function(sdk, opts) {
		document.getElementById(opts.elementId).innerHTML += [
			"Score 1: <div class='score1'>0</div>",
    		"Score 2: <div class='score2'>0</div>",
    		"Quarter: <div class='quarter'></div>"].join('');
		
        var col = window.col = new Hub.Collection().setRemote({
            sdk: sdk,
            siteId: opts.siteId,
            articleId: opts.articleId4
        });

		var view = new View({
			collection: col,
			el: document.getElementById(opts.elementId),
		});

        view.render();
        
        return view;
    };
});
