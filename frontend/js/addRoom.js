const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// ===========================
// DOM
// ===========================

const hotelId = document.getElementById("hotelId");
const roomForm = document.getElementById("roomForm");

// ===========================
// Load Hotels
// ===========================

async function loadHotels() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/hotels/my-hotels",
            {

                method: "GET",

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

        data.hotels.forEach((hotel) => {

            hotelId.innerHTML += `

                <option value="${hotel._id}">

                    ${hotel.hotelName}

                </option>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadHotels();

// ===========================
// Add Room
// ===========================

roomForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const roomData = {

        hotelId: hotelId.value,

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

            "http://localhost:5000/api/rooms/add",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(roomData)

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Room Added Successfully ✅");

            window.location.href = "roomManagement.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong");

    }

});