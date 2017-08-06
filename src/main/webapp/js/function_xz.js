jQuery(function($) {

	
    
    //Initiat WOW JS
	new WOW().init();
    
	//滚动出发事件
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
    
	$('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
		});	
    
});