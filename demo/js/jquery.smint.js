/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function($){

	$.fn.smint = function( options ) {

		var $smint = this,
			$smintItems = $smint.find('a:not([class*="smint-disable"])'),
			$window = $(window),
			settings = $.extend({}, $.fn.smint.defaults, options),
			// Set the variables needed
			optionLocs = [],
			lastScrollTop = 0,
			menuHeight = $smint.height();


		return $smintItems.each( function(index) {
            
			//Fill the menu
			var id = this.id,
				matchingSection = $("."+id),
				sectionTop = matchingSection.position().top;

			optionLocs.push({
					top: matchingSection.position().top - menuHeight,
					bottom: matchingSection.height() + sectionTop,
					id: id
			});

			///////////////////////////////////

			// get initial top offset for the menu 
			var stickyTop = $smint.offset().top;	

			// check position and make sticky if needed
			var stickyMenu = function(scrollingDown){

				// current distance top
				var scrollTop = $window.scrollTop();

				// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
				if (scrollTop > stickyTop) { 
					$smint.css({ 'position': 'fixed', 'top':0 }).addClass('fxd');	
				} else {
					$smint.css({ 'position': 'absolute', 'top':stickyTop }).removeClass('fxd'); 
				}   

				//Check if the position is inside then change the menu
				// Courtesy of Ryan Clarke (@clarkieryan)


				if(optionLocs[index].top <= scrollTop && scrollTop <= optionLocs[index].bottom){	
					$smintItems.removeClass("active");
					$("#"+id).addClass("active");
					if(optionLocs[index+1])
					{
						if(!scrollingDown){
							$("#"+optionLocs[index+1].id).removeClass("active");
						} else if(index > 0) {
							$("#"+optionLocs[index-1].id).removeClass("active");
						}
					}
				}
			};

			// run function every time you scroll
			$window = $(window);
			$window.scroll(function() {
				//Get the direction of scroll
				var st = $(this).scrollTop(),
					scrollingDown = (st > lastScrollTop), 
					lastScrollTop = st;
				stickyMenu(scrollingDown);

				// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
				// isnt long enough to scroll to the top of the page and trigger the active state.

				/*  Using >= instead of == prevents last item from being 
     		 		*  un-highlighted when the window bounces back in browser
             			*
             			*  -Andrew Teich
             			*/
				if($window.scrollTop() + $window.height() >= $(document).height()) {
					$smintItems.removeClass('active');
					$smintItems.last().addClass('active');
				}
			});

			///////////////////////////////////////
    
        
        	$(this).click(function(e){
				// gets the height of the menu. This is used for off-setting the scroll so the menu doesn't overlap any content in the section/div they just scrolled to
				var selectorHeight = $smint.height();   

        		// stops empty hrefs making the page jump when clicked
				e.preventDefault();

				// get id pf the button you just clicked
		 		var id = this.id;

		 		// if the link has the smint-disable class it will be ignored 
		 		// Courtesy of mcpacosy ‏(@mcpacosy)

                if ($(this).hasClass("smint-disable"))
                {
                    return false;
                }

				// gets the distance from top of the section/div class that matches your button id minus the height of the nav menu. This means the nav wont initially overlap the content.
				var goTo =  $('.'+ id).offset().top -selectorHeight;

				// Scroll the page to the desired position!
				$("html, body").animate({ scrollTop: goTo }, settings.scrollSpeed);

			});	
		});
	}

	$.fn.smint.defaults = { 'scrollSpeed': 500};
})(jQuery);


