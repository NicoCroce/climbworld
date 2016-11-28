$(document).ready(function() {

    $(window).scroll(function(event) {
        console.log('entro');
        if (!isReady) {
            return;
        };

        var scroll = $(window).scrollTop();

        if (positions.navBar == 0) {
            positions.navBar = $('.nav-bar').position().top;
        }

        if (scroll > beforeScroll) {
            $('.bg-header-mobile').addClass('hidden');
        } else {
            $('.bg-header-mobile').removeClass('hidden');
        }

        beforeScroll = scroll;
        if (scroll >= positions.navBar) {
            $('.nav-bar').addClass('stack-nav-bar');
        } else {
            $('.nav-bar').removeClass('stack-nav-bar');
        }

        if (scroll >= height.header) {
            $('.bg-header-mobile').removeClass('hidden-bg');
        } else {
            $('.bg-header-mobile').addClass('hidden-bg');
        }
        if (isClicked) {
            return;
        }
        if (scroll < positions.company) {
            changeSection('home');
        } else if (scroll < positions.products) {
            changeSection('company');
        } else if (scroll < positions.contact) {
            changeSection('products');
        } else {
            changeSection('contact');
        }

        animate_elems();
    });

    function animate_elems() {
        var wintop = $(window).scrollTop(), // calculate distance from top of window
            allElemmentsToAnimate = $('.animateblock'),
            winheight = $(window).height();

        // loop through each item to check when it animates
        allElemmentsToAnimate.each(function() {
            var objectAnimated = $(this);

            if (objectAnimated.hasClass('animated')) {
                return true;
            } // if already animated skip to the next item

            var topcoords = objectAnimated.offset().top; // element's distance from top of page in pixels

            if (wintop > (topcoords - (winheight * .9))) {
                // animate when top of the window is 3/4 above the element
                objectAnimated.addClass('animated ' + objectAnimated.attr('fxAnimation'));
            }
        });
    } // end animate_elems()

});
