$(function() {
    // Globe vars
    var $window = $(window),
        $body = $('body, html'),
        $document = $(document);

    jQuery.scrollSpeed(100, 800);

    // Anchors
    $document.on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();
        $body.animate({
            scrollTop: ($($.attr(this, 'href')).offset().top) - 75
        }, 1000, $.bez([.8,0,.2,1]));
    });

    // Ajax
    function ajaxRec(query, url) {
        $.ajax({
            url: '../includes/' + url +'.php',
            method: 'POST',
            data: {query: query},
            success: function (data) {
                alert(data + 'deleted');
            }
        });
    }

    // On scroll
    $window.bind('scroll', function() {
        var scrolled = $window.scrollTop();
        // Parallax
        $('.parallax_').css('top', (50 - (scrolled * -.02)) + '%');
        // Affix
        if (scrolled > ($window.height() - 100)) {
            $('.header').addClass('affix');
        }
        else
            $('.header').removeClass('affix');
    });

    // Megamenu
    function megamenuActive() {
        $('.megamenu_btn').toggleClass('megamenu_btn_active');
        $('.megamenu').toggleClass('megamenu_active');
        $('.overlay_').toggleClass('overlay_active').click(function () {
            $('.megamenu_btn').removeClass('megamenu_btn_active');
            $('.megamenu').removeClass('megamenu_active');
            $('.overlay_').removeClass('overlay_active');
        });
    }
    $('.megamenu_btn').click(function () {
        if (!$('#header').hasClass('affix') && !$(this).hasClass('megamenu_btn_active')) {
            $body.animate({scrollTop: ($window.height())}, 1000, $.bez([.8,0,.2,1]));
            megamenuActive();
        }
        else {
            megamenuActive();
        }
    });

    // Preloader
    setTimeout(function () {
        $('.load').animate({opacity: '0'}, 500, $.bez([.8,0,.2,1]));
        setTimeout(function () {
            $('#main').show();
            $('.order_site_welcome').show();
            $('body').css({'overflow-y': 'scroll', 'overflow-x': 'hidden'});
            $('.load').hide();
            $('.header').animate({bottom: '0'}, 1000, $.bez([.8,0,.2,1]));
            $('.welcome_text span:first-child').animate({left: '0'}, 1000, $.bez([.8,0,.2,1]));
            $('.welcome_text span:last-child').delay(100).animate({left: '0'}, 1000, $.bez([.8,0,.2,1]));
            $('.line_upper').delay(300).animate({width: '100%'}, 1000, $.bez([.8,0,.2,1]));
            $('.line_under').delay(500).animate({width: '100%'}, 1000, $.bez([.8,0,.2,1]));
            $('.text_under span').delay(1000).animate({top: '0'}, 1000, $.bez([.8,0,.2,1]));
            $('.order_site_welcome a:first-child').animate({opacity: '1'}, 800);
            $('.order_site_welcome a:last-child').delay(150).animate({opacity: '1'}, 800);
        }, 500);
    }, 1000);
});

// Smoothscrolling
(function($) {
    jQuery.scrollSpeed = function(step, speed, easing) {
        var $document = $(document),
            $window = $(window),
            $body = $('html, body'),
            option = easing || 'default',
            root = 0,
            scroll = false,
            scrollY,
            scrollX,
            view;
        if (window.navigator.msPointerEnabled)
            return false;
        $window.on('mousewheel DOMMouseScroll', function(e) {
            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
            scrollY = $document.height() > $window.height();
            scrollX = $document.width() > $window.width();
            scroll = true;
            if (scrollY) {
                view = $window.height();
                if (deltaY < 0 || detail > 0)
                    root = (root + view) >= $document.height() ? root : root += step;
                if (deltaY > 0 || detail < 0)
                    root = root <= 0 ? 0 : root -= step;
                $body.stop().animate({
                    scrollTop: root
                }, speed, option, function() {
                    scroll = false;

                });
            }
            if (scrollX) {

                view = $window.width();

                if (deltaY < 0 || detail > 0)

                    root = (root + view) >= $document.width() ? root : root += step;

                if (deltaY > 0 || detail < 0)

                    root = root <= 0 ? 0 : root -= step;

                $body.stop().animate({

                    scrollLeft: root

                }, speed, option, function() {

                    scroll = false;

                });
            }
            return false;
        }).on('scroll', function() {
            if (scrollY && !scroll) root = $window.scrollTop();
            if (scrollX && !scroll) root = $window.scrollLeft();
        }).on('resize', function() {
            if (scrollY && !scroll) view = $window.height();
            if (scrollX && !scroll) view = $window.width();
        });
    };
    jQuery.easing.default = function (x,t,b,c,d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };
})(jQuery);