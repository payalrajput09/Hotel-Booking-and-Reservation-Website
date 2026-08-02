// =============================
// Check Login
// =============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// =============================
// User Details
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

    window.location.href = "login.html";

});

// =============================
// Elements
// =============================

const bookingContainer =
document.getElementById("bookingContainer");

const searchBooking =
document.getElementById("searchBooking");

let bookings = [];

// =============================
// Load Bookings
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

        bookings = data.bookings;

        showBookings(bookings);

    }

    catch (error) {

        console.log(error);

    }

}

// =============================
// Show Bookings
// =============================

function showBookings(data) {

    bookingContainer.innerHTML = "";

    if (data.length === 0) {

        bookingContainer.innerHTML = `

        <div class="empty-box">

            <h2>No Bookings Found</h2>

            <p>Your bookings will appear here.</p>

            <button
                class="book-btn"
                onclick="window.location.href='search.html'">

                Search Hotels

            </button>

        </div>

        `;

        return;

    }

    data.forEach((booking) => {

        const checkIn = new Date(
            booking.checkInDate
        ).toLocaleDateString();

        const checkOut = new Date(
            booking.checkOutDate
        ).toLocaleDateString();

        bookingContainer.innerHTML += `

        <div class="booking-card">

            <img src="${booking.hotel.image}" alt="Hotel">

            <div class="booking-body">

                <h2>${booking.hotel.hotelName}</h2>

                <p>📍 ${booking.hotel.city}, ${booking.hotel.state}</p>

                <p>🏨 Room : ${booking.room.roomName}</p>

                <p>🛏 Type : ${booking.room.roomType}</p>

                <p>📅 Check In : ${checkIn}</p>

                <p>📅 Check Out : ${checkOut}</p>

                <p>👤 Guest : ${booking.guestName}</p>

                <p>👥 Guests : ${booking.guests}</p>

                <p>💰 Total Price : ₹${booking.totalPrice}</p>

                <p>💳 Payment : ${booking.paymentStatus}</p>

                <span class="status ${booking.status.toLowerCase()}">

                    ${booking.status}

                </span>

                <div class="card-buttons">

                    <button
                        class="view-btn">

                        View Details

                    </button>

                    ${
                        booking.status === "Pending"
                        ? `
                        <button
                            class="cancel-btn"
                            onclick="cancelBooking('${booking._id}')">

                            Cancel Booking

                        </button>
                        `
                        : `
                        <button
                            class="cancel-btn"
                            disabled>

                            ${booking.status}

                        </button>
                        `
                    }

                </div>

            </div>

        </div>

        `;

    });

}

// =============================
// Search
// =============================

searchBooking.addEventListener("keyup", () => {

    const value = searchBooking.value.toLowerCase();

    const filtered = bookings.filter(

        booking =>

        booking.hotel.hotelName

        .toLowerCase()

        .includes(value)

    );

    showBookings(filtered);

});

// =============================
// Cancel Booking
// =============================

function cancelBooking(id) {

    alert("Cancel Booking API Next Step");

}

// =============================
// Start
// =============================

loadBookings();


// =============================
// Cancel Booking
// =============================

async function cancelBooking(id) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

        const response = await fetch(

            `http://localhost:5000/api/bookings/cancel/${id}`,

            {

                method: "PUT",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            loadBookings();

        }

    }

    catch (error) {

        console.log(error);

    }

}