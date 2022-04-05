$(function(){

	var contentTop = {}, contentOffset = 0, currentAnchor = window.location.hash.replace('/', ''), scrollFlag = 0, scrollLinkSelector = '.anchor-scroll';

	// Stop animated scroll if the user does something
	$('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e){
		if ( (e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') && scrollFlag ){

			/*-----console test-----*/
			//console.log('stopped');
			/*-----console test-----*/

			$('html,body').stop();
			scrollFlag = 0;
			setScrollAnchor();
		}
	});

	// Animate scroll after clicking menu link
	$(scrollLinkSelector).on('click', function(){
		setImmediateAnchor($(this), 1000);
		return false;
	});

	// Fill object with scroll blocks data (offset and height)
	function setContentTopObject(){
		contentTop = {};
		$(scrollLinkSelector).each(function(){
			$this = $( $(this).attr('href') );
			contentTop[$(this).attr('href')] = {'top':$this.offset().top - contentOffset, 'bottom':$this.offset().top  - contentOffset + $this.outerHeight()};
		});

		/*-----console test-----*/
		//console.log(currentAnchor);
		//for(var p in contentTop) console.log(p+' - '+'top: '+contentTop[p].top+'; bottom: '+contentTop[p].bottom);
		/*-----console test-----*/

	}

	// Set browser bar anchor during scrolling
	function setScrollAnchor(){
		if(!scrollFlag){
			var scrollPositionTop = $(window).scrollTop(), winHalf = $(window).height()*0.75 + scrollPositionTop;
			for(var p in contentTop){
				if(contentTop[p].top<=winHalf && contentTop[p].bottom>winHalf && currentAnchor!=p){

					/*-----console test-----*/
					//console.log('hash changed');
					/*-----console test-----*/

					$(scrollLinkSelector).removeClass('active');
					$(scrollLinkSelector+'[href="'+p+'"]').addClass('active');
					window.location.hash = '#/'+p.substr(1);
					$('.active-slide').removeClass('active-slide');
					$(p).addClass('active-slide');
					currentAnchor = p;
					break;
				}
			}
		}
	}

	// Set browser bar anchor immediately
	function setImmediateAnchor(anchorObject, time){
		scrollFlag = 1;
		$('html,body').stop().animate({ 'scrollTop' : contentTop[anchorObject.attr('href')].top }, time, function(){
			$(scrollLinkSelector).removeClass('active');
			anchorObject.addClass('active');
			window.location.hash = '#/'+anchorObject.attr('href').substr(1);
			currentAnchor = anchorObject.attr('href');
			scrollFlag = 0;

			root = $(window).scrollTop();
			$('.active-slide').removeClass('active-slide');
			$(anchorObject.attr('href')).addClass('active-slide');
		});
	}

	

	$(window).load(function(){
		setContentTopObject();
		if(currentAnchor) setImmediateAnchor($(scrollLinkSelector+'[href="'+currentAnchor+'"]'), 100);
	});

	$(window).scroll(function(){
		setScrollAnchor();
	});

	$(window).resize(function(){
		setContentTopObject();
	});

	

});