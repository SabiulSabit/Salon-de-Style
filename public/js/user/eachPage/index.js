jQuery(document).ready(function ($) {
    "use strict";
    $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: true,
        autoplayTimeout: 5000,
        smartSpeed: 10,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
    $('#customers-testimonials1').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: true,
        autoplayTimeout: 3000,
        smartSpeed: 10,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
});

var typed = new Typed('.typed-words', {
    strings: ["Tattoo", " Salon", " Attractions"],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 4000,
    startDelay: 1000,
    loop: true,
    showCursor: true
});


function validatePassword() {
    let password = document.getElementById("abc_password")
    let confirm_password = document.getElementById("confirm_password");
    console.log(password.value, confirm_password.value)
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}