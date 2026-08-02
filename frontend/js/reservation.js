// =============================
// Check Login
// =============================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// =============================
// Get Room ID
// =============================

const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

// =============================
// Elements
// =============================

const roomImage = document.getElementById("roomImage");
const hotelName = document.getElementById("hotelName");
const roomName = document.getElementById("roomName");
const pricePerNight = document.getElementById("pricePerNight");

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const guests = document.getElementById("guests");
const guestName = document.getElementById("guestName");

const totalPrice = document.getElementById("totalPrice");

const bookingForm = document.getElementById("bookingForm");

let roomPricePerNight = 0;

// =============================
// Load Room Details
// =============================

async function loadRoom() {

    try {

        const response = await fetch(

           `http://localhost:5000/api/rooms/details/${roomId}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await response.json();

        console.log(data);

        const room = data.room;

        roomImage.src = room.image;
        hotelName.innerText = room.hotel.hotelName;
        roomName.innerText = room.roomName;
        pricePerNight.innerText = room.price;
        roomPricePerNight = room.price;
        calculatePrice();

         
    }

    catch (error) {

        console.log(error);

    }

}

loadRoom();

// =============================
// Calculate Total Price
// =============================

function calculatePrice() {

    if (!checkIn.value || !checkOut.value) return;

    const start = new Date(checkIn.value);
    const end = new Date(checkOut.value);

    const days = Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {

        totalPrice.innerText = "₹0";

        return;

    }

   totalPrice.innerText = days * roomPricePerNight;

}

checkIn.addEventListener("change", calculatePrice);
checkOut.addEventListener("change", calculatePrice);

// =============================
// Book Room
// =============================

bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(

            "http://localhost:5000/api/bookings/book",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    roomId,

                    checkInDate: checkIn.value,

                    checkOutDate: checkOut.value,

                    guests: guests.value,

                    guestName: guestName.value

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            window.location.href = "bookings.html";

        }

    }

    catch (error) {

        console.log(error);

    }

});