/*
* TODO: COLOCAR UMA DOCUMENTACAO E COLOCAR NO GITHUB
*
*/
(function($){
	$.fn.ajaxLinks = function(options){
		var defaults = {
			contentSelector : '#content',
			loaderSelector : '#loadingContent',
			linkSelector : "a[data-link='ajax']",
			minLoadTime : 800
		};

		var opts = jQuery.extend(defaults, options);

		$(window).resize(function(){
			$(opts.loaderSelector).css({
				position: 'absolute',
				left: ($(window).width() - $(opts.loaderSelector).outerWidth())/2,
				top: ($(window).height() - $(opts.loaderSelector).outerHeight())/2
			});
		});

		// To initially run the function:
		$(window).resize();

		$(opts.loaderSelector).hide();
		return this.each(function(i, obj){
			var $element = jQuery(obj);
			//TODO ESTA PARANDO AQUI
			var $anchors = $element.find(opts.linkSelector).get();
			$.each($anchors, function(j,ele){
				$(ele).attr('onclick', 'return false');
				$(ele).click(function(event){
					$(opts.loaderSelector).fadeIn();
					var beg = new Date();
					var url = $(event.target).attr('href');
					$.get(url, function(data) {
						var then = new Date();
						var dif = then.getTime() - beg.getTime();
						var loadTime = opts.minLoadTime;

						if(dif >=opts.minLoadTime)
						{
							loadTime = 0;
						}
						else
						{
							loadTime = opts.minLoadTime - dif;
						}

						setTimeout(function(){
							var $htmlData = $(data);
							$(opts.loaderSelector).fadeOut(function(){
								$(opts.contentSelector).html($htmlData.find(opts.contentSelector).html());
							});
						}, loadTime);
					});
				});
			});
		});
	};
})(jQuery);