define([
    'jasmine-jquery',
    'streamhub-scorecard',
    'streamhub-backbone',
    '../MockHubCollection'],
function (jasmine, ScorecardView, Hub, MockHubCollection) {
describe('A ScorecardView', function () {
    it ("can have tests run", function () {
        expect(true).toBe(true);
    });
    it("can do HTML tests",function(){  
        setFixtures('<div id="hub"></div>');  
        $('#hub')
            .append('<li>So</li>')
            .append('<li>So</li>');
        expect($('#hub li').length).toBe(2);  
    });
	
	// construction behavior
    describe('can be constructed', function() {
    	it ("with no options", function () {
	        var view = new ScorecardView();
        	expect(view).toBeDefined();
    	});
    	it ("with empty options", function () {
        	var view = new ScorecardView({});
        	expect(view).toBeDefined();
    	});
    	it ("with only a Mock Hub.Collection", function () {
        	var view = new ScorecardView({
            	collection: new MockHubCollection()
        	});
    	    expect(view).toBeDefined();
    	});
	    it ("with an el", function () {
	        setFixtures('<div id="hub-ScorecardView"></div>');  
	        var view = new ScorecardView({
	            el: $('#hub-ScorecardView')
	        });
	        expect(view).toBeDefined();
	    });
	    it ("with an el and Mock Hub.Collection", function () {
	        setFixtures('<div id="hub-ScorecardView"></div>');  
	        var view = new ScorecardView({
	            collection: new MockHubCollection(),
	            el: $('#hub-ScorecardView')
	        });
	        expect(view).toBeDefined();
	    });
	});
	
	// post construction behavior    
    describe ("after correct construction", function () {
	    var view;
	    
	    beforeEach(function() {
	        setFixtures(
		        '<div id="hub-ScorecardView">'+
		        '<div class="score1"></div>'+
  				'<div class="score2"></div>'+
  				'<div class="quarter"></div>'+
		        '</div>'
		    );
	        view = new ScorecardView({
	            collection: new MockHubCollection(),
	            el: $('#hub-ScorecardView'),
	        });
		});
        it ("should update with the latest score and quarter once .setRemote called", function () {
        	view.collection.setRemote({});
        	view.$el.stop(true, true);
        	expect(view.$el.find('.score1').html()).toBe('8');
        	expect(view.$el.find('.score2').html()).toBe('9');
        	expect(view.$el.find('.quarter').html()).toBe('Quarter 10');
        });
        it ("should only update score and not quarter if no quarter", function () {
        	view.collection.add(view.collection._createMockContent());
        	view.collection.add(view.collection._createMockContent('score 99 99 1234'));
        	view.$el.stop(true, true);
        	expect(view.$el.find('.score1').html()).toBe('99');
        	expect(view.$el.find('.score2').html()).toBe('99');
        	expect(view.$el.find('.quarter').html()).toBe('Quarter 3');
        });
        it ("should not update if the content is invalid", function () {
        	view.collection.add(view.collection._createMockContent());
        	view.collection.add(view.collection._createMockContent('sjsoj 1 2 text 1234'));
        	view.$el.stop(true, true);
        	expect(view.$el.find('.score1').html()).toBe('1');
        	expect(view.$el.find('.score2').html()).toBe('2');
        	expect(view.$el.find('.quarter').html()).toBe('Quarter 3');

        });
        it ("should not update if the content is empty", function () {
        	view.collection.add(view.collection._createMockContent());
        	view.collection.add(view.collection._createMockContent(' '));
        	view.$el.stop(true, true);
        	expect(view.$el.find('.score1').html()).toBe('1');
        	expect(view.$el.find('.score2').html()).toBe('2');
        	expect(view.$el.find('.quarter').html()).toBe('Quarter 3');
        });
    });
}); 
});