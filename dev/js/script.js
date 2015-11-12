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

	if (window.location.hash !== "") {
        var str = window.location.hash;
        str = str.replace("#", "");
        selectSection(str, false);
    }

    $(document).on('click', '#downToCompany', function(event) {
		event.preventDefault();
		/* Act on the event */
	});

    // $('.bt-section').click(function(e){
    // 	console.log(e);
    // });
	
	

//*****************************************************************************************************************************

	setTimeout(function(){
		height.header = $('#headerSection').height();
		height.navBar = $('.nav-bar').height();
		height.home = $('#homeSection').height();
		height.company = $('#companySection').height();
		height.products = $('#productsSection').height();
		height.contact = $('#contactSection').height();
		positions.navBar = height.header - height.navBar;
		
		console.log(height);
	}, 1000);


	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
});

$('.bt-section').click(function(event){
	selectSection($(this), true, event);
	});

    function selectSection(elemento, seleccionado, e) {
    	$('.bt-section').removeClass('active');
    	var yScroll= document.body.scrollTop;
        if (seleccionado) {
            // subTitle = elemento.attr('subtitle');
            sectionName = elemento.attr('id');
            window.location.hash = elemento.attr('id');
            elemento.addClass('active');
            e.preventDefault();
        	e.stopPropagation();
        } else {
            // subTitle = $('#' + elemento).attr('subtitle');
            sectionName = elemento;
            window.location.hash = elemento;
            $("#"+elemento).addClass('active');
        }
        $('body').removeClass().addClass(sectionName);
        
        $('#contentSection').load(sectionName + '.html');
     //    $('<div></div>')
	    // .append('default ' + e.type + ' prevented')
	    // .appendTo('#contentSection');
	    
		document.body.scrollTop = yScroll;
        changeTitleAside(sectionName); 
    }


var changeTitleAside = function(secName){
	switch(secName){
		case 'home':
			$('.title-aside').text("título a definir");
			break;
		case 'company':
			$('.title-aside').text("título a definir");
			break;
		case 'products':
			$('.title-aside').text("Selecciona un producto para ver su detalle");
			break;
		case 'contact':
			$('.title-aside').text("¿CÓMO LLEGO?");
			break;
		default:
			break;
	}
}

//**********************************************************************************************

//**********************************    SECCIÓN  scroll    *************************************

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll >= positions.navBar){
    	console.log("entroooooo  ");
    	$('.nav-bar').addClass('stack-nav-bar');
    }else {
    	$('.nav-bar').removeClass('stack-nav-bar');
    }
    console.log("alto  "+ height.header);
});

// function scrollToAnchor(sectionToScroll){
//     var aTag = $("a[name='"+ sectionToScroll +"']");
//     $('html,body').animate({scrollTop: aTag.offset().top},'slow');
// }

// scrollToAnchor('id3');

//************************************************************************************