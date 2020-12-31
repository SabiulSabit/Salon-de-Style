function validatePassword() {
    let password = document.getElementById("abc_password")
    let confirm_password = document.getElementById("confirm_password");
    console.log(password.value,confirm_password.value)
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

var typed = new Typed('.typed-words', {
    strings: [" Tattoo shop", " Salon"," Attractions"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 4000,
    startDelay: 1000,
    loop: true,
    showCursor: true
});