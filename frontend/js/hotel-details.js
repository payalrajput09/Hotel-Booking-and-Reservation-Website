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
// Get Hotel ID
// =============================

const params = new URLSearchParams(window.location.search);

const hotelId = params.get("id");

// =============================
// Load Hotel Details
// =============================

async function loadHotel() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/hotels/details/${hotelId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        const hotel = data.hotel;

        document.getElementById("hotelImage").src = hotel.image;

        document.getElementById("hotelName").innerText =
        hotel.hotelName;

        document.getElementById("hotelLocation").innerText =
        `📍 ${hotel.city}, ${hotel.state}`;

        document.getElementById("hotelRating").innerText =
        `⭐ ${hotel.starRating} Star`;

        document.getElementById("hotelPrice").innerText =
        `₹${hotel.price} / Night`;

        document.getElementById("hotelDescription").innerText =
        hotel.description;

    }

    catch (error) {

        console.log(error);

    }

}

// =============================
// Load Rooms
// =============================

async function loadRooms() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/rooms/hotel/${hotelId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        const roomContainer =
        document.getElementById("roomContainer");

        roomContainer.innerHTML = "";

        if (data.rooms.length === 0) {

            roomContainer.innerHTML =

            "<h3>No Rooms Available</h3>";

            return;

        }

        data.rooms.forEach(room => {

            roomContainer.innerHTML += `

            <div class="room-card">

                <img src="${room.image}">

                <div class="room-body">

                    <h3>${room.roomName}</h3>

                    <p>Type : ${room.roomType}</p>

                    <p>Capacity : ${room.capacity}</p>

                    <p>Status : ${room.status}</p>

                    <h2>₹${room.price}</h2>

                    <button

                        class="book-btn"

                        onclick="bookRoom('${room._id}')">

                        Book Now

                    </button>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =============================
// Book Room
// =============================

// =============================
// Book Room
// =============================

function bookRoom(roomId) {

    window.location.href = `reservation.html?roomId=${roomId}`;

}
// =============================
// Start
// =============================

loadHotel();

loadRooms();