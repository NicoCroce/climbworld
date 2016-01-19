"use strict";
//******************************************    seccion variables    ******************************************
	var imgIndex = 1;
	var totalImg = 3;
	var sectionName = "";
	var height = {
		header: '',
		navBar: '',
		home:'',
		company: '',
		products: '',
		contact: '',
		imgCarousel: '',
		homeHuge: '',
		homeNormal: ''
	};

	var positions = {
			navBar: '',
			home:'',
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
jQuery(document).ready(function($) {
	// $('#headerSection').load('header.html');
	$('#footerSection').load('footer.html');
	$('#homeSection').load('home.html');
	$('#companySection').load('company.html');
	$('#productsSection').load('products.html');
	$('#contactSection').load('contact.html');
	$(document).on('click', '.next', function(){
		if (imgIndex == totalImg) {
			$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
			imgIndex = 1;
			$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
			return;
		};
		$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
		imgIndex++;
		$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
	});

	$(document).on('click', '.prev', function(){
		if (imgIndex == 1) {
			$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
			imgIndex = totalImg;
			$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
			return;
		};
		$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-out-grow');
		imgIndex--;
		$('.img'+imgIndex).removeClass('fade-in-grow').removeClass('fade-out-grow').addClass('fade-in-grow');
	});



//*****************************************************************************************************************************
//											SECCIONES
//*****************************************************************************************************************************

			    $(document).on('click', '#goToCompany', function(event) {
					event.preventDefault();
					scrollToAnchor('companySection');
				});	
	

//*****************************************************************************************************************************

	setTimeout(function(){
		height.header = $('.header-section').outerHeight(true);
		height.navBar = $('.nav-bar').outerHeight(true);
		height.home = $('#homeSection').outerHeight(true);
		offset = $('#companySection').outerHeight(true) - $('.main-section--company').height();
		height.company = $('#companySection').outerHeight(true);
		height.products = $('#productsSection').outerHeight(true);
		height.contact = $('#contactSection').outerHeight(true);
		positions.navBar = height.header - height.navBar;
		positions.home =  0;
		positions.company = height.navBar + height.home - offset*2;
		positions.products = positions.company + height.company - offset;
		positions.contact = positions.products + height.products;
		height.homeHuge = $('#blockRightMobile').outerHeight(true) + $('.content-carousel').height() + $('#goToCompany').height() + height.header + 5;
		height.homeNormal = $(window).height();
		if (height.homeHuge > height.homeNormal) {
			$('#homeSection').height(height.homeHuge);
			// $('#main').height(height.homeHuge);
		}
		isReady = true;
		// if (strHash != undefined && strHash != "home") {
  //   		selectSection(strHash, 'hash');
  //   	};		
		// $('#homeSection').height($(window).height() - height.header);
	    
		console.log(height);
		console.log(positions);
		console.log(offset);
	}, 1000);

	// setTimeout(function(){
	// 	height.imgCarousel = $('.img1').height();
	// 	$('#mask').height(height.imgCarousel);
	// }, 1100);


	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target.replace('Section', '');
	    });
	});

	// $('#btMenu').click(function(event) {
	// 	if ($('#menuMobile').hasClass('hidden')) {
	// 		$('#menuMobile').removeClass('hidden');
	// 	}else{
	// 		$('#menuMobile').addClass('hidden');
	// 	}
	// });

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

			    $(window).scroll(function (event) {
					
			    	if (!isReady) { return; };

				    var scroll = $(window).scrollTop();

				    if ( window.location.hash == undefined || window.location.hash == "" || scroll < 10 ) { return; };

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
				    if (scroll < positions.company) {
				    	changeSection('home');
				    }else if(scroll < positions.products){
				    	changeSection('company');
				    }else if(scroll < positions.contact){
				    	changeSection('products');
				    }else{
				    	changeSection('contact');
				    }
				});
});

			$('.bt-section').click(function(event){
				selectSection($(this), 'click', event);
				$('#menuMobile').addClass('hidden');
			    $('body').removeClass('menu-opened');
			    $('#btMenu').removeClass('opened');
			    closedMenu = true;
			});

			function selectSection(elemento, seleccionado, e) {
				$('.bt-section').removeClass('active');
			    if (seleccionado == 'click') {
			        sectionName = elemento.attr('id').replace('Mobile', '');
			        window.location.hash = elemento.attr('id').replace('Mobile', '');
			        elemento.addClass('active');
			        e.preventDefault();
			    	e.stopPropagation();
			    } else {
			        sectionName = elemento;
			        window.location.hash = elemento;
			        $("#"+elemento).addClass('active');
			        $("#"+elemento+'Mobile').addClass('active');
			        var sectionId = elemento + 'Section';
			        scrollToAnchor(sectionId);
				}
				window.location.hash = sectionName;
			    $('body').removeClass().addClass(sectionName);

			}

//**********************************************************************************************

//**********************************    SECCIÓN  scroll    *************************************

			var changeSection = function (section){
				$('.bt-section').removeClass('active');
				window.location.hash = section;
			    $('#'+section).addClass('active');
			    $('#'+section+'Mobile').addClass('active');
			};

			function scrollToAnchor(sectionToScroll){
			    var aTag = $("#" + sectionToScroll + "");
			    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
			}
//************************************************************************************