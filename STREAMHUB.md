# streamhub-scorecard

streamhub-scorecard is a StreamHub-SDK plugin that uses a stream of content items to power a scoreboard.

The streamhub-scorecard plugin comes with ```ScorecardView```, a view for use with Livefyre's Streamhub. 
It uses the stream's content items' bodyHtml to power a scoreboard unit, useful for live game score broadcasting.
The text must be in the format ```"score <score1> <score2> <quarter text> <datestamp>"``` where score1 and score2 are numbers
for the score boxes and anything after that (separated by a space) and before the datestamp will be used for the quarter text.
