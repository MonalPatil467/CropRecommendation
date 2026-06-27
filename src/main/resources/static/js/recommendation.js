async function fetchWeather() {

    const city =
        document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    try {

        const response =
            await fetch("/api/weather/" + city);

        const data =
            await response.json();

        document.getElementById("temperature").value =
            data.main.temp;

        document.getElementById("humidity").value =
            data.main.humidity;

        let rainfall = "Low";

        if (data.rain && data.rain["1h"]) {

            const rainAmount =
                data.rain["1h"];

            if (rainAmount < 2) {
                rainfall = "Low";
            } else if (rainAmount < 10) {
                rainfall = "Moderate";
            } else {
                rainfall = "High";
            }
        }

        document.getElementById("rainfall").value =
            rainfall;

    } catch (error) {

        console.error(error);

        alert("Failed to fetch weather data");
    }
}
async function getRecommendation() {

    console.log("getRecommendation called");

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const soilType =
        document.getElementById("soilType").value;

    const temperature =
        parseFloat(document.getElementById("temperature").value);

    const humidity =
        parseFloat(document.getElementById("humidity").value);

    const rainfall =
        document.getElementById("rainfall").value;

    const season =
        document.getElementById("season").value;

    const language =
        document.getElementById("language").value;

    try {

        document.getElementById("result").innerHTML = `
            <div class="recommendation-card">
                <h3>🌱 Analyzing Farm Conditions...</h3>
                <p>Please wait a few seconds.</p>
            </div>
        `;

        console.log("Sending Authorization:", "Bearer " + token);

        const response = await fetch(
            "/recommendation",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    soilType,
                    temperature,
                    humidity,
                    rainfall,
                    season,
                    language
                })
            }
        );

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }

        const data = await response.json();

        console.log("Response:", data);

        document.getElementById("result").innerHTML =
            `<div class="recommendation-card">
                <h3>🌾 Crop Recommendation</h3>
                <div class="recommendation-content">
                    ${(data.recommendation || "No recommendation received")
                        .replace(/\n/g, "<br>")}
                </div>
            </div>`;

    } catch (error) {

        console.error(error);

        document.getElementById("result").innerHTML = `
            <div class="recommendation-card">
                <h3>❌ Error</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

