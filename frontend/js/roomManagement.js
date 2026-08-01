const token = localStorage.getItem("token");

const roomContainer = document.getElementById("roomContainer");
const hotelFilter = document.getElementById("hotelFilter");
const searchRoom = document.getElementById("searchRoom");
const addRoomBtn = document.getElementById("addRoomBtn");
const addRoomCard = document.getElementById("addRoomCard");

let allRooms = [];

// ===============================
// Load Rooms
// ===============================

async function loadRooms() {

    if (!token) {

        alert("Please Login First");
        window.location.href = "login.html";
        return;

    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/rooms",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) {

            roomContainer.innerHTML = "<h2>No Rooms Found</h2>";
            return;

        }

        allRooms = data.rooms;

        fillHotelDropdown();

        displayRooms(allRooms);

    }

    catch (error) {

        console.log(error);

    }

}

// ===============================
// Display Rooms
// ===============================

function displayRooms(rooms) {

    roomContainer.innerHTML = "";

    if (rooms.length === 0) {

        roomContainer.innerHTML = `
            <h2>No Rooms Found</h2>
        `;

        return;

    }

    rooms.forEach(room => {

        roomContainer.innerHTML += `

        <article class="room-card">

            <div
                class="room-photo"
                style="background-image:url('${room.image}')">

                <span class="status-pill green">
                    ${room.status}
                </span>

            </div>

            <div class="room-body">

                <div class="room-row">

                    <h3>${room.roomName}</h3>

                    <div class="room-price">
                        ₹${room.price}
                        <span>/night</span>
                    </div>

                </div>

                <div class="room-meta">

                    🏨 ${room.hotel.hotelName}

                    <br>

                    📍 ${room.hotel.city},
                    ${room.hotel.state}

                    <br>

                    👤 Capacity :
                    ${room.capacity}

                </div>

                <p class="room-desc">

                    ${room.description}

                </p>

                <div class="room-footer">

                    <button
                        class="btn btn-light"
                        onclick="editRoom('${room._id}')">

                        Edit

                    </button>

                    <button
                        class="dots"
                        onclick="deleteRoom('${room._id}')">

                        Delete

                    </button>

                </div>

            </div>

        </article>

        `;

    });

}

// ===============================
// Fill Hotel Dropdown
// ===============================

function fillHotelDropdown() {

    const hotels = [];

    hotelFilter.innerHTML = `
        <option value="all">
            All Hotels
        </option>
    `;

    allRooms.forEach(room => {

        if (!hotels.includes(room.hotel.hotelName)) {

            hotels.push(room.hotel.hotelName);

            hotelFilter.innerHTML += `

                <option value="${room.hotel.hotelName}">

                    ${room.hotel.hotelName}

                </option>

            `;

        }

    });

}

// ===============================
// Filter By Hotel
// ===============================

hotelFilter.addEventListener("change", () => {

    if (hotelFilter.value === "all") {

        displayRooms(allRooms);
        return;

    }

    const filteredRooms = allRooms.filter(room =>

        room.hotel.hotelName === hotelFilter.value

    );

    displayRooms(filteredRooms);

});

// ===============================
// Search Room
// ===============================

searchRoom.addEventListener("keyup", () => {

    const value = searchRoom.value.toLowerCase();

    const filtered = allRooms.filter(room =>

        room.roomName.toLowerCase().includes(value)

    );

    displayRooms(filtered);

});

// ===============================
// Add Room
// ===============================

addRoomBtn.addEventListener("click", () => {

    window.location.href = "addRoom.html";

});

addRoomCard.addEventListener("click", () => {

    window.location.href = "addRoom.html";

});

// ===============================
// Edit Room
// ===============================

function editRoom(id) {

    window.location.href = `editRoom.html?id=${id}`;

}

// ===============================
// Delete Room
// ===============================

function deleteRoom(id) {

    alert("Delete API will be added in next step.");

}

// ===============================

loadRooms();