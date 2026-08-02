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

const fullName = localStorage.getItem("fullName");
const role = localStorage.getItem("role");

document.getElementById("userName").innerText = fullName;
document.getElementById("userRole").innerText = role;

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
// Elements
// =============================

const hotelContainer = document.getElementById("hotelContainer");

const searchInput = document.getElementById("searchInput");

const cityFilter = document.getElementById("cityFilter");

let hotels = [];

// =============================
// Load Hotels
// =============================

async function loadHotels() {

    try {

        const response = await fetch(

            "http://localhost:5000/api/hotels",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        hotels = data.hotels;

        showHotels(hotels);

        loadCities();

    }

    catch (error) {

        console.log(error);

    }

}

// =============================
// Show Hotels
// =============================

function showHotels(data) {

    hotelContainer.innerHTML = "";

    if (data.length === 0) {

        hotelContainer.innerHTML = `

            <h2>No Hotels Found</h2>

        `;

        return;

    }

    data.forEach((hotel) => {

        hotelContainer.innerHTML += `

        <div class="hotel-card">

            <img src="${hotel.image}">

            <div class="hotel-body">

                <h3>${hotel.hotelName}</h3>

                <p class="location">

                    📍 ${hotel.city}, ${hotel.state}

                </p>

                <p class="star">

                    ⭐ ${hotel.starRating} Star

                </p>

                <p class="price">

                    ₹${hotel.price}/Night

                </p>

                <button

                    class="view-btn"

                    onclick="viewHotel('${hotel._id}')">

                    View Details

                </button>

            </div>

        </div>

        `;

    });

}

// =============================
// View Details
// =============================

function viewHotel(id) {

    window.location.href = `hotel-details.html?id=${id}`;

}

// =============================
// Search
// =============================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = hotels.filter((hotel) =>

        hotel.hotelName.toLowerCase().includes(value)

        ||

        hotel.city.toLowerCase().includes(value)

    );

    showHotels(filtered);

});

// =============================
// City Filter
// =============================

function loadCities() {

    const cities = [...new Set(hotels.map(h => h.city))];

    cities.forEach(city => {

        cityFilter.innerHTML += `

            <option value="${city}">

                ${city}

            </option>

        `;

    });

}

cityFilter.addEventListener("change", () => {

    if (cityFilter.value === "") {

        showHotels(hotels);

        return;

    }

    const filtered = hotels.filter(

        hotel => hotel.city === cityFilter.value

    );

    showHotels(filtered);

});

// =============================
// Start
// =============================

loadHotels();