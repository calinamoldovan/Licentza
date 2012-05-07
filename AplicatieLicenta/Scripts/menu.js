
	// $(document).ready(function() {
	$(function () {
		var $main_menu			= $('#main_menu');
		var $main_menu_items	= $main_menu.children('li.section');
		
		function get_max_zindex_for_menu() {
			var max_zindex = 0;
			
			$('body').find('*').not('script, style, noscript').each(function() {
				var cur_zindex = parseInt($(this).css('z-index'));
				max_zindex = cur_zindex > max_zindex ? cur_zindex : max_zindex;
			});
			
			return max_zindex;
		}

		if ($main_menu.find('div.subsections').length > 0) {
			$main_menu.find('div.subsections').each(function(i) {
				var w = $(this).find('ul').width();
				if ($(this).find('div.menu-feature').length > 0) {
					feature_w = $(this).find('div.menu-feature').width();
					if (!isNaN(w + feature_w)) $(this).width(w + feature_w); 
				}
			});
		}

		$main_menu_items.bind('mouseenter',function() {
			var $this = $(this);
			$this.addClass('slided selected');
			
			if ($this.children('div').length > 0) {
				$this.children('div').css('z-index', get_max_zindex_for_menu()).stop(true, true);
				if ($this.children('div') && $this.children('div').length > 0) {
					$this.children('div').slideDown(250, function() {
						if ($main_menu_items.not('.slided').length > 0 && $main_menu_items.not('.slided').children('div').length > 0) {
							$main_menu_items.not('.slided').children('div').hide();
						}
						$(this).parent().removeClass('slided');
					});
					
					// $this.children('div').show();
					
					/* if ($main_menu_items.not('.slided').length > 0 && $main_menu_items.not('.slided').children('div').length > 0) {
						$main_menu_items.not('.slided').children('div').hide();
					}
					$(this).parent().removeClass('slided'); */
				}
			}
		}).bind('mouseleave',function(){
			var $this = $(this);
			$this.removeClass('selected');
			
			if ($this.children('div').length > 0) {
				$this.children('div').css('z-index', 1).hide();
			}
		});

		$main_menu.bind('mouseenter',function(){
			var $this = $(this);
			$this.addClass('hovered');
		}).bind('mouseleave',function(){
			var $this = $(this);
			$this.removeClass('hovered');
			
			if ($main_menu_items.children('div').length > 0) {
				$main_menu_items.children('div').hide();
			}
		});
	});