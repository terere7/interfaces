window.addEventListener('load', () => {

    document.querySelector(".submit").addEventListener("click", checkForm);

    function checkForm() {
        let username = document.querySelector("#username").value;
        let comment = document.querySelector("#comment").value;
        if (username === "") {
            //  alert("You must complete all the inputs");
            document.querySelector(".alert").classList.remove('hide');
            document.querySelector(".alert").classList.add('show');
        } else {
            document.querySelector(".alert").classList.remove('show');
            document.querySelector(".alert").classList.add('hide');
        }
        if (comment === "") {
            //  alert("You must complete all the inputs");
            document.querySelector(".alertC").classList.remove('hide');
            document.querySelector(".alertC").classList.add('show');
        } else {
            document.querySelector(".alertC").classList.remove('show');
            document.querySelector(".alertC").classList.add('hide');
        }
        if (username !== "" && comment !== "") {
            let form = document.querySelector(".form");
            form.innerHTML = "";
            form.innerHTML = '<div class="msg" ><h2>Your comment was succesfully sent. </h2><h3>' + username + ', thank you for your feedback!</h3><button type="submit"><a href="form.html">Back</a></button></div>';
        }
    }
});