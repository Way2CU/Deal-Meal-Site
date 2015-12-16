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

	//create mobile images slider
	Site.mobile_images_slider = new PageControl('section#mobile_slider', 'figure');
	Site.mobile_images_slider
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
			.setTitle(language_handler.getText(null, 'title_dialog_video'))
			.setClearOnClose(true)
			.setSize(550)
			.setContent($('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+video_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'))
			.show();
	});

	// create slider for client logo gallery
	 Site.client_logo_slider = new Caracal.Gallery.Slider();
	 Site.client_logo_slider
		.images.set_container('div.images_container')
		.images.set_visible_count(4)
		.images.set_step_size(1)
		.images.set_center(true)
		.images.add('div.images_container img')
		.controls.attach_next('a.next')
		.controls.attach_previous('a.previous');
	 Site.client_logo_slider.images.update()
};


// connect document `load` event with handler function
$(Site.on_load);
