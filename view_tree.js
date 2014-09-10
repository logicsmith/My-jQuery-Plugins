(function($) {
	$.fn.view_tree = function(options) {
		/*need to add feature to allow tree growth under a leaf
		 or branch via json input and optional waiting message*/
		return $(this).each(function() {
			var element = $(this);
			if(element.data('view_tree')) return;
			
			var view_tree = new init(this, options);
			
			element.data('view_tree', view_tree);
			//menu_bar may be accessed via $('SELECTOR').data('view_tree')
		});
	};
	
	var init = function(element, options){
		var elem = $(element);
		var obj = this;
		var settings = $.extend({
			click_line: true,	//click on +/- icon or allow li click as long as not child > ul
			animated: true,		//speed of animation
			collasped: true, 	//start default, to be updated with expanded settings, does not affect collaspable = false
			focus: true 		//only allow one brance pre level to be open
		}, options || {});
		
		//Public Methods
		this.collapseAll = function(){
			var branches = $($(".branch * .toggle_expanded", element).toArray().reverse());
			branches.each(function(){
				$(this).removeClass("toggle_collapsed");
				$(this).addClass("toggle_collapsed");
				if(settings.animated){
					$("ul:first", $(this).parent().parent()).slideUp(100);
				}
				else{
					$("ul:first", $(this).parent().parent()).hide();
				}
			});
		}
		
		this.expandAll = function(){
			$(".branch * .toggle_expanded", element).each(function(){
				$(this).removeClass("toggle_collapsed");
				if(settings.animated){
					$("ul", elem.parent().parent()).slideDown(100);
				}
				else{
					$("ul", elem.parent().parent()).show();
				}
			});
		}
		
		this.serialize = function(){
			var tempReturn = $(elem.clone());
			$("li.branch", tempReturn).each(function(){
				//Add Expanded Attributes
				var is_expanded = $("* .toggle_expanded:first", this);
				if(!is_expanded.hasClass("toggle_collapsed")){
					$(this).attr('expanded', 'true');
				}
				//Unwrap .select_line element
				if(settings.click_line){
					$(this).prepend($("div.select_line:first", this).contents())
					$("div.select_line:first", this).remove();
				}
				//Remove .toggle_expanded element
				$("div.toggle_expanded:first", this).remove();
			});
			//Remove Styles
			$("[style]", tempReturn).each(function(){
				$(this).removeAttr("style");
			});
			//Remove All .leaf Classes
			$(".leaf", tempReturn).each(function(){
				$(this).removeClass("leaf");
			});
			//Remove All .branch Classes
			$(".branch", tempReturn).each(function(){
				$(this).removeClass("branch");
			});
			//Remove Class Attribute
			$("[class]", tempReturn).each(function(){
				$(this).removeAttr("class");
			});
			return tempReturn[0].outerHTML;
		}
		
		//Private Methods
		var parseBranches = function(parent){
			var tagName = null;
			parent.children("li, ul").each(function(){
				tagName = $(this)[0].tagName;
				if(tagName == 'UL'){
					parseBranches($(this));
				}
				else if($(this).children("ul").length > 0){
					$(this).addClass("branch");
					$("<div class='toggle_expanded'></div>").prependTo($(this));
					$(this).contents(":not(ul)").wrapAll('<div class="select_line" />');
					parseBranches($(this));
				}
				else if(tagName == 'LI'){
					$(this).addClass("leaf");
				}
			});
		}
		
		var toogleBranch = function(){
			if(settings.focus){
				var x = collapseBranchesExcept(this);
			}
			if(settings.click_line){
				$(".toggle_expanded:first", this).toggleClass("toggle_collapsed");
				if(settings.animated){
					$("ul:first", $(this).parent()).slideToggle(100);
				}
				else{
					$("ul:first", $(this).parent()).toggle();
				}
			}
			else{
				$(this).toggleClass("toggle_collapsed");
				if(settings.animated){
					$("ul:first", $(this).parent().parent()).slideToggle(100);
				}
				else{
					$("ul:first", $(this).parent()).toggle();
				}
			}
		}
		
		var collapseBranchesExcept = function(lowestDecendent){
			var notRemoves = $(".toggle_expanded:first", $(lowestDecendent).parentsUntil(element, ".branch"));
			var removeEm = $(".branch * .toggle_expanded", element).not(notRemoves);
			removeEm.each(function(){
				$(this).removeClass("toggle_collapsed");
				$(this).addClass("toggle_collapsed");
				if(settings.animated){
					$("ul", $(this).parent().parent()).slideUp(100);
				}
				else{
					$("ul", $(this).parent().parent()).hide();
				}
			});
		}
		
		var openExpanded = function(){
			var expands = $(".toggle_expanded:first", $("[expanded]", element));
			expands.each(function(){
				$(this).removeClass("toggle_collapsed");
				if(settings.animated){
					$("ul:first", $(this).parent().parent()).slideDown(100);
				}
				else{
					$("ul:first", $(this).parent().parent()).show();
				}
			});
		}
		
		//CONSTRUCT
		//Build HTML
		parseBranches(elem);
		
		//Click Events
		if(settings.click_line){
			$(".select_line", elem).click(toogleBranch);
		}
		else{
			$(".toggle_expanded", elem).click(toogleBranch);
		}
		
		//Collapsed On Startup
		if(settings.collasped){
			this.collapseAll();
		}
		
		//Handle expanded attribute on startup
		openExpanded();
		$("[expanded]", element).removeAttr("expanded"); 
	}
})(jQuery);