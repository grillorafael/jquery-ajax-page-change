Sample
======================
Here's a sample http://rgrillo.com/


jquery-ajax-page-change
=======================

This is a jQuery plugin to dynamically changes your page content with ajax and jQuery

How it works
=======================
 * First you have to import your jquery library
 * Second you have to import your ajax-page-change script

```html
<script type="text/javascript" src="/js/ajax-page-change-min.js"></script>
```

 * Third and this is optional, import ajax-page-change css

```html
<link rel="stylesheet" type="text/css" href="/css/ajax-page-change.css">
```

 * Fourth execute ajax-page-change

```javascript
$(function(){
  $('header').ajaxLinks();
});
```
 * Insert the loader in your html page (Remember, if you did not do the third step, this will probably not work)

```html
<div id="loadingContent"><div></div></div>
```


Default Options
======================

 * replaceSelector : '#content' -> This is the selector ajax-page-change will change its innerHtml
 * searchSelector : '#content' -> This is the selector we will search for its innerHtml
 * loaderSelector : '#loadingContent' -> This is the loader selector
 * linkSelector : "a[data-link='ajax']" -> This is the link selector, the selector we will search inside the main selector you aplied the ajaxLinks()
 * minLoadTime : 800 -> This is the minimum loading time in MS


Roadmap
======================

 - Identify page title so the plugin can change the current page title
 - Add a callback function option
 - Effects for a better transition
 - More loader options
