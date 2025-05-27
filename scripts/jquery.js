var loadEventFired = false;
jQuery(window).on('load', function () {
    loadEventFired = true;
    jQuery('.content').css('opacity', 1).fadeIn();
    jQuery('#preloader').fadeOut('slow');
    jQuery('.covernone').removeClass('covernone');
});
setTimeout(function () {
    if (!loadEventFired) {
        jQuery('.content').css('opacity', 1).fadeIn();
        jQuery('#preloader').fadeOut('slow');
        jQuery('.covernone').removeClass('covernone');
    }
}, 10000);
