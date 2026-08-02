// ================================
// Check Login
// ================================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ================================
// Load Owner Profile
// ================================

async function loadOwnerProfile() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/owner/profile",
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

        const owner = data.owner;

        // Main Profile
        document.getElementById("fullName").innerText = owner.fullName;
        document.getElementById("email").innerText = owner.email;
        document.getElementById("phone").innerText = owner.phone;
        document.getElementById("country").innerText = owner.country;
        document.getElementById("state").innerText = owner.state;
        document.getElementById("city").innerText = owner.city;
        document.getElementById("role").innerText = owner.role;
        document.getElementById("verified").innerText =
            owner.isVerified ? "Verified" : "Not Verified";

        // Sidebar
        document.getElementById("ownerName").innerText = owner.fullName;
        document.getElementById("ownerRole").innerText = owner.role;

        // Welcome
        document.getElementById("welcomeOwner").innerText =
            `Welcome, ${owner.fullName}`;

        // Avatar
        const initial = owner.fullName.charAt(0).toUpperCase();

        document.getElementById("ownerAvatar").innerText = initial;
        document.getElementById("profileAvatar").innerText = initial;

    } catch (error) {

        console.log(error);

        alert("Unable to load profile.");

    }

}

loadOwnerProfile();


// ================================
// Logout
// ================================

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.clear();

    alert("Logout Successful");

    window.location.href = "login.html";

});


// ================================
// Edit Profile Button
// ================================

const editBtn = document.getElementById("editProfileBtn");

if (editBtn) {

    editBtn.addEventListener("click", () => {

        alert("Edit Profile feature coming soon.");

    });

}