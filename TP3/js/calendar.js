document.addEventListener("DOMContentLoaded", () => {
    let lis = document.querySelectorAll("ul.acordeon li");
    lis.forEach(li => {
        li.addEventListener("click", () => {
            li.nextElementSibling.classList.toggle("visible");
        });
    });
});