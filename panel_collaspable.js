(function($) {
	$.fn.panel_collapsible = function( options ) {
		return $(this).each(function() {
			var element = $(this);
			if(element.data('panel_collapsible')) return;
			
			var panel_collapsible = new init(this, options);
			
			element.data('panel_collapsible', panel_collapsible);
			//menu_bar may be accessed via $('SELECTOR').data('panel_collapsible')
		});
	};
	
	//PRIVATE METHODS
	var init = function(element, options){
		var elem = $(element);
		var obj = this;
		var settings = $.extend({/*defaults*/}, options || {});
		
		$(elem).children().wrapAll('<div class="content" />');
		
		$("<div class='title'><div>" + elem.attr("title") + "</div></div>").prependTo(elem);
		
		$(".title", element).click(function() {
			$(".content", elem.parent()).slideToggle();
		});
	}
})(jQuery);