// ===========================
// Check Login
// ===========================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ===========================
// Sidebar User Info
// ===========================

document.getElementById("ownerName").innerText =
localStorage.getItem("fullName");

document.getElementById("ownerRole").innerText =
localStorage.getItem("role");

// ===========================
// Logout
// ===========================

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

// ===========================
// Booking Container
// ===========================

const bookingContainer =
document.getElementById("bookingContainer");

// ===========================
// Load Owner Bookings
// ===========================

async function loadBookings(){

    try{

        const response = await fetch(

            "http://localhost:5000/api/bookings/owner-bookings",

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        showBookings(data.bookings);

    }

    catch(error){

        console.log(error);

    }

}

// ===========================
// Show Bookings
// ===========================

function showBookings(bookings){

    bookingContainer.innerHTML="";

    if(bookings.length===0){

        bookingContainer.innerHTML=`

        <h2>No Reservations Found</h2>

        `;

        return;

    }

    bookings.forEach((booking)=>{

        const checkIn =
        new Date(booking.checkInDate).toLocaleDateString();

        const checkOut =
        new Date(booking.checkOutDate).toLocaleDateString();

        bookingContainer.innerHTML += `

        <div class="booking-card">

            <img src="${booking.hotel.image}" alt="Hotel">

            <div class="booking-body">

                <h2>${booking.hotel.hotelName}</h2>

                <p><b>Guest :</b> ${booking.guestName}</p>

                <p><b>Email :</b> ${booking.user?.email || "-"}</p>

                <p><b>Phone :</b> ${booking.user?.phone || "-"}</p>

                <p><b>Room :</b> ${booking.room.roomName}</p>

                <p><b>Guests :</b> ${booking.guests}</p>

                <p><b>Check In :</b> ${checkIn}</p>

                <p><b>Check Out :</b> ${checkOut}</p>

                <p><b>Total :</b> ₹${booking.totalPrice}</p>

                <span class="status ${booking.status.toLowerCase()}">

                    ${booking.status}

                </span>

                <div class="action-buttons">

                    ${
                        booking.status==="Pending"

                        ?

                        `

                        <button
                        class="accept-btn"
                        onclick="approveBooking('${booking._id}')">

                        Accept

                        </button>

                        <button
                        class="reject-btn"
                        onclick="rejectBooking('${booking._id}')">

                        Reject

                        </button>

                        `

                        :

                        ""

                    }

                </div>

            </div>

        </div>

        `;

    });

}

// ===========================
// Accept Booking
// ===========================

async function approveBooking(id){

    if(!confirm("Accept this booking?")) return;

    const response = await fetch(

        `http://localhost:5000/api/bookings/accept/${id}`,

        {

            method:"PUT",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    alert(data.message);

    loadBookings();

}

// ===========================
// Reject Booking
// ===========================

async function rejectBooking(id){

    if(!confirm("Reject this booking?")) return;

    const response = await fetch(

        `http://localhost:5000/api/bookings/reject/${id}`,

        {

            method:"PUT",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    alert(data.message);

    loadBookings();

}

// ===========================
// Start
// ===========================

loadBookings();