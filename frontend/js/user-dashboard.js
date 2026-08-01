// =============================
// Check Login
// =============================

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}



// =============================
// Get Data From Local Storage
// =============================

const fullName = localStorage.getItem("fullName");

const role = localStorage.getItem("role");



// =============================
// Show User Details
// =============================

document.getElementById("userName").innerText = fullName;

document.getElementById("userRole").innerText = role;

document.getElementById("welcomeText").innerText =
`Welcome back, ${fullName}!`;



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