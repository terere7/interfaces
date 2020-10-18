console.log("hola");

let countDownDate = new Date("Nov 5, 2020 15:37:25").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);


loader();

function loader() {
    setTimeout(function() {
        document.querySelector('.spinner').style.visibility = "hidden";
        document.querySelector('.page').style.visibility = "visible";
    }, 3000);
}


window.addEventListener('scroll', function() {
    let bg = document.querySelector("#bg");
    let mountain = document.querySelector("#mountain");
    let text = document.querySelector("#text");
    let road = document.querySelector("#road");
    let value = window.scrollY;
    bg.style.top = value * 0.5 + 'px';
    mountain.style.top = value * 0.55 + 'px';
    road.style.top = -value * 0.55 + 'px';
    text.style.left = value * 1 + 'px';
    text.style.left = value * 1 + 'px';
    text.style.top = value * 0.65 + 'px';
})