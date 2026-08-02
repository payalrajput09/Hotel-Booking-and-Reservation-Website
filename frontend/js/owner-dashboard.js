// ============================================
// Check Login
// ============================================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}


// ============================================
// Owner Details
// ============================================

const fullName = localStorage.getItem("fullName");
const role = localStorage.getItem("role");

document.getElementById("ownerName").innerText = fullName;
document.getElementById("ownerRole").innerText = role;

document.getElementById("welcomeOwner").innerText =
`Welcome, ${fullName}`;

document.getElementById("ownerSubText").innerText =
"Hotel Owner Dashboard";

document.getElementById("ownerAvatar").innerText =
fullName.charAt(0).toUpperCase();

document.getElementById("topAvatar").innerText =
fullName.charAt(0).toUpperCase();


// ============================================
// Dashboard API
// ============================================

async function loadDashboard() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/dashboard/owner",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            alert(data.message);
            return;

        }

        const dashboard = data.dashboard;


        // ==========================
        // Dashboard Cards
        // ==========================

        document.getElementById("totalHotels").innerText =
        dashboard.totalHotels;

        document.getElementById("totalRooms").innerText =
        dashboard.totalRooms;

        document.getElementById("pendingReservations").innerText =
        dashboard.pendingReservations;

        document.getElementById("confirmedReservations").innerText =
        dashboard.confirmedReservations;

        document.getElementById("totalRevenue").innerText =
        "₹" + dashboard.totalRevenue.toLocaleString("en-IN");


        // ==========================
        // Hotel Name
        // ==========================

        if (dashboard.hotelName) {

            document.getElementById("hotelName").innerText =
            dashboard.hotelName;

        }

    }

    catch (error) {

        console.log(error);

    }

}



// ============================================
// Load Owner Bookings
// ============================================

async function loadBookings() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/bookings/owner-bookings",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        if (!data.success) {

            return;

        }

        showRecentReservations(data.bookings);

        showTodayArrivals(data.bookings);

    }

    catch (error) {

        console.log(error);

    }

}



// ============================================
// Recent Reservation Table
// ============================================

function showRecentReservations(bookings) {

    const table = document.getElementById("recentReservationTable");

    table.innerHTML = "";

    if (bookings.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="5">

                No Reservations Found

            </td>

        </tr>

        `;

        return;

    }

    bookings.slice(0,5).forEach((booking)=>{

        const checkIn =
        new Date(booking.checkInDate).toLocaleDateString();

        const today =
        new Date();

        let status = booking.status;

        if (

            booking.status==="Confirmed" &&

            new Date(booking.checkInDate)<=today

        ){

            status="Checked-in";

        }

        table.innerHTML += `

        <tr>

            <td>

                <div class="guest-cell">

                    <div class="guest-dot">

                        ${booking.guestName.charAt(0)}

                    </div>

                    ${booking.guestName}

                </div>

            </td>

            <td>

                ${booking.room.roomName}

            </td>

            <td>

                ${checkIn}

            </td>

            <td>

                ${booking.totalDays}

            </td>

            <td>

                <span class="badge ${status.toLowerCase().replace('-','')}">

                    ${status}

                </span>

            </td>

        </tr>

        `;

    });

}



// ============================================
// Today's Arrivals
// ============================================

function showTodayArrivals(bookings){

    const container =
    document.getElementById("todayArrivalList");

    container.innerHTML="";

    const today =
    new Date().toDateString();

    const todayBookings = bookings.filter((booking)=>{

        return new Date(booking.checkInDate).toDateString()===today;

    });

    if(todayBookings.length===0){

        container.innerHTML=`

        <p class="muted">

            No Arrivals Today

        </p>

        `;

        return;

    }

    todayBookings.forEach((booking)=>{

        container.innerHTML+=`

        <div class="stay-item">

            <div class="who">

                <div class="guest-dot">

                    ${booking.guestName.charAt(0)}

                </div>

                <div>

                    <div class="name">

                        ${booking.guestName}

                    </div>

                    <div class="room">

                        ${booking.room.roomName}

                    </div>

                </div>

            </div>

            <span class="tag-inline tag-in">

                Arrival

            </span>

        </div>

        `;

    });

}

// ============================================
// Alerts
// ============================================

function loadAlerts() {

    const alertContainer =
    document.getElementById("alertContainer");

    alertContainer.innerHTML = `

    <div class="alert-item">

        <div class="alert-dot"
        style="background:#fbf1e2;">

            ⚠️

        </div>

        <div>

            <div class="alert-title">

                Pending Reservations

            </div>

            <div class="alert-sub">

                Please review pending booking requests.

            </div>

        </div>

    </div>

    <div class="alert-item">

        <div class="alert-dot"
        style="background:#e7f0fb;">

            🏨

        </div>

        <div>

            <div class="alert-title">

                Hotel Status

            </div>

            <div class="alert-sub">

                Your hotel is live and accepting bookings.

            </div>

        </div>

    </div>

    <div class="alert-item">

        <div class="alert-dot"
        style="background:#e9f7ee;">

            💰

        </div>

        <div>

            <div class="alert-title">

                Revenue Updated

            </div>

            <div class="alert-sub">

                Dashboard revenue synced successfully.

            </div>

        </div>

    </div>

    `;

}



// ============================================
// Logout
// ============================================

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    if(confirm("Logout?")){

        localStorage.clear();

        window.location.href="login.html";

    }

});



// ============================================
// Start Dashboard
// ============================================

loadDashboard();

loadBookings();

loadAlerts();