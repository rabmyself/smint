/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy (@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function($) {

	$.fn.smint = function( options ) {

		var $smint = this,
			$smintItems = $smint.find('a'),
			$window = $(window),
			settings = $.extend({}, $.fn.smint.defaults, options),
			// Set the variables needed
			optionLocs = [],
			lastScrollTop = 0,
			lastHash = '',
			menuHeight = $smint.height(),
			curi = 0,
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

			if (!scrollingDown) {
				while (true) {
					if (scrollTop >= optionLocs[curi].top) {
						$smintItems.removeClass('active');
						$('#' + optionLocs[curi].id).addClass('active');
						// The foll. makes the page very slow.
						/*if(optionLocs[curi].hash != null && optionLocs[curi].hash != lastHash) {
							window.location.hash = optionLocs[curi].hash;
							lastHash = optionLocs[curi].hash;
						}*/
						break;
					}
					curi--;
				}
			}
			else {
				while (true) {
					if (scrollTop < optionLocs[curi].bottom) {
						$smintItems.removeClass('active');
						$('#' + optionLocs[curi].id).addClass('active');
						// The foll. makes the page very slow.
						/*if(optionLocs[curi].hash != null && optionLocs[curi].hash != lastHash) {
							window.location.hash = optionLocs[curi].hash;
							lastHash = optionLocs[curi].hash;
						}*/
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

		$smintItems.first().addClass('active');

		// This function assumes that the elements are already in a sorted manner.
		$smintItems.each(function() {
			// No need to even add to optionLocs
			if ($(this).hasClass("smint-disableAll")) {
				return;
			}
			//Fill the menu
			var id = this.id,
				matchingSection = $("."+id),
				sectionTop = matchingSection.position().top,
				hash = null;
			if($(this).attr("href").indexOf('#') >= 0) {
				hash = $(this).attr("href").substr($(this).attr("href").indexOf('#') + 1);
			}
			optionLocs.push({
				top: sectionTop - menuHeight,
				bottom: parseInt(matchingSection.height() * 0.9) + sectionTop - menuHeight, //Added so that if he is scrolling down and has reached 90% of the section.
				id: id,
				hash: hash
			});

			// if the link has the smint-disable class it will be ignored 
			// Courtesy of mcpacosy(@mcpacosy)
			// No need to add listener if this is the case.
			if ($(this).hasClass("smint-disable")) {
				return;
			}

			$(this).on('click', function(e) {
				// stops empty hrefs making the page jump when clicked
				// Added after the check of smint-disableAll so that if its an external href it will work.
				//e.preventDefault();
				
				// Scroll the page to the desired position!
				$("html, body").animate({ scrollTop: sectionTop - menuHeight}, settings.scrollSpeed);
			})
		});

		if( (window.location.hash) && (window.location.hash != "#") ) {
			// Scroll to the set hash.
			$('a[href=' + window.location.hash + ']').trigger('click');
		}
		
	}

	$.fn.smint.defaults = { 'scrollSpeed': 500};

})(jQuery);
