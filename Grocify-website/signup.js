function validation (){
    if(document. formfill.username.value==""){
        document.getElementById("result").innerHTML="Enter Username*";
        return false;
    }
    else if (document.fill.username.value.length<6){
        document.getElementaryById("result").innerHTML="atleast six letter*";
        return false
    }
    else if (document.formfill.email.value==""){
        document.getElementById("result").innerHTML="Enter your Email*";
        return false;
    }
    else if(document.formfill.password.value==""){
        document.getElementById("result").innerHTML="enter your password";
        return false;
    }
    else if (document.formfill.cpassword.value.length<6){
        document.getElementById("result").innerHTML="password must be 6-digits";
        return false;
    }
    else if (document.formfill.password.value!==document.formfill.cpassword.value){
        document.getElementById("result").innerHTML="Enter confirm password";
        return false
    }
    else if (document.formfill.cpassword.value !==document.formfill.password. value){
        document.getElementById("result").innerHTML="password does'nt matched"; 
        return false;
    }
    else if (document.formfill.cpassword.value ==document.formfill.Cpassword. value){
        popup.classList.add("open-slide")
        return false; 
    }
}
    
/*document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".form-box form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Here you can add your authentication logic (e.g., AJAX request to a server)

        // For now, we'll assume the login is successful and redirect to the dashboard
        window.location.href ="login.html";
    });
});*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[name="formfill"]');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const username = form.username.value.trim();
        const email = form.Email.value.trim();
        const password = form.password.value;
        const cpassword = form.cpassword.value;

        // Clear previous error messages
        clearErrors();

        // Validate the form
        let valid = true;
        if (username === "") {
            showError('username', 'Username is required');
            valid = false;
        }

        if (email === "") {
            showError('Email', 'Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('Email', 'Invalid email format');
            valid = false;
        }

        if (password === "") {
            showError('password', 'Password is required');
            valid = false;
        }

        if (cpassword === "") {
            showError('cpassword', 'Confirm password is required');
            valid = false;
        } else if (password !== cpassword) {
            showError('cpassword', 'Passwords do not match');
            valid = false;
        }

        if (valid) {
            // Handle form submission (e.g., send data to the server)
            console.log('Form submitted successfully!');
            form.submit();
            window.location.href='login.html';
        }
    });

    function showError(inputName, message) {
        const inputBox = document.querySelector(input[name="${inputName}"]).parentElement;
        const error = document.createElement('div');
        error.className = 'error';
        error.innerText = message;
        inputBox.appendChild(error);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.remove());
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});