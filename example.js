define(function(require) {
	var Hub = require('streamhub-sdk');
	var View = require('streamhub-scorecard');

	return function(el) {
		var streams = Hub.StreamManager.create.livefyreStreams({
		    network: "labs-t402.fyre.co",
		    environment: "t402.livefyre.com",
		    siteId: "303827",
		    articleId: 'gene_publish_0'
		});

		el.innerHTML += [
			"Score 1: <div class='score1'>0</div>",
    			"Score 2: <div class='score2'>0</div>",
    			"Quarter: <div class='quarter'></div>"].join('');
		
		var view = new View({el: el});
		
		streams.bind(view).start();
		
        	return view;
	};
});
