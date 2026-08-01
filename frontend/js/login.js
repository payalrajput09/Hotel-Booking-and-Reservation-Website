const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/login",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            }

        );


        const data = await response.json();

        console.log(data);


        // Successful Login

        if (data.success) {

            alert(data.message);


            // Save Token

            localStorage.setItem(
                "token",
                data.token
            );


            // Save User Details

            localStorage.setItem(
                "id",
                data.user.id
            );


            localStorage.setItem(
                "fullName",
                data.user.fullName
            );


            localStorage.setItem(
                "email",
                data.user.email
            );


            localStorage.setItem(
                "role",
                data.user.role
            );


            // Redirect According To Role


            if (data.user.role === "user") {

                window.location.href =
                    "user-dashboard.html";

            }


            else if (data.user.role === "owner") {

                window.location.href =
                    "owner-dashboard.html";

            }

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

});