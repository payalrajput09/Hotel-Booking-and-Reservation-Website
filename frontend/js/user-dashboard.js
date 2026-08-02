const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ----------------------
// Load User Profile
// ----------------------

async function loadProfile() {

    try {

        const res = await fetch(
            "http://localhost:5000/api/auth/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();

        if (data.success) {

            document.getElementById("userName").innerText =
                data.user.fullName;

            document.getElementById("userRole").innerText =
                data.user.role;

            document.getElementById("welcomeText").innerText =
                `Welcome Back, ${data.user.fullName}`;

        }

    } catch (err) {

        console.log(err);

    }

}

// ----------------------
// Load Dashboard
// ----------------------

async function loadDashboard() {

    try {

        const res = await fetch(
            "http://localhost:5000/api/user/dashboard",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();

        if (!data.success) return;

        const dashboard = data.dashboard;

        // ---------------- Stats ----------------

        document.getElementById("totalBookings").innerText =
            dashboard.totalBookings;

        document.getElementById("pendingBookings").innerText =
            dashboard.pendingBookings;

        // ---------------- Upcoming Trip ----------------

        if (dashboard.upcomingBooking) {

            const trip = dashboard.upcomingBooking;

            document.getElementById("tripHotel").innerText =
                trip.hotel.hotelName;

            document.getElementById("tripDates").innerText =
                `${new Date(trip.checkInDate).toLocaleDateString()} - ${new Date(trip.checkOutDate).toLocaleDateString()}`;

            document.getElementById("tripStatus").innerText =
                trip.status;

            document.getElementById("tripId").innerText =
                "Booking ID : " + trip._id;

        }

        // ---------------- Recent Bookings ----------------

        const bookingContainer =
            document.getElementById("recentBookings");

        bookingContainer.innerHTML = "";

        dashboard.recentBookings.forEach((booking) => {

            bookingContainer.innerHTML += `

            <div class="booking-card">

                <h4>${booking.hotel.hotelName}</h4>

                <p>
                Guest :
                ${booking.guestName}
                </p>

                <p>

                ₹${booking.totalPrice}

                </p>

                <span class="status">

                ${booking.status}

                </span>

            </div>

            `;

        });

        // ---------------- Recent Activity ----------------

        const activity =
            document.getElementById("activityContainer");

        activity.innerHTML = "";

        dashboard.recentBookings.forEach((booking) => {

            activity.innerHTML += `

            <div class="activity-item">

                <h4>

                ${booking.hotel.hotelName}

                </h4>

                <p>

                ${booking.status}

                </p>

                <small>

                ${new Date(
                    booking.createdAt
                ).toLocaleDateString()}

                </small>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

// ----------------------
// Logout
// ----------------------

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

// ----------------------

loadProfile();

loadDashboard();