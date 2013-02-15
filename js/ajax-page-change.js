/*
 * jQuery Ajax Page Change Plugin 1.0.0
 * https://github.com/grillorafael/jquery-ajax-page-change
 *
 * Copyright 2013, Rafael Grillo
 * http://rgrillo.com
 */

(function($){
	$.fn.ajaxLinks = function(options){
		var TITLE_SELECTOR = 'title';
		var BEG_TITLE_TAG = '<title>';
		var END_TITLE_TAG = '</title>';

		var defaults = {
			replaceSelector : '#content',
			searchSelector : '#content',
			loaderSelector : '#loadingContent',
			linkSelector : "a[data-link='ajax']",
			changeTitle: true,
			titleSelector: "title",
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
								$(opts.replaceSelector).html($htmlData.find(opts.searchSelector).html());
								if(opts.changeTitle)
								{
									var newTitle = '';
									if(opts.titleSelector == TITLE_SELECTOR)
									{
										// In this case we need to capture the title inside the head tag
										var begIndex = data.indexOf(BEG_TITLE_TAG) + BEG_TITLE_TAG.length;
										var endIndex = data.indexOf(END_TITLE_TAG);
										newTitle = data.substring(begIndex, endIndex);
									}
									else
									{
										newTitle = $htmlData.find(opts.titleSelector).text();
									}
									document.title = newTitle;
								}
							});
						}, loadTime);
					});
				});
			});
		});
	};
})(jQuery);