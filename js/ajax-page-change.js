/*
 * jQuery Ajax Page Change Plugin 1.0.0
 * https://github.com/grillorafael/jquery-ajax-page-change
 *
 * Copyright 2013, Rafael Grillo
 * http://rgrillo.com
 */

(function($){
	$.fn.ajaxLinks = function(options, callback){
		var TITLE_SELECTOR = 'title';
		var BEG_TITLE_TAG = '<title>';
		var END_TITLE_TAG = '</title>';

		var defaults = {
			replaceSelector : '#content',
			searchSelector : '#content',
			loaderSelector : '#loadingContent',
			linkSelector : "a[data-link='ajax']",
			enableAnalyticsTrack: false,
			enableUrlChange: true,
			changeTitle: true,
			titleSelector: "title",
			transitionEffect:"none",
			minLoadTime : 800
		};

		if(!callback)
		{
			callback = function(){};
		}

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
					if(opts.transitionEffect != 'none')
					{
						if(opts.transitionEffect == 'fade')
						{
							$(opts.replaceSelector).animate({
								opacity: 0
							}, 1000);
						}
						else if(opts.transitionEffect == 'slideVertical')
						{
							$(opts.replaceSelector).slideToggle(1000);
						}
					}

					$(opts.loaderSelector).fadeIn();
					var beg = new Date();
					var url = $(event.target).attr('href');
					if(opts.enableAnalyticsTrack)
					{
						_gaq.push(['_trackPageview', url]);
					}
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

								if(opts.transitionEffect != 'none')
								{
									if(opts.transitionEffect == 'fade')
									{
										$(opts.replaceSelector).animate({
											opacity: 1
										}, 1000);
									}
									else if(opts.transitionEffect == 'slideVertical')
									{
										$(opts.replaceSelector).slideToggle(1000);
									}
								}

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

								if(opts.enableUrlChange)
								{
									console.log(url);
									window.history.pushState(url, "Title", url);
								}
							});
							callback();
						}, loadTime);
					});
				});
			});
		});
	};
})(jQuery);