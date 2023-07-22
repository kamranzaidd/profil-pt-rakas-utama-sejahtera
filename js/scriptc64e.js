;(function($){
  'use strict';
      // Slider
      var $slider = $('#slider');
      if ($slider.length > 0 ) {
        $slider.carousel({ interval:6000, pause: 'null' });
      }

      // Quote Carousel
      var $carousel = $('#carousel');
      if ($carousel.length > 0 ) {
        $carousel.carousel({ interval:4000, pause: 'hover' });
      }
      
      // Logo Carousel
      var $logo_carousel = $('.logo-carousel');
      if ($logo_carousel.length > 0 ) {
          $logo_carousel.owlCarousel({
            items: 3, loop: true, margin: 6, responsive:{ 600:{ items:4 }, 1000:{ items:6 } }
        });
      }

      // Parallax
      var $parallax = $('.has-parallax');
      if ($parallax.length > 0 ) {
        $parallax.parallaxie({ speed: 0.5, offset: 50 });
      }

      // Icon Rollover -Service
      var $icon_list_over =  $('.icon-list-over');
      if ($icon_list_over.length > 0) {
        $icon_list_over.children('li').on('mouseenter mouseleave', function() {
          $(this).find('.icon').toggleClass('hover');
        });
      }
      // Active page menu when click
      var url = window.location.href;
      var $nav_link = $(".nav li a");
      $nav_link.each(function() {
          if (url === (this.href)) {
              $(this).closest("li").addClass("active");
          }
      });
      // Preloader
      var $preload = $('#preloader');
      if ($preload.length > 0) {
        $(window).on('load', function() {
          $preload.children().fadeOut(300);
          $preload.delay(150).fadeOut(500);
          $('body').delay(100).css({'overflow':'visible'});
        });
      }
      // Google map initialize
      var $mapholder = $('.map-holder');
      if ($mapholder.length > 0) {
        var map = new GMaps({
          div: '#gmap',
          lat: -12.043333,
          lng: -77.028333
        });

        $mapholder.on('click', function () {
          $(this).children().css("pointer-events", "auto");
        });

        $mapholder.on('mouseleave', function() {
          $(this).children().css("pointer-events", "none");
        });
      }
      // ImageBG 
      var $imageBG = $('.imagebg');
      if ($imageBG.length > 0) {
        $imageBG.each(function() {
          var $this = $(this), $this_img = $this.find('img'), img_src = $this_img.attr('src');
          if(img_src!=='' && typeof img_src !=='undefined') {
            $this.addClass('bgloaded').css('background-image', 'url('+ img_src +')');
            $this.parent().addClass('has-imagebg');
          }
        });
      }
      // Gallery Filtering
      var $filtered  = $('.gallery-filter ul'),
          $filterLi = $('.filter-menu li');

      if ($filterLi.length > 0) {
        // Active -item
        $filterLi.on('click', function () {
          $filterLi.removeClass('active');
          $(this).addClass('active');
        });
        // Filter -init()
        $(window).on('load', function() {
          $filtered.filterizr({
             delay: 25
          });
        });
      }
      // Gallery Popup
      var $gallery = $('.gallery-lightbox');
      if ($gallery.length > 0) {
          $gallery.magnificPopup({
            delegate: 'a',
            type:'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) {
                var caption = '', title = item.el.find('img').attr('title'), subtitle = item.el.find('img').attr('alt');
                if (typeof title!=='undefined' && title !=='') { 
                  caption = caption + title; 
                }
                if (typeof subtitle!=='undefined' && subtitle !=='') { 
                  if (typeof title==='undefined' || title ==='') {
                    caption = caption + subtitle; 
                  } else {
                    caption = caption + '<small>' + subtitle + '</small>'; 
                  }
                }
                if (caption==="") { 
                  caption = item.el.attr('title'); 
                }
                return caption;
              } 
            },
            zoom: { enabled: true }
          });
      }
        
      // Image Single Popup
      var $image = $('.single-lightbox');
      if ($image.length > 0) {
        $image.magnificPopup({
            gallery: { enabled: true },
            type:'image'
          });
      }
      // FORM @v 1.1.1
      var contactForm = $('#contact-us'),
          quoteForm = $('#quote-request'), 
          subscribeForm = $('#subscribe-me');
      if (quoteForm.length > 0 || contactForm.length > 0 || subscribeForm.length > 0) {
          if( !$().validate || !$().ajaxSubmit ) {
              console.log('quoteForm: jQuery Form or Form Validate not Defined.');
              return true;
          }
          // Quote Form - home page
          if (quoteForm.length > 0) {
              var selectRec = quoteForm.find('select.required'), 
              qf_results = quoteForm.find('.form-results');
              quoteForm.validate({
                ignore: [],
                errorPlacement: function(error, elm) {
                  if (elm.is('select.required')) { error.insertAfter(elm.next('.nice-select')); } else { error.insertAfter(elm); }
                },
                invalidHandler: function () { qf_results.slideUp(400); },
                submitHandler: function(form) {
                  qf_results.slideUp(400);
                  $(form).ajaxSubmit({
                    target: qf_results, dataType: 'json',
                    success: function(data) {
                      var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                      qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                      if (data.result !== 'error') { $(form).clearForm(); }
                    }
                  });
                }
              });
              selectRec.on('change', function() { $(this).valid(); });
          }
          // Contact Form - contact page
          if (contactForm.length > 0) {
            var cf_results = contactForm.find('.form-results');
            contactForm.validate({
              invalidHandler: function () { cf_results.slideUp(400); },
              submitHandler: function(form) {
                cf_results.slideUp(400);
                $(form).ajaxSubmit({
                  target: cf_results, dataType: 'json',
                  success: function(data) {
                    var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                    cf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                    if (data.result !== 'error') { $(form).clearForm(); }
                  }
                });
              }
            });
          }
          // Subsribe - footer form
          if (subscribeForm.length > 0) {
            var sf_results = subscribeForm.find('.form-results');
            subscribeForm.validate({
              invalidHandler: function () { sf_results.slideUp(400); },
              submitHandler: function(form) {
                sf_results.slideUp(400);
                $(form).ajaxSubmit({
                  target: sf_results, dataType: 'json',
                  success: function(data) {
                    var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                    sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                    if (data.result !== 'error') { $(form).clearForm(); }
                  }
                });
              }
            });
          }
      }
})(jQuery);
