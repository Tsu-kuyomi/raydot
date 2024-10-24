(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

const homebtn = document.getElementById('homebtn');
const aboutbtn = document.getElementById('aboutbtn');
const servebtn = document.getElementById('servebtn');
const projbtn = document.getElementById('projbtn');

homebtn.addEventListener("click", function() {
  // Check if homeBtn already has the active class
  if (homebtn.classList.contains("active")) {
    return; // Do nothing if homeBtn is already active
  }

  // Remove active class from other buttons
  const otherButtons = document.querySelectorAll("#aboutbtn, #servebtn, #projbtn");
  otherButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Add active class to homeBtn
  homebtn.classList.add("active");
});

aboutbtn.addEventListener("click", function() {
  // Check if homeBtn already has the active class
  if (aboutbtn.classList.contains("active")) {
    return; // Do nothing if homeBtn is already active
  }

  // Remove active class from other buttons
  const otherButtons = document.querySelectorAll("#homebtn, #servebtn, #projbtn");
  otherButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Add active class to homeBtn
  aboutbtn.classList.add("active");
});

servebtn.addEventListener("click", function() {
  // Check if homeBtn already has the active class
  if (servebtn.classList.contains("active")) {
    return; // Do nothing if homeBtn is already active
  }

  // Remove active class from other buttons
  const otherButtons = document.querySelectorAll("#homebtn, #aboutbtn, #projbtn");
  otherButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Add active class to homeBtn
  servebtn.classList.add("active");
});

projbtn.addEventListener("click", function() {
  // Check if homeBtn already has the active class
  if (projbtn.classList.contains("active")) {
    return; // Do nothing if homeBtn is already active
  }

  // Remove active class from other buttons
  const otherButtons = document.querySelectorAll("#homebtn, #aboutbtn, #servebtn");
  otherButtons.forEach(button => {
    button.classList.remove("active");
  });

  // Add active class to homeBtn
  projbtn.classList.add("active");
});