console.log("hola");
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