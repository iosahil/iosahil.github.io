/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: DRAWER*/
/* Version: 1.0 Initial Release*/
/* Build Date: 24-09-2015*/
/* Author: LionStyle*/
/* Website: 
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - CLOCK PLUGIN */
/* 07 - SUBSCRIBE FORM */
/* 08 - CONTACT FORM */
/* 09 - CLICKS, HOVERS */

/*-------------------------------------------------------------------------------------------------------------------------------*/

$(function() {


	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, _isresponsive, xsPoint = 767, smPoint = 991, mdPoint = 1199;


	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.open-icon').is(':visible')) _isresponsive = true;
		else _isresponsive = false;
        $('.block').css({'padding-bottom':$('footer').height()});
	}


	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	$('.simple-input input, .simple-input textarea').each(function(){
		if($(this).val()!=="") $(this).parent().addClass('active');
	});
	pageCalculations();


	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		$('#loader-wrapper').fadeOut(1500);
	});


	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();
	}
	$(window).resize(function(){
		resizeCall();
	});
	window.addEventListener("orientationchange", function() {
		resizeCall();
	}, false);

    
    /*===================*/
	/* 06 - CLOCK PLUGIN */
	/*===================*/
    var clock;

    clock = $('.clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
            stop: function() {
                $('.popup-in div').hide();
                $('.popup-clock').show();
                $('.popup').addClass('active');
                setTimeout(function(){
                    $('.popup').removeClass('active');
                },2500);
            }
        }
    });

    var date = new Date("1 Jan 2016");
    var now = new Date();
    var diff = (date.getTime()/1000) - (now.getTime()/1000);  

    clock.setTime(diff);
    clock.setCountdown(true);
    clock.start();
    
    /*=====================*/
	/* 07 - SUBSCRIBE FORM */
	/*=====================*/
	$('#contacts_form').on('submit', function(){		
        var msg = '';
        var error = 0;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test($.trim($('#contacts_form #mail').val()))) {error = 1;msg = msg +  '\n - Your E-mail';}
        if (error){
            $('#mail').addClass('active');
            return false;
        }else{
            var url = 'import.php';
            var email = $.trim($('#contacts_form #mail').val());
            
            $.post(url,{'email':email},function(data){
            	$('#thank-you-subscribe').addClass('active');

			    $('#mail').removeClass('active');
				$('#mail').attr('value','');
                $('#mail').val('');
			});
			return false;
        }
	    return false;
	});

	/*===================*/
	/* 08 - CONTACT FORM */
	/*===================*/

	$('.contact-form').on("submit", function(){
		   
		$('.error-class').removeClass('error-class');						   
		var msg = 'The following fields should be filled:',
			error = 0,
			pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


		if ($.trim($('.contact-form input[name="name"]').val()) === '') {error = 1; $('.contact-form input[name="name"]').addClass('error-class'); msg = msg +  '\n - Name';}
        if (!pattern.test($.trim($('.contact-form input[name="email"]').val()))) {error = 1; $('.contact-form input[name="email"]').addClass('error-class'); msg = msg +  '\n - Email';}
		if ($.trim($('.contact-form textarea[name="text"]').val()) === '') {error = 1; $('.contact-form textarea[name="text"]').addClass('error-class'); msg = msg +  '\n - Your Message';}

        if (error){
			//alert(msg);
        }else{
            var url = 'send_mail.php',
            	name = $.trim($('.contact-form input[name="name"]').val()),
            	email = $.trim($('.contact-form input[name="email"]').val()),
            	subject = $.trim($('.contact-form input[name="subject"]').val()),
            	text = $.trim($('.contact-form textarea[name="text"]').val());

            $.post(url,{'name':name,'email':email,'subject':subject,'text':text},function(data){
	        	$('#thank-you-contact').addClass('active');
	        	$('.contact-form').append('<input type="reset" class="reset-button"/>');
	        	$('.reset-button').click().remove();
	        	$('.simple-input.active').removeClass('active');
			});
        }
	  	return false;
	});

	$(document).on('focus', '.error-class', function(){
		$(this).removeClass('error-class');
	});

	$('.full-screen-popup .close-button, .full-screen-popup .close-layer').on('click', function(){
		$('.full-screen-popup').removeClass('active');	
	});

    /*=====================*/
	/* 09 - CLICKS, HOVERS */
	/*=====================*/

	//material design fields
    $('.simple-input input, .simple-input textarea').on('focus', function(){
		$(this).parent().addClass('active');
	});

	$('.simple-input input, .simple-input textarea').on('blur', function(){
		if($(this).val()==="") $(this).parent().removeClass('active');
	});

	//open-close responsive menu
	$('.menu-button').on('click', function(){
		$('header').toggleClass('active');
	});

	//Parallax
    var ww = $(window).width();
    $(window).on('mousemove', function(e) {
        var ww = $(window).width();
        if(ww > 992) {
            var offsetX = 0.5 - e.pageX / ww;
            $(".parallax").each(function(i, el) {
                var offset = parseInt($(el).data('offset'), 10);
                var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(0) + "px, 0px)";
                $(el).css({
                    '-webkit-transform': translate,
                    'transform': translate,
                    'moz-transform': translate
                });
            });
        }
    });

});