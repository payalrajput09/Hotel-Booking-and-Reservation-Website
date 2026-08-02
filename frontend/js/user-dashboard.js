// =============================
// Check Login
// =============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}



// =============================
// Get Data From Local Storage
// =============================

const fullName = localStorage.getItem("fullName");

const role = localStorage.getItem("role");



// =============================
// Show User Details
// =============================

document.getElementById("userName").innerText = fullName;

document.getElementById("userRole").innerText = role;

document.getElementById("welcomeText").innerText =
`Welcome back, ${fullName}!`;



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
// Dashboard Elements
// =============================

const totalBookings = document.getElementById("totalBookings");

const pendingBookings = document.getElementById("pendingBookings");

const recentBookings = document.getElementById("recentBookings");

const activityContainer = document.getElementById("activityContainer");

const tripHotel = document.getElementById("tripHotel");

const tripDates = document.getElementById("tripDates");

const tripStatus = document.getElementById("tripStatus");

const tripId = document.getElementById("tripId");


// =============================
// Load User Bookings
// =============================

async function loadBookings() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/bookings/my-bookings",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

    }

    catch (error) {

        console.log(error);

    }

}


loadBookings();