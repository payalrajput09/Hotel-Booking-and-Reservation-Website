const token = localStorage.getItem("token");

async function loadHotels() {

    if (!token) {
        alert("Please Login First");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/hotels/my-hotels", {

            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        const hotelContainer = document.getElementById("hotelContainer");
        const hotelCount = document.getElementById("hotelCount");

        hotelContainer.innerHTML = "";

        if (!data.success || data.hotels.length === 0) {

            hotelContainer.innerHTML = `
                <div class="no-hotel">
                    <h2>No Hotels Found</h2>
                    <p>Add your first hotel to get started.</p>
                </div>
            `;

            hotelCount.innerHTML = "Total Hotels : 0";

            return;

        }

        hotelCount.innerHTML = `Total Hotels : ${data.hotels.length}`;

        data.hotels.forEach((hotel) => {

            hotelContainer.innerHTML += `

            <div class="hotel-card">

                <img src="${hotel.image}" alt="${hotel.hotelName}">

                <div class="hotel-body">

                    <h2 class="hotel-name">${hotel.hotelName}</h2>

                    <p class="hotel-location">
                        📍 ${hotel.city}, ${hotel.state}
                    </p>

                    <p class="hotel-type">
                        🏨 ${hotel.propertyType}
                    </p>

                    <p class="hotel-rating">
                        ⭐ ${hotel.starRating} Star
                    </p>

                    <p class="hotel-price">
                        ₹${hotel.price} / Night
                    </p>

                    <div class="hotel-buttons">

                        <a href="editHotel.html?id=${hotel._id}" class="edit-btn">
                                   Edit
                        </a>

                        <button
                            class="delete-btn"
                            data-id="${hotel._id}">
                            Delete
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    }
    catch (error) {

        console.log(error);

    }

}

loadHotels();


// ===============================
// Delete Hotel
// ===============================

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn")) return;

    const hotelId = e.target.dataset.id;

    const confirmDelete = confirm(
        "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/hotels/delete/${hotelId}`,
            {

                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Hotel Deleted Successfully");

            // Reload Hotel List
            loadHotels();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

    }

});