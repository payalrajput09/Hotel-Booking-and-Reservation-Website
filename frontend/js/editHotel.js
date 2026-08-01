const hotelId = new URLSearchParams(window.location.search).get("id");

const token = localStorage.getItem("token");

// Load Hotel Data
async function loadHotel() {

    try {

        const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!data.success) {
            alert(data.message);
            return;
        }

        const hotel = data.hotel;

        document.getElementById("hotelName").value = hotel.hotelName;
        document.getElementById("description").value = hotel.description;
        document.getElementById("propertyType").value = hotel.propertyType;
        document.getElementById("starRating").value = hotel.starRating;
        document.getElementById("country").value = hotel.country;
        document.getElementById("state").value = hotel.state;
        document.getElementById("city").value = hotel.city;
        document.getElementById("address").value = hotel.address;
        document.getElementById("price").value = hotel.price;
        document.getElementById("image").value = hotel.image;

    } catch (error) {

        alert(error.message);

    }

}

loadHotel();


// Update Hotel
document
.getElementById("addHotelForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const hotelData = {

        hotelName: document.getElementById("hotelName").value,
        description: document.getElementById("description").value,
        propertyType: document.getElementById("propertyType").value,
        starRating: document.getElementById("starRating").value,
        country: document.getElementById("country").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value

    };

    try {

        const response = await fetch(
            `http://localhost:5000/api/hotels/update/${hotelId}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(hotelData)

            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Hotel Updated Successfully");

            window.location.href = "myHotels.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert(error.message);

    }

});