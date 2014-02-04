require([
	'jasmine-html',
	'jasmine-jquery',
	'streamhub-sdk/jquery'],
function (jasmine, jasmineJQuery, $) {
	// Test!
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var specs = [];
	specs.push('tests/spec/ScorecardView');

	$(function(){
		require(specs, function(){
			jasmineEnv.execute();
		});
	});
});
