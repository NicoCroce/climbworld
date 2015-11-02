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

    $(document).on('click', '.bt-section', function(){
    	event.preventDefault();
        selectSection($(this), true, event);
    });

    function selectSection(elemento, seleccionado, event) {
    	$('.bt-section').removeClass('active');
        // var subTitle = "";
        if (seleccionado) {
            // subTitle = elemento.attr('subtitle');
            sectionName = elemento.attr('id');
            window.location.hash = elemento.attr('id');
            elemento.addClass('active');
        } else {
            // subTitle = $('#' + elemento).attr('subtitle');
            sectionName = elemento;
            window.location.hash = elemento;
            $("#"+elemento).addClass('active');
        }
        $('body').removeClass().addClass(sectionName);
        $('#contentSection').load(sectionName + '.html');
    }

//*****************************************************************************************************************************

	
});

//**********************************************************************************************