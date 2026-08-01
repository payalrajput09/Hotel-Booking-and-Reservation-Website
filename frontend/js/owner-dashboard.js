// ==============================
// Check Login
// ==============================

const token = localStorage.getItem("token");

if (!token) {
    alert("Please Login First");
    window.location.href = "login.html";
}

// ==============================
// Get Owner Data
// ==============================

const fullName = localStorage.getItem("fullName");
const role = localStorage.getItem("role");

// ==============================
// Show Owner Details
// ==============================

document.getElementById("ownerName").innerText = fullName;

document.getElementById("ownerRole").innerText = role;

document.getElementById("welcomeOwner").innerText =
`Welcome, ${fullName}`;

document.getElementById("ownerSubText").innerText =
"Hotel Owner Dashboard";

// ==============================
// Avatar
// ==============================

document.getElementById("ownerAvatar").innerText =
fullName.charAt(0).toUpperCase();

// ==============================
// Logout
// ==============================

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.clear();

    alert("Logout Successful");

    window.location.href = "login.html";

});