const registerForm = document.getElementById("registerForm");


  registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Form values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;

    

    // Check Password

if (password !== confirmPassword) {

    alert("Passwords do not match");

    return;

}
try {
    const response = await fetch(

    "http://localhost:5000/api/auth/register/user",

    {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            fullName,
            email,
            phone,
            password,
            country,
            state,
            city

        })

    }

);

const data = await response.json();
console.log(data);

if (data.success) {

    alert(data.message);

    // Redirect to Login Page
    window.location.href = "login.html";

} else {

    alert(data.message);

}


} catch (error) {

    console.log(error);

}

});