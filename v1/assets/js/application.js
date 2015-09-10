
$(document).ready(function(){


  var next_slide = 0;
  var prev_slide = 0;
  var current_slide = 0;
  var nav_height = $('#album nav').height(); // check if exists
  var nav_width = $('#album nav').width(); // check if exists
  var slide_obj = $("#album section");
  var snap_timer;
  var scroll_from_mouse = true;

  function prevSlide() {

    $('#album nav .prev').attr({href:'#'+prev_slide});
    $('#album nav .prev')[0].click();

    if(current_slide == prev_slide) {
      $("#album").effect("bounce", {times:1,direction:'up',distance:4}, 100);
    }

    return false;

  }

  function nextSlide() {

    $('#album nav .next').attr({href:'#'+next_slide});
    $('#album nav .next')[0].click();

    if(current_slide == next_slide) {
      $("#album").effect("bounce", {times:1,direction:'down',distance:4}, 100);
    }

    return false;

  }

  function valign(ele, scope) {

    if(  ele.css('position')=='absolute' ||
      ele.css('position')=='fixed')
      attr = 'top';
    else
      attr = 'padding-top';

    val = Math.floor((scope.height() - ele.height()) / 2);

    ele.css(attr, val);

  }

  function resizeBox(e) {

      var newWindowHeight = $(window).height();

    slide_obj.css("height", newWindowHeight);
      $.waypoints('refresh');

      if(newWindowHeight < (nav_height + 100)) {
        $('#album nav .thumbnail').hide();
      } else {
        $('#album nav .thumbnail').show();
      }

      valign($('#album nav'), $(window));

  }


  function snapList(){

    var current_pos = $(window).scrollTop();
    var snapped = false;
    var i = 0;

    while(!snapped && i < slide_obj.size()){

      var itop = slide_obj.eq(i).position().top;
      var iheight = slide_obj.eq(i).outerHeight();

      if(  (current_pos > itop &&
          current_pos < (itop + iheight / 2)) ||
        (current_pos < itop &&
          current_pos > (itop - iheight / 2))) {
        snapped = true;
        scroll_from_mouse = false;
        $('html,body').animate({scrollTop: itop}, 200);
      }

      i++;
    }

  };

  function centerLazyLoaded() {

      var i = 0;

    while(i < slide_obj.size()){
      img = slide_obj.eq(i).children('img');
      valign(slide_obj.eq(i).children('img'), slide_obj.eq(i));
      i++;
    }

  }

  $('body').delegate('#album > section', 'waypoint.reached', function(event, direction) {

    var $active = $(this);

    if (direction === "up") {
      $active = $active.prev();
    }

    current_slide = $active.attr('id');

    if (!$active.length) $active = $active.end();

    $('#album nav .active').removeClass('active');
    $('a[href=#'+current_slide+']').addClass('active');
    // up/down
    $('#album nav .next').addClass('active');
    $('#album nav .prev').addClass('active');

    if(current_slide == $('#album > section:first').attr('id')) {
      // first
      $('#album nav .prev').removeClass('active');
      prev_slide = current_slide;
      next_slide = $active.next().attr('id');
    } else if(current_slide == $('#album > section:last').attr('id')) {
      // last
      $('#album nav .next').removeClass('active');
      next_slide = current_slide;
      prev_slide = $active.prev().attr('id');
    } else {
      next_slide = $active.next().attr('id');
      prev_slide = $active.prev().attr('id');
    }

  });




  // album setup
  if($('#album > section').length) {

    // Register each section as a waypoint.
    $('#album > section').waypoint({ offset: '50%' });

    // initial adjust
    resizeBox();

    // If the User resizes the window, adjust the #container height
    $(window).bind("resize", resizeBox);

    // cursor keys, 38 = up, 40 = down
    $(document).keydown(function(e){
        if (e.keyCode == 38) {
           prevSlide();
           return false;
        }
        if (e.keyCode == 40) {
           nextSlide();
           return false;
        }
    });

    $('#album nav .prev').bind("click", prevSlide);
    $('#album nav .next').bind("click", nextSlide);

    // snap
    $(window).scroll(function () {
      clearTimeout(snap_timer);
      if(scroll_from_mouse) snap_timer = setTimeout(snapList, 400);
      scroll_from_mouse = true;
      });

      // re-center for lazy loaded images
    var recenter_timer = setInterval(centerLazyLoaded, 250);

  }

  /*
  if($('#main_nav nav').length) {

    $.waypoints.settings.scrollThrottle = 30;

    $('#main_nav nav').waypoint(function(event, direction) {
      $('body').toggleClass('sticky-header', direction === "down");
      event.stopPropagation();
    }, {
      offset:-78
    });

  }
  */

   // burger menu
  $('header nav button.toggle').bind("click", function(){$('.default-layout header nav').toggleClass('overlay')});

  $("img.lazy").show().lazyload({
      effect : "fadeIn"
  });

});
