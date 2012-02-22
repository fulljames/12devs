module("Main Model", {
    setup: function() {
        this.testDOM = $('#qunit-fixture ul.origin');
    }
});

test("When creating a new empty Gallery viewmodel", function() {
    var Gallery = new site.models.Gallery();
    var scrollable = Gallery.scrollable;

    equal(Gallery.itemsObservables().length, 0, "there should be no values in itemsObservables");
});

test("When initialising content in Gallery viewmodel", function() {
    var Gallery = new site.models.Gallery();
    var scrollable = Gallery.scrollable;

    Gallery.init(this.testDOM.find('li a'));

    var Items = Gallery.itemsObservables();

    equal(Items.length, 8, "there should be 8 values in itemsObservables");

    var src = Items[0].src.split('/')[Items[0].src.split('/').length -1];

    equal(Items[0].isSelected(),true,"the first item in the itemsObservables should be selected");
    equal(src,'1.jpg',"the first item in the itemsObservables should have the correct src");
    equal(Items[0].caption,'Image 1 Caption',"the first item in the itemsObservables should have the correct caption");

    equal(Items[1].isSelected(),false,"the second item in the itemsObservables should not be selected");

    Gallery.setSelected(Items[1]);

    equal(Items[0].isSelected(),false,"the first item in the itemsObservables should not be selected");
    equal(Items[1].isSelected(),true,"the second item in the itemsObservables should be selected");

});

module("Scrollable Area View Model", {
    setup: function () {
    }
});

test("When initialising scrollableArea UI scrolling values", function() {
    var scrollableArea = new site.models.ScrollableArea(true);
    scrollableArea.measureContent = function () { return 0; };

    equal(scrollableArea.isScrollable(), false, " scrollableArea isScrollable should initially be false");
    equal(scrollableArea.canScrollLeft(), false, " scrollableArea canScrollLeft should initially be false");
    equal(scrollableArea.canScrollRight(), false, " scrollableArea canScrollRight should initially be false");
    equal(scrollableArea.scrollThreshold(), 0, " scrollableArea scrollThreshold should initially be 0");
    equal(scrollableArea.scrollValue(), 0, " scrollableArea scrollValue should initially be 0");
    equal(scrollableArea.calculatedScrollValue(), 0, " scrollableArea calculatedScrollValue should initially be 0");
    equal(scrollableArea.contentSize(), 0, " scrollableArea contentSize should initially be 0");
});

test("When changing the size of the content when scrollInitTo is 'left' (default)", function () {
    var scrollableArea = new site.models.ScrollableArea(true);
    scrollableArea.measureContent = function () { return 0; };

    scrollableArea.scrollThreshold(980);
    scrollableArea.contentSize(400);

    equal(scrollableArea.scrollThreshold(), 980, " scrollableArea scrollThreshold should be initially be 980");
    equal(scrollableArea.contentSize(), 400, " scrollableArea contentSize should initially be 400");
    equal(scrollableArea.isScrollable(), false, " scrollableArea isScrollable should be set to false");
    equal(scrollableArea.scrollValue(), 0, " scrollableArea scrollValue should be set to 0");
    equal(scrollableArea.calculatedScrollValue(), 0, " scrollableArea calculatedScrollValue should be set to 0");

    scrollableArea.contentSize(1000);

    equal(scrollableArea.contentSize(), 1000, " scrollableArea contentSize should be updated to 1000");
    equal(scrollableArea.isScrollable(), true, " scrollableArea isScrollable should be set to true");
    equal(scrollableArea.canScrollLeft(), false, " scrollableArea canScrollLeft should be set to false");
    equal(scrollableArea.canScrollRight(), true, " scrollableArea canScrollRight should be set to true");
    equal(scrollableArea.scrollValue(), 0, " scrollableArea scrollValue should be set to 0");
    equal(scrollableArea.calculatedScrollValue(), 0, " scrollableArea calculatedScrollValue should be set to 0");

    scrollableArea.contentSize(900);

    equal(scrollableArea.contentSize(), 900, " scrollableArea contentSize should be updated to 900");
    equal(scrollableArea.isScrollable(), false, " scrollableArea isScrollable should be set to false");
    equal(scrollableArea.canScrollLeft(), false, " scrollableArea canScrollLeft should be set to false");
    equal(scrollableArea.canScrollRight(), false, " scrollableArea canScrollRight should be set to false");
    equal(scrollableArea.scrollValue(), 0, " scrollableArea scrollValue should be set to 0");
    equal(scrollableArea.calculatedScrollValue(), 0, " scrollableArea calculatedScrollValue should be set to 0");
});

test("When writing to the calculated scroll value", function () {
    var scrollableArea = new site.models.ScrollableArea(true);
    scrollableArea.measureContent = function () { return 0; };

    scrollableArea.scrollThreshold(980);
    scrollableArea.contentSize(1000);
    scrollableArea.calculatedScrollValue(-100);

    equal(scrollableArea.calculatedScrollValue(), -100, " scrollableArea calculatedScrollValue should be set to -100");
    equal(scrollableArea.scrollValue(), -100, " scrollableArea calculatedScrollValue should be set to -80");
});