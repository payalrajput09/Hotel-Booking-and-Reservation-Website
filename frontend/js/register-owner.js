// Get Owner Registration Form
alert("JS File Loaded");
const ownerRegisterForm = document.getElementById("ownerRegisterForm");

// Form Submit Event
ownerRegisterForm.addEventListener("submit", async (event) => {
    console.log("Form Submitted");
alert("Button Clicked");

    // Prevent Page Refresh
    event.preventDefault();

    // Get Form Values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;


    // Password Validation
    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }


    // API Call
    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register/owner",
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


        // Convert Response into JSON
        const data = await response.json();

        console.log(data);


        // Success Response
        if (data.success) {

            alert(data.message);

            // Redirect to Login Page
            window.location.href = "login.html";

        }

        // Error Response
        else {

            alert(data.message);

        }

    }

    // Catch Errors
    catch (error) {

        console.log(error);
        alert("Something went wrong.");

    }

});