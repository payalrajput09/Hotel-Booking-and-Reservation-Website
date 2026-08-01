const form = document.getElementById("addHotelForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

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
            "http://localhost:5000/api/hotels/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(hotelData)
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Hotel Added Successfully ✅");

            form.reset();

            // Optional
            // window.location.href = "hoteledit.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

});