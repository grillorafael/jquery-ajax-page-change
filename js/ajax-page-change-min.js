/*
 * jQuery Ajax Page Change Plugin 1.0.0
 * https://github.com/grillorafael/jquery-ajax-page-change
 *
 * Copyright 2013, Rafael Grillo
 * http://rgrillo.com
 */(function(e){e.fn.ajaxLinks=function(t){var n={replaceSelector:"#content",searchSelector:"#content",loaderSelector:"#loadingContent",linkSelector:"a[data-link='ajax']",minLoadTime:800},r=jQuery.extend(n,t);e(window).resize(function(){e(r.loaderSelector).css({position:"absolute",left:(e(window).width()-e(r.loaderSelector).outerWidth())/2,top:(e(window).height()-e(r.loaderSelector).outerHeight())/2})});e(window).resize();e(r.loaderSelector).hide();return this.each(function(t,n){var i=jQuery(n),s=i.find(r.linkSelector).get();e.each(s,function(t,n){e(n).attr("onclick","return false");e(n).click(function(t){e(r.loaderSelector).fadeIn();var n=new Date,i=e(t.target).attr("href");e.get(i,function(t){var i=new Date,s=i.getTime()-n.getTime(),o=r.minLoadTime;s>=r.minLoadTime?o=0:o=r.minLoadTime-s;setTimeout(function(){var n=e(t);e(r.loaderSelector).fadeOut(function(){e(r.replaceSelector).html(n.find(r.searchSelector).html())})},o)})})})})}})(jQuery);