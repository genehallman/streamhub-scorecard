# streamhub-scorecard

A StreamHub App that can power a real-time scoreboard of a live sporting event.

## Getting Started

The quickest way to use streamhub-scorecard is to use the built version hosted on Livefyre's CDN.

### Dependencies

TODO: UPDATE THIS AFTER GENE MERGES CODE CHANGES AND APP GALLERY CAN BUILD THIS

streamhub-scorecard depends on [streamhub-sdk](https://github.com/livefyre/streamhub-sdk). Ensure it's been included in your page.

	<script src="http://cdn.livefyre.com/libs/sdk/v1.0.1-build.147/streamhub-sdk.min.gz.js"></script>

Include streamhub-scorecard too.

	<script src="http://cdn.livefyre.com/libs/apps/genehallman/streamhub-scorecard/v0.0.0-build.20/streamhub-wall.min.js"></script>
	
Optionally, include some reasonable default CSS rules for StreamHub Content

    <link rel="stylesheet" href="http://cdn.livefyre.com/libs/sdk/v1.0.1-build.147/streamhub-sdk.gz.css" />

### Usage

1. Add some HTML to your page for streamhub-scorecard to render in. This element should have descendant elements with classes `score1` and `score2` for scores, and `quarter` to display the quarter text or time remaining in the game.

        <div id="scoreboard">
        <p>Team A<span class="score1"></span></p>
        <p>Team B<span class="score2"></span></p>
        <p class="quarter"></p>
        </div>

1. Require streamhub-sdk and streamhub-scorecard

        var Hub = Livefyre.require('streamhub-sdk'),
            ScoreView = Livefyre.require('streamhub-scorecard');
    
2. Create a ScoreView, passing the DOMElement to render in

        var scoreView = new ScoreView({
            el: document.getElementById('scoreboard')
        });
    
3. Get scores from StreamHub by creating a StreamManager for a Livefyre Collection.

    This Collection must be filled with Content of the form ```"score <score1> <score2> <quarter text> <datestamp>"``` where `score1` and `score2` are numbers
for the score boxes, `quarter text` is the quarter and/or time remaining, and `datestamp` is an integer Unix timestamp.


        var streamManager = Hub.StreamManager.create.livefyreStreams({
            network: "labs.fyre.co",
            siteId: 315833,
            articleId: 'example'
        });
    
4. And bind the streamManager to your scoreboard and start it up

        streamManager.bind(scoreView).start();

You now have a real-time scoreboard! See this all in action on [this jsfiddle](http://jsfiddle.net/59sT9/).

## Local Development

Instead of using a built version of streamhub-scorecard from Livefyre's CDN, you may wish to fork, develop on the repo locally, or include it in your existing JavaScript application.

Clone this repo

    git clone https://github.com/genehallman/streamhub-scorecard

Development dependencies are managed by [npm](https://github.com/isaacs/npm), which you should install first.

With npm installed, install streamhub-scorecard dependencies. This will also download [Bower](https://github.com/bower/bower) and use it to install browser dependencies.

    cd streamhub-scorecard
    npm install

This repository's package.json includes a helpful script to launch a web server for development

    npm start

You can now visit [http://localhost:8080/](http://localhost:8080/) to see an example scoreboard loaded via RequireJS.

# StreamHub

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is used by the world's biggest brands and publishers to power their online Content Communities. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. Want StreamHub? [Contact Livefyre](http://www.livefyre.com/contact/).