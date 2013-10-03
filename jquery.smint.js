/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy (@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function() {

	$.fn.smint = function(scrollSpeed) {

		scrollSpeed = (typeof optionalArg === "undefined") ? 500 : scrollSpeed;

		var $smint = this,
			$smintItems = $smint.find('a'),
			$window = $(window),
			//Set the variables needed
			optionLocs = [],
			lastScrollTop = 0,
			menuHeight = $smint.height(),
			curi = -1,
			stickyTop = $smint.offset().top;

		var stickyMenu = function(scrollingDown) {
			// current distance top
			var scrollTop = $(window).scrollTop();

			// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
			if (scrollTop > stickyTop) {
				//Check if he has scrolled horizontally also.
				if ($(window).scrollLeft()) {
					$smint.css({ 'position': 'fixed', 'top': 0, 'left': -$(window).scrollLeft() }).addClass('fxd');
				}
				else {
					$smint.css({ 'position': 'fixed', 'top': 0, 'left': 'auto' }).addClass('fxd');
				}
			}
			else {
				$smint.css({ 'position': 'absolute', 'top': stickyTop, 'left': 'auto' }).removeClass('fxd');
			}

			// Check if the position is inside then change the menu
			// Courtesy of Ryan Clarke (@clarkieryan)
			if (!scrollingDown) {
				while (true) {
					if (scrollTop >= optionLocs[curi].top) {
						$smintItems.removeClass('active');
						$('#' + optionLocs[curi].id).addClass('active');
						break;
					}
					curi++;
					//Added as failsafe, should not be needed.
					/*
					if(curi > optionLocs.length) {
						break;
					}
					*/
				}
			}
			else {
				while (true) {
					if (scrollTop < optionLocs[curi].bottom) {
						$smintItems.removeClass('active');
						$('#' + optionLocs[curi].id).addClass('active');
						break;
					}
					curi--;
				}
			}
		};

		// run function every time you scroll but not needed to be run for each of the $smintItems
		$(window).scroll(function() {
			//Get the direction of scroll
			var st = $(this).scrollTop(),
				scrollingDown = (st > lastScrollTop);
			lastScrollTop = st;
			stickyMenu(scrollingDown);

			// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
			// isnt long enough to scroll to the top of the page and trigger the active state.
			if ($(window).scrollTop() + $(window).height() == $(document).height()) {
				$smintItems.removeClass('active');
				$smintItems.last().addClass('active');
			}
		});

		$smintItems.each(function() {
			if ($(this).hasClass("smint-disableAll")) {
				return;
			}
			//Fill the menu
			var id = this.id,
				matchingSection = $("."+id),
				sectionTop = matchingSection.position().top;
			optionLocs.push({
				top: sectionTop - menuHeight,
				bottom: matchingSection.height() + sectionTop - menuHeight,
				id: id
			});
			curi++;
		});

		//Just as a fail safe check to keep things sorted.
		optionLocs.sort(function(a, b) {
			if (a.top < b.top) {
				return 1;
			}
			if (a.top > b.top) {
				return -1;
			}
			return 0;
		});

		$smintItems.on('click', function(e) {
			// if the link has the smint-disable class it will be ignored 
			// Courtesy of mcpacosy(@mcpacosy)
			if ($(this).hasClass("smint-disable") || $(this).hasClass("smint-disableAll")) {
				return;
			}
			// stops empty hrefs making the page jump when clicked
			// Added after the check of smint-disable so that if its an external href it will work.
			e.preventDefault();
			// gets the distance from top of the div class that matches your button id minus the height of the nav menu. This means the nav wont initially overlap the content.
			// Scroll the page to the desired position!
			$("html, body").animate({
				scrollTop: ($('div.' + $(this).attr('id')).offset().top - menuHeight)
			}, scrollSpeed);
		});
		// check position and make sticky if needed
		$smintItems.first().addClass('active');
	}
})();
