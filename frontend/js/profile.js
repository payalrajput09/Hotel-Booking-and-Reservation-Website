// =============================
// Check Login
// =============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// =============================
// Sidebar User Details
// =============================

document.getElementById("userName").innerText =
localStorage.getItem("fullName");

document.getElementById("userRole").innerText =
localStorage.getItem("role");

// =============================
// Logout
// =============================

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.clear();

    alert("Logout Successful");

    window.location.href = "login.html";

});

// =============================
// Load Profile
// =============================

async function loadProfile() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/profile",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        const user = data.user;

        document.getElementById("fullName").value =
        user.fullName;

        document.getElementById("email").value =
        user.email;

        document.getElementById("phone").value =
        user.phone;

        document.getElementById("role").value =
        user.role;

        document.getElementById("createdAt").value =
        new Date(user.createdAt).toLocaleDateString();

    }

    catch (error) {

        console.log(error);

    }

}

// =============================
// Start
// =============================

loadProfile();


// =============================
// Update Profile
// =============================

document
.getElementById("updateBtn")
.addEventListener("click", async () => {

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/update-profile",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    fullName: document.getElementById("fullName").value,

                    phone: document.getElementById("phone").value,

                    country: "India",

                    state: "Madhya Pradesh",

                    city: "Indore"

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            localStorage.setItem("fullName", data.user.fullName);

            document.getElementById("userName").innerText =
            data.user.fullName;

        }

    }

    catch (error) {

        console.log(error);

    }

});