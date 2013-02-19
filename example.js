define(function(require) {
	var Hub = require('streamhub-backbone');
	var View = require('streamhub-timeline');

	return function(sdk, opts) {
		document.getElementById(opts.elementId).innerHTML += "<div class='score1'>0</div>"+
    		"<div class='score2'>0</div>"+
    		"<div class='quarter'></div>";
		
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
