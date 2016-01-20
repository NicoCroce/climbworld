$(document).ready(function(){

	var offsetScroll = 100;

	$(window).scroll(function (event) {
		console.log('entro');
    	// if (!isReady) { return; };

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
	    if (scroll < positions.company) {
	    	changeSection('home');
	    }else if(scroll < positions.products && scroll >= positions.company - offsetScroll){
	    	changeSection('company');
	    }else if(scroll < positions.contact && scroll >= positions.products - offsetScroll){
	    	changeSection('products');
	    }else{
	    	changeSection('contact');
	    }
	});
});