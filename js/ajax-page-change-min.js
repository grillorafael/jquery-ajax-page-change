/*
 * jQuery Ajax Page Change Plugin 1.0.0
 * https://github.com/grillorafael/jquery-ajax-page-change
 *
 * Copyright 2013, Rafael Grillo
 * http://rgrillo.com
 */(function(e){e.fn.ajaxLinks=function(t){var n="title",r="<title>",i="</title>",s={replaceSelector:"#content",searchSelector:"#content",loaderSelector:"#loadingContent",linkSelector:"a[data-link='ajax']",changeTitle:!0,titleSelector:"title",minLoadTime:800},o=jQuery.extend(s,t);e(window).resize(function(){e(o.loaderSelector).css({position:"absolute",left:(e(window).width()-e(o.loaderSelector).outerWidth())/2,top:(e(window).height()-e(o.loaderSelector).outerHeight())/2})});e(window).resize();e(o.loaderSelector).hide();return this.each(function(t,s){var u=jQuery(s),a=u.find(o.linkSelector).get();e.each(a,function(t,s){e(s).attr("onclick","return false");e(s).click(function(t){e(o.loaderSelector).fadeIn();var s=new Date,u=e(t.target).attr("href");e.get(u,function(t){var u=new Date,a=u.getTime()-s.getTime(),f=o.minLoadTime;a>=o.minLoadTime?f=0:f=o.minLoadTime-a;setTimeout(function(){var s=e(t);e(o.loaderSelector).fadeOut(function(){e(o.replaceSelector).html(s.find(o.searchSelector).html());if(o.changeTitle){var u="";if(o.titleSelector==n){var a=t.indexOf(r)+r.length,f=t.indexOf(i);u=t.substring(a,f)}else u=s.find(o.titleSelector).text();document.title=u}})},f)})})})})}})(jQuery);