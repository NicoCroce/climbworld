"use strict";
//******************************************    seccion variables    ******************************************
var imgIndex = 1;
var totalImg = 3;
var sectionName = "";
var isClicked = false;
var height = {
    header: '',
    navBar: '',
    home: '',
    company: '',
    products: '',
    contact: '',
    imgCarousel: '',
    homeHuge: '',
    homeNormal: ''
};

var positions = {
    navBar: '',
    home: '',
    company: '',
    products: '',
    contact: ''
};

var offset;
if (window.location.hash !== "") {
    var strHash = window.location.hash;
    strHash = strHash.replace("#", "");
}

var isReady = false;
var closedMenu = true;
var startedAnim = false;
var beforeScroll = 0;
//**********************************************************************************************

//******************************************    onLoad    ******************************************

$(window).on("load", function() {
    initMap();
});

$(document).ready(function() {
    window.scrollTo(0, 1);
    // $('#headerSection').load('header.html');
    $('#footerSection').load('/partials/footer.html');
    $('#homeSection').load('/partials/home.html');
    $('#companySection').load('/partials/company.html');
    $('#productsSection').load('/partials/products.html');
    $('#contactSection').load('/partials/contact.html');

    $(document).on('click', '.next', function() {
        if (imgIndex == totalImg) {
            $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
            imgIndex = 1;
            $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
            return;
        };
        $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
        imgIndex++;
        $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
    });

    $(document).on('click', '.prev', function() {
        if (imgIndex == 1) {
            $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
            imgIndex = totalImg;
            $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
            return;
        };
        $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
        imgIndex--;
        $('.img' + imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
    });



    //*****************************************************************************************************************************
    //                                          SECCIONES
    //*****************************************************************************************************************************

    $(document).on('click', '#goToCompany', function(event) {
        event.preventDefault();
        scrollToAnchor('companySection');
    });


    //*****************************************************************************************************************************

    setTimeout(function() {
        height.header = $('.header-section').outerHeight(true);
        height.navBar = $('.nav-bar').outerHeight(true);
        height.home = $('#homeSection').outerHeight(true);
        offset = $('#companySection').outerHeight(true) - $('.main-section--company').height();
        height.company = $('#companySection').outerHeight(true);
        height.products = $('#productsSection').outerHeight(true);
        height.contact = $('#contactSection').outerHeight(true);
        height.homeHuge = $('.main-section--home').outerHeight(true) + height.header + 15;
        height.homeNormal = $(window).height();
        if (height.homeHuge > height.homeNormal) {
            $('#homeSection').height(height.homeHuge);
            // $('#main').height(height.homeHuge);
        }
        positions.home = 0;
        positions.company = $('#companySection').position().top;
        positions.products = $('#productsSection').position().top;
        positions.contact = $('#contactSection').position().top;
        positions.navBar = height.header - height.navBar;
        isReady = true;
        // if (strHash != undefined && strHash != "home") {
        //          selectSection(strHash, 'hash');
        //      };      
        // $('#homeSection').height($(window).height() - height.header);

        // console.log(height);
        // console.log(positions);
        // console.log(offset);
    }, 1000);

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            // window.location.hash = target.replace('Section', '');
        });
    });

    $('#btMenu').click(function(event) {
        if (startedAnim) {
            return;
        }
        if (!closedMenu) {
            startedAnim = true;
            $(this).removeClass('opened');
            $('#menuMobile').addClass('hidden');
            $('body').removeClass('menu-opened');
            setTimeout(function() {
                startedAnim = false;
                closedMenu = true;
            }, 500);
        } else {
            startedAnim = true;
            $(this).addClass('opened');
            $('#menuMobile').removeClass('hidden');
            $('body').addClass('menu-opened');
            closedMenu = false;
            setTimeout(function() {
                startedAnim = false;
            }, 2000);
        }
    });
});

// **********************    END READY    ******************************

$('.bt-section').click(function(event) {
    selectSection($(this), 'click', event);
    changeStateClick();
    $('#menuMobile').addClass('hidden');
    $('body').removeClass('menu-opened');
    $('#btMenu').removeClass('opened');
    closedMenu = true;
});

function selectSection(elemento, seleccionado, e) {
    $('.bt-section').removeClass('active');
    if (seleccionado == 'click') {
        sectionName = elemento.attr('id').replace('Mobile', '');
        changeSection(sectionName);
    } else {
        sectionName = elemento;
        /*$("#"+elemento).addClass('active');
        $("#"+elemento+'Mobile').addClass('active');*/
        var sectionId = elemento + 'Section';
        // scrollToAnchor(sectionId);
    }
    e.preventDefault();
    e.stopPropagation();
    // window.location.hash = sectionName;
    $('body').removeClass().addClass(sectionName);
}

//**********************************************************************************************

//**********************************    SECCIÓN  scroll    *************************************

var changeSection = function(section) {
    sectionName = section;
    $('.bt-section').removeClass('active');
    $('#' + section).addClass('active');
    $('#' + section + 'Mobile').addClass('active');
    // event.preventDefault();
    // window.location.hash = section;
};

function scrollToAnchor(sectionToScroll) {
    var aTag = $("#" + sectionToScroll + "");
    $('html,body').animate({
        scrollTop: aTag.offset().top
    }, 'slow');
}

function changeStateClick() {
    isClicked = true;
    setTimeout(function() {
        isClicked = false;
    }, 1000);
}

//************************************************************************************

/*MODAL*/

$(document).on('click', '.product-element', function() {
    $('#detalleProducto').addClass('opened');
    $('body').addClass('no-scroll');
});

$(document).on('click', '#detalleProducto', function() {
    $('#detalleProducto').removeClass('opened');
    $('body').removeClass('no-scroll');
});

function initMap() {
    var myLatLng = {
        lat: -33.246500, 
        lng: -61.363194
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng,
        minZoom: 8,
        draggableCursor: 'crosshair',
        draggable: true
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!',
        animation: google.maps.Animation.BOUNCE
    });
}
$(document).ready(function(){

	var offsetScroll = 100;

	$(window).scroll(function (event) {
		console.log('entro');
		if (!isReady) { return; };

		var scroll = $(window).scrollTop();

		if (positions.navBar == 0) {
			positions.navBar = $('.nav-bar').position().top;
		}

		if (scroll > beforeScroll) {
			$('.bg-header-mobile').addClass('hidden');
		}else{
			$('.bg-header-mobile').removeClass('hidden');
		}

		beforeScroll = scroll;
		if(scroll >= positions.navBar){
			$('.nav-bar').addClass('stack-nav-bar');
		}else {
			$('.nav-bar').removeClass('stack-nav-bar');
		}

		if (scroll >= height.header) {
			$('.bg-header-mobile').removeClass('hidden-bg');
		}else{
			$('.bg-header-mobile').addClass('hidden-bg');
		}
		if(isClicked){
			return;
		}
		if (scroll < positions.company) {
			changeSection('home');
		}else if(scroll < positions.products){
			changeSection('company');
		}else if(scroll < positions.contact){
			changeSection('products');
		}else{
			changeSection('contact');
		}

		animate_elems();
	});

	function animate_elems() {
	    var wintop = $(window).scrollTop(), // calculate distance from top of window
	    allElemmentsToAnimate = $('.animateblock'),
		winheight = $(window).height(),
		fullheight = $(document).height();

	    // loop through each item to check when it animates
	    allElemmentsToAnimate.each(function(){
	    	var objectAnimated = $(this);

	      if(objectAnimated.hasClass('animated')) { return true; } // if already animated skip to the next item

	      var topcoords = objectAnimated.offset().top; // element's distance from top of page in pixels

	      	if(wintop > (topcoords - (winheight*.75))) {
		        // animate when top of the window is 3/4 above the element
		        objectAnimated.addClass('animated ' + objectAnimated.attr('fxAnimation'));
	    	}
		});
	} // end animate_elems()

});

//# sourceMappingURL=maps/script.js.map
