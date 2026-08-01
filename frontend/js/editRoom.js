const token = localStorage.getItem("token");

const roomId = new URLSearchParams(window.location.search).get("id");

const form = document.getElementById("roomForm");

// ===============================
// Load Hotels
// ===============================

async function loadHotels(selectedHotelId) {

    try {

        const response = await fetch(
            "http://localhost:5000/api/hotels/my-hotels",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const hotelSelect = document.getElementById("hotelId");

        hotelSelect.innerHTML = "";

        data.hotels.forEach((hotel) => {

            hotelSelect.innerHTML += `

                <option
                    value="${hotel._id}"
                    ${hotel._id === selectedHotelId ? "selected" : ""}
                >
                    ${hotel.hotelName}
                </option>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// ===============================
// Load Room Details
// ===============================

async function loadRoom() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/rooms/${roomId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        const room = data.room;

        await loadHotels(room.hotel._id);

        document.getElementById("roomName").value = room.roomName;
        document.getElementById("roomType").value = room.roomType;
        document.getElementById("price").value = room.price;
        document.getElementById("capacity").value = room.capacity;
        document.getElementById("description").value = room.description.trim();
        document.getElementById("image").value = room.image;
        document.getElementById("status").value = room.status;

    }

    catch (error) {

        console.log(error);

    }

}

// ===============================
// Update Room
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const roomData = {

        roomName: document.getElementById("roomName").value,

        roomType: document.getElementById("roomType").value,

        price: document.getElementById("price").value,

        capacity: document.getElementById("capacity").value,

        description: document.getElementById("description").value,

        image: document.getElementById("image").value,

        status: document.getElementById("status").value

    };

    try {

        const response = await fetch(

            `http://localhost:5000/api/rooms/${roomId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(roomData)

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Room Updated Successfully");

            window.location.href = "roomManagement.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

    }

});

// ===============================

loadRoom();