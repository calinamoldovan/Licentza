
	var SLIDE_NAVIGATOR_ANIMATED = false;
	var SLIDE_NAVIGATOR_SHIFT = 82;
	var SLIDE_NAVIGATOR_MARGIN = 0;
	var SLIDE_NAVIGATOR_POSITION = 0;
	var SLIDE_NAVIGATOR_VISIBLE = 7;
	
	function tss_navigate_prev() {
		return tss_navigate_slide('+');
	}
	
	function tss_navigate_next() {
		return tss_navigate_slide('-');
	}
	
	function tss_set_buttons() {
		if (SLIDE_NAVIGATOR_POSITION < 1) {
			$('#tss_nav_prev a').addClass('inactive');
			$('#tss_nav_prev a').css({'background-position': '-35px 0'});
		}
		else {
			$('#tss_nav_prev a').removeClass('inactive');
			$('#tss_nav_prev a').css({'background-position': '0 0'});
		}
		
		if (SLIDE_NAVIGATOR_POSITION >= (SLIDE_NAVIGATOR_TOTAL-SLIDE_NAVIGATOR_VISIBLE)) {
			$('#tss_nav_next a').addClass('inactive');
			$('#tss_nav_next a').css({'background-position': '-50px 0'});
		}
		else {
			$('#tss_nav_next a').removeClass('inactive');
			$('#tss_nav_next a').css({'background-position': '-16px 0'});
		}
		return false;
	}
		
	
	function tss_navigate_slide(sign) {
		if (SLIDE_NAVIGATOR_ANIMATED) return false;
		if ((SLIDE_NAVIGATOR_POSITION < 1) && (sign == '+')) return false;
		
		if ((SLIDE_NAVIGATOR_POSITION >= (SLIDE_NAVIGATOR_TOTAL-SLIDE_NAVIGATOR_VISIBLE)) && (sign == '-')) return false;
		
		SLIDE_NAVIGATOR_ANIMATED = true;
		eval('SLIDE_NAVIGATOR_POSITION '+sign+'= -1;');
		
		$('#tss_nav_list').animate(
			{marginLeft: sign+'='+SLIDE_NAVIGATOR_SHIFT},
			250,
			'linear',
			function () {
				tss_set_buttons();
				SLIDE_NAVIGATOR_ANIMATED = false;
				return false;
			}
		);
		
		return false;
	}
	
	$(document).ready(function() {
		if (SLIDE_NAVIGATOR_TOTAL > SLIDE_NAVIGATOR_VISIBLE) {
			SLIDE_NAVIGATOR_POSITION = SLIDE_NAVIGATOR_CURRENT-3;
			
			if (SLIDE_NAVIGATOR_POSITION < 0) SLIDE_NAVIGATOR_POSITION = 0;
			if (SLIDE_NAVIGATOR_CURRENT > (SLIDE_NAVIGATOR_TOTAL - 3)) SLIDE_NAVIGATOR_POSITION = SLIDE_NAVIGATOR_TOTAL - SLIDE_NAVIGATOR_VISIBLE;
			
			SLIDE_NAVIGATOR_MARGIN = SLIDE_NAVIGATOR_POSITION * SLIDE_NAVIGATOR_SHIFT;
			
			tss_set_buttons();
		
			$('#tss_nav_list').css({'margin-left': '-'+SLIDE_NAVIGATOR_MARGIN+'px'});
		}
		
		$('#tss_nav_current').css({'opacity': '1'});
		
		/*
		$('a.tss_enabled').hover(
			function () { $(this).css({'background-position': '0 -100px'}); },
			function () { $(this).css({'background-position': '0 0'}); }
		);
		*/
	});
	