/* social box loaders */

$(function () {
	$('#google_plus_box').html('<g:plus href="https://plus.google.com/104463209513040296002" width="300" height="131" theme="light"></g:plus>');
	$('#facebook_activity_box').html('<div class="fb-activity" data-width="300" data-height="300" data-header="true" data-font="arial" data-recommendations="false"></div>');
	$('#facebook_like_box').html('<div class="fb-like-box" data-href="http://www.facebook.com/WallStreetRo" data-width="300" data-show-faces="true" data-stream="false" data-header="false"></div>');
	$('#facebook_like_us').html('<div class="fb-like" data-href="http://www.facebook.com/WallStreetRo" data-send="false" data-width="200" data-show-faces="true" data-font="arial"></div>');
});

/* widgets with navigation ( opinii, arhiva ) */
function navigate_widget(w, step) {
	if (w.animated) return false;
	blocked = false;
		
	$("#"+ w.scrollable_container).width(parseInt(w.offset * w.items_count));
	
	step = (step == '+') ? '-' : '+';
	
	var step_value = eval(step+'1');
	var margin_operation = step+'='+parseInt(w.offset)+'px';
	
	if (w.position + step_value > 0) { 
		w.position = -(w.items_count - w.visible_items); 
		margin_operation = '-' + parseInt((w.items_count - w.visible_items) * w.offset) + 'px'; 
		step_value = 0; 
	}
	
	if ((w.position + step_value) < -(w.items_count - w.visible_items)) { 
		w.position = 0; 
		margin_operation = '0px'; 
		step_value = 0; 
	}	
	
	w.animated = true;
	
	var direction = {};
	direction[w.direction] = margin_operation;
	
	$("#"+ w.scrollable_container).animate(
		direction,
		500,
		'swing',
		function() {
			w.animated = false;
			w.position += parseInt(step_value);			
		}
	);
	
	return false
}

/*	in tpl:
	var {$widgets_name} = {ldelim}
			scrollable_container: '{$widgets_name}_container',
			item_height: {$items_height},
			position: {$starting_position},
			visible_items: {$visible_items},								
			items_count: {$widget|@count|default:0},	
			direction: 'left',	// left if horizontal, top if vertical		
			animated:{$animated}
		{rdelim};
*/

	$(function() {
		$('#ultima-ora-tab').bind('click', function() {
			select_sidebar_tab(this);
		});
		
		$('#important-tab').bind('click', function() {
			select_sidebar_tab(this);			
		});
		
		$('#preferred-tab').bind('click', function() {
			select_sidebar_tab(this);
		});
	});
				
	function select_sidebar_tab(tab) {
		var tab_code = $(tab).attr('id').replace(/\-tab/, '');
		if (current_sidebar_tab === tab_code) return false;
		
		if (current_sidebar_tab) {
			$('#'+current_sidebar_tab).removeClass('active_tab'); 
			$('#'+current_sidebar_tab+'-tab').removeClass('active_trigger'); 
		}
		
		current_sidebar_tab = tab_code;
		
		$('#'+current_sidebar_tab).addClass('active_tab'); 
		$('#'+current_sidebar_tab).tinyscrollbar_update();
		$('#'+current_sidebar_tab+'-tab').addClass('active_trigger');
		
		return true;
	}
	
	function show_ultima_ora_article() {
		if ($('#ultima-ora-articles .ultima-ora-new:last').length > 0) {
			$('#ultima-ora-articles .ultima-ora-new:last').slideDown(250, function () {
				$(this).removeClass('ultima-ora-new');
				setTimeout('show_ultima_ora_article()', 2500);
				$('#ultima-ora').tinyscrollbar_update();
			});
		}
	}
	
	$(document).ready(function(){
		$('#sidebar div.sidebar-box, #sidebar_hp div.sidebar-box').each(function() {
			if ($(this).height() < 16) {
				// $(this).remove();
				// $(this).hide('div.sidebar-add');
				// $(this).removeClass('sidebar-box');		
			}
		});
		
		$('#art-content img[align=left]').css('margin-right','10px');
		$('#art-content img[align=right]').css('margin-left','10px');
		
		$('div.hp-special-div').each(function(){			
			$(this).height($(this).parent('.contains-2-columned-news').height());
		});
		
		show_ultima_ora_article();
		
		$("a[rel=fancybox_pic_group]").fancybox({
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'titlePosition' 	: 'over',
			'titleFormat'       : function(title, currentArray, currentIndex, currentOpts) {
				return '<span id="fancybox-title-over">' +  (currentIndex + 1) + ' / ' + currentArray.length + ' ' + title + '</span>';
			}
		});
	});
	
	
	