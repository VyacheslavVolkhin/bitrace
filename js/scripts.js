$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};

    

    //more
    $('.js-more-link a').on('click', function () {
        let maxMoreHeight = $(this).parents('.js-more-wrap').find('.js-more-content').height();
        if ($(this).parents('.js-more-wrap').hasClass('opened')) {
            $(this).parents('.js-more-wrap').removeClass('opened');
        } else {
            $(this).parents('.js-more-wrap').addClass('opened').find('.js-more-content-wrap').css('max-height', maxMoreHeight);
        }
        return false;
    })

    //swipebox
    if (!!$('[data-swipebox]').offset()) {
        $('[data-swipebox]').swipebox();
    }


    //tooltip
    if (!!$('.js-tooltip').offset()) {
        $('.js-tooltip').tooltip({
            position: {my: "center center", at: "center top-20"}
        })
        $(document).on('click', '.js-tooltip', function () {
            if ($(window).innerWidth() < 1024) {
                $(this).tooltip();
                $(this).tooltip("open");
            }
        })
    }
    
    
    //header menu
    $('.popup-menu-wrap .submenu>.btn-menu').on('click', function () {
        if ($(window).innerWidth() < 1024) {
            $(this).toggleClass('active');
            return false;
        }
    })


    //toggle menu all
    $('.main-menu-wrap li ul').each(function () {
        $(this).parent().addClass('submenu-inner');
    })
    $('.main-menu-wrap li a').on('click', function () {
        if ($(this).next('ul').length > 0) {
            if ($(this).next('ul').css('display') == 'block') {
                $(this).next('ul').slideUp(200).parent('li').removeClass('submenu-open');
            } else {
                $(this).next('ul').slideDown(200).parent('li').addClass('submenu-open');
            }
            return false;
        }
    })

    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show');
            $('.js-popup-wrap').removeClass('popup-right');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
            pLeft = $(this).parent('.js-popup-wrap').find('.js-popup-block').offset().left;
            pWidth = $(this).parent('.js-popup-wrap').find('.js-popup-block').outerWidth();
            pMax = pLeft + pWidth;
            if ( pMax > $('.wrap').width() ) {
                $(this).parent('.js-popup-wrap').addClass('popup-right');
            } else {
                $('.js-popup-wrap').removeClass('popup-right');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function() {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
                $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
            }
            var currentSelect = $(this).find('.js-popup-block').find('.active').html();
            $(this).find('.js-btn-toggle').html(currentSelect);
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-block').removeClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
                    $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
                }
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').html(currentSelect);
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })

    //tabs
    $('.js-tabs-nav').each(function() {
        $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
    })
    $('.js-tab-title').each(function() {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
        }
    })
    $('.js-tabs-nav').on('click', 'a[data-tab]', function() {
        if ($(this).hasClass('active')) {} else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click' , function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
        }
    })


    //slider-box
    if (!!$('.slider-box').offset()) {
        $('.slider-box .slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: true,
            rows: 1,
            swipeToSlide: true,
            prevArrow: false,
            nextArrow: false,
            autoplay: true, 
            autoplaySpeed: 5000,
        });
    }


    //tarifs-box
    if (!!$('.tarifs-box').offset()) {
        $('.tarifs-box .slider').slick({
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                    }
                },
            ]
        });
    }
	
});


