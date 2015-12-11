"use strict";
//******************************************    seccion variables    ******************************************
	var imgIndex = 1;
	var sectionName = "";
	var height = {
		header: '',
		navBar: '',
		home:'',
		company: '',
		products: '',
		contact: ''
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
		$('#mask').removeClass().addClass('mask');
		switch(imgIndex){
			case 0:
				$('#mask').addClass('img0-selected');
				imgIndex = 1;
				break;
			case 1:
				$('#mask').addClass('img1-selected');
				imgIndex = 2
				break;
			case 2:
				$('#mask').addClass('img2-selected');
				imgIndex = 0;
				break;
			default:
				statements_def
				break;
		}
		
	});

	$(document).on('click', '.prev', function(){
		$('#mask').removeClass().addClass('mask');
		switch(imgIndex){
			case 0:
				$('#mask').addClass('img0-selected');
				imgIndex = 2;
				break;
			case 1:
				$('#mask').addClass('img1-selected');
				imgIndex = 0;
				break;
			case 2:
				$('#mask').addClass('img2-selected');
				imgIndex = 1;
				break;
			default:
				statements_def
				break;
		}
		
	});


//*****************************************************************************************************************************
//											SECCIONES
//*****************************************************************************************************************************

    $(document).on('click', '#downToCompany', function(event) {
		event.preventDefault();
		/* Act on the event */
	});

    // $('.bt-section').click(function(e){
    // 	console.log(e);
    // });
	
	

//*****************************************************************************************************************************

	setTimeout(function(){
		height.header = $('#headerSection').outerHeight(true);
		height.navBar = $('.nav-bar').outerHeight(true);
		height.home = $('#homeSection').outerHeight(true);
		offset = height.home -  $('#homeSection').height();
		height.company = $('#companySection').outerHeight(true);
		height.products = $('#productsSection').outerHeight(true);
		height.contact = $('#contactSection').outerHeight(true);
		positions.navBar = height.header - height.navBar;
		positions.home =  0;
		positions.company = height.navBar + height.home - offset*3;
		positions.products = positions.company + height.company - offset;
		positions.contact = positions.products + height.products;
		$('#homeSection').height($(window).height() - height.header - offset);
	    selectSection(strHash, 'hash');
		console.log(height);
		console.log(positions);
		console.log('offfset' + offset);
	}, 500);


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
	
});

$('.bt-section').click(function(event){
	selectSection($(this), 'click', event);
});

    function selectSection(elemento, seleccionado, e) {
    	$('.bt-section').removeClass('active');
    	var yScroll= document.body.scrollTop;
        if (seleccionado == 'click') {
            sectionName = elemento.attr('id');
            window.location.hash = elemento.attr('id');
            elemento.addClass('active');
            e.preventDefault();
        	e.stopPropagation();
        } else {
            sectionName = elemento;
            window.location.hash = elemento;
            $("#"+elemento).addClass('active');
            var sectionId = elemento + 'Section';
            scrollToAnchor(sectionId);
    	}
    	window.location.hash = sectionName;
        $('body').removeClass().addClass(sectionName);
 
    }

//**********************************************************************************************

//**********************************    SECCIÓN  scroll    *************************************

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll >= positions.navBar){
    	$('.nav-bar').addClass('stack-nav-bar');
    }else {
    	$('.nav-bar').removeClass('stack-nav-bar');
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

var changeSection = function (section){
	$('.bt-section').removeClass('active');
	window.location.hash = section;
    $('#'+section).addClass('active');
};

function scrollToAnchor(sectionToScroll){
    var aTag = $("#" + sectionToScroll + "");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
//************************************************************************************