document.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard Loaded");

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.cursor = "pointer";
        });
    });

});

function logout() {

    localStorage.removeItem("token");

    alert("Logged out successfully");

    window.location.href = "/login";
}

function goToHistory() {
    window.location.href = "/history";
}

function goToRecommendation() {
    window.location.href = "/recommendation";
}