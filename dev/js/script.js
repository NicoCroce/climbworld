"use strict";
//******************************************    seccion variables    ******************************************
	var imgIndex = 1;
	var sectionName = "";
//**********************************************************************************************

//******************************************    onLoad    ******************************************
jQuery(document).ready(function($) {
	// $('#headerSection').load('header.html');
	$('#footerSection').load('footer.html');
	$('#contentSection').load('home.html');

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

    // $('.bt-section').click(function(e){
    // 	console.log(e);
    // });
	
	

//*****************************************************************************************************************************

	
});

$('.bt-section').click(function(event){
	selectSection($(this), true, event);
	});
// });

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
			statements_def
			break;
	}
}

//**********************************************************************************************