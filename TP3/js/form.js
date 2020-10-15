window.addEventListener('load', () => {


    document.querySelector(".submit").addEventListener("click", checkForm);



    function checkForm() {
        let username = document.querySelector("#username").value;
        let comment = document.querySelector("#comment").value;
        if (username === "" || comment === "") {
            console.log(username);
            console.log(comment)
            alert("You must complete all the inputs");
        } else {
            let form = document.querySelector(".form");
            form.innerHTML = "";
            form.innerHTML = "<h2>Your comment was succesfully sent! </h2><h3>" + username + " Thank you for your feedback!</h3>"
        }
    }
});