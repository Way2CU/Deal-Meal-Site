/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	//create images slider
	Site.images_slider = new PageControl('header', 'figure');
	Site.images_slider
		.setInterval(4000)
		.setWrapAround(true);

	//create dialog for youtube video
	Site.video_dialog = new Dialog();

	//onclick function displaying video content
	var button_youtube = $('a.youtube');
	button_youtube.on('click', function(event){
		event.preventDefault();
		var video_id = $(this).attr('data-id');
		Site.video_dialog
			.setSize(550)
			.setContent($('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video_id+'" frameborder="0" allowfullscreen></iframe>'))
			.show();
	});
};


// connect document `load` event with handler function
$(Site.on_load);
