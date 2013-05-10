# streamhub-scorecard

streamhub-scorecard is a StreamHub-SDK plugin that uses a stream of content items to power a scoreboard.

## Views:
The streamhub-scorecard plugin comes with ```ScorecardView```, a view for use with Livefyre's Streamhub. 
It uses the stream's content items' bodyHtml to power a scoreboard unit, useful for live game score broadcasting.
The text must be in the format ```"score __score1__ __score2__ __quarter text__ __datestamp__"``` where score1 and score2 are numbers
for the score boxes and anything after that (separated by a space) and before the datestamp will be used for the quarter text.
The datestamp is just used for cache busting streamhub.
The score boxes are identified by the cssClass ```score1``` & ```score2```, and the quarter by ```quarter```.

## To run the example site:

    $ git clone git@github.com:genehallman/streamhub-scorecard.git
    $ cd streamhub-scorecard
    $ npm install
    $ npm start


+ To see the demo, browse to [localhost:8080](http://localhost:8080)
+ To run the tests, browse to [localhost:8080/tests/index.html](http://localhost:8080/tests/index.html)
+ To see the docs, browse to [localhost:8080/docs/index.html](http://localhost:8080/docs/index.html)

## To install on your site:
The easiest way to use the streamhub-scorecard is to install it via [bower](http://twitter.github.com/bower/) and [requirejs](http://requirejs.org/):

#### Install via Bower
Bower can be used to automatically download streamhub-scorecard and its dependency tree.

```
$ bower install git://github.com/genehallman/streamhub-scorecard.git
```

#### Use via Require.js
Once you've called bower install, you'll have a suite of components available to you in the ```./components``` directory. These can be accessed via Require.js, as shown below.

    <div id="scorecard">
      <div class="score1"></div>
      <div class="score2"></div>
      <div class="quarter"></div>
    </div>
    <!-- Get requirejs -->
    <script src="components/requirejs/require.js" type="text/javascript"></script>
    <!-- Get Livefyre sdk loader -->
    <script src="http://zor.t402.livefyre.com/wjs/v3.0.sdk/javascripts/livefyre.js"></script>

    <script type="text/javascript">

    require.config({
      baseUrl: 'components',
      paths: {
        jquery: 'jquery/jquery',
        text: 'requirejs-text/text',
        backbone: 'backbone/backbone',
        underscore: 'underscore/underscore',
        mustache: 'mustache/mustache',
        isotope: 'isotope/jquery.isotope',
        fyre: 'http://zor.t402.livefyre.com/wjs/v3.0/javascripts/livefyre',
      },
      packages: [ {
        name: 'streamhub-backbone',
        location: 'streamhub-backbone'
      },
      {
        name: "streamhub-scorecard",
        location: "streamhub-scorecard/src"
      }],
      shim: {
        backbone: {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
        },
        underscore: {
          exports: '_'
        },
        isotope: {
          deps: ['jquery']
        },
        fyre: {
          exports: 'fyre'
        },
      }
    });
      
    // Now to load the example
    require(['streamhub-backbone', 'streamhub-scorecard'], function(Hub, View) {
      fyre.conv.load({network: "network.fyre.co"}, [{app: 'sdk'}], function(sdk) {
        var col = window.col = new Hub.Collection().setRemote({
            sdk: sdk,
            siteId: "12345",
            articleId: "article_1"
        });
              
        var view = new View({
            collection: col,
            el: document.getElementById("scorecard"),
        });
        view.render();
      });
    });
    <script>
