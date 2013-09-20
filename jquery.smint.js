/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy â€(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


	(function(){


	$.fn.smint = function( options ) {

		// adding a class to users div
		$(this).addClass('smint')

		var settings = $.extend({
		            'scrollSpeed '  : 500
		}, options);

		//Set the variables needed
		var optionLocs = new Array();
		var lastScrollTop = 0;
		var menuHeight = $(".smint").height();

		return $('.smint a').each( function(index) {

			if ( settings.scrollSpeed ) {
				var scrollSpeed = settings.scrollSpeed
			}

			//Fill the menu
			var id = $(this).attr("id");
			optionLocs.push(Array($("."+id).position().top-menuHeight, $("."+id).height()+$("."+id).position().top, id));

			///////////////////////////////////

			// get initial top offset for the menu
			var stickyTop = $('.smint').offset().top;

			// check position and make sticky if needed
			var stickyMenu = function(direction){

				// current distance top
				var scrollTop = $(window).scrollTop();

				// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
				if (scrollTop > stickyTop) {
					$('.smint').css({ 'position': 'fixed', 'top':0 }).addClass('fxd');
				} else {
					$('.smint').css({ 'position': 'absolute', 'top':stickyTop }).removeClass('fxd');
				}

				//Check if the position is inside then change the menu
				// Courtesy of Ryan Clarke (@clarkieryan)


				if(optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]){
					if(direction == "up"){
						$("#"+id).addClass("active");
						$("#"+optionLocs[index+1][2]).removeClass("active");
					} else if(index > 0) {
						$("#"+id).addClass("active");
						$("#"+optionLocs[index-1][2]).removeClass("active");
					} else if(direction == undefined){
						$("#"+id).addClass("active");
					}
					$.each(optionLocs, function(i){
						if(id != optionLocs[i][2]){
							console.log(i);
							$("#"+optionLocs[i][2]).removeClass("active");
						}
					});
				}
			};

			// run functions
			stickyMenu();

			// run function every time you scroll
			$(window).scroll(function() {
				//Get the direction of scroll
				var st = $(this).scrollTop();
				if (st > lastScrollTop) {
				    direction = "down";
				} else if (st < lastScrollTop ){
				    direction = "up";
				}
				lastScrollTop = st;
				stickyMenu(direction);

				// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
				// isnt long enough to scroll to the top of the page and trigger the active state.

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
       			$('.smint a').removeClass('active')
       			$('.smint a').last().addClass('active')
   }
			});

			///////////////////////////////////////


        	$(this).on('click', function(e){
				// gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
				var selectorHeight = $('.smint').height();

        		// stops empty hrefs making the page jump when clicked
				e.preventDefault();

				// get id pf the button you just clicked
		 		var id = $(this).attr('id');

		 		// if the link has the smint-disable class it will be ignored
		 		// Courtesy of mcpacosy â€(@mcpacosy)

                if ($(this).hasClass("smint-disable"))
                {
                    return false;
                }

				// gets the distance from top of the div class that matches your button id minus the height of the nav menu. This means the nav wont initially overlap the content.
				var goTo =  $('.'+ id).offset().top -selectorHeight;

				// Scroll the page to the desired position!
				$("html, body").animate({ scrollTop: goTo }, scrollSpeed);

			});
		});
	}


})();
