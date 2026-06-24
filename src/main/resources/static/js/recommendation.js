async function getRecommendation() {

    const soilType = document.getElementById("soilType").value;
    const temperature = parseFloat(document.getElementById("temperature").value);
    const humidity = parseFloat(document.getElementById("humidity").value);
    const rainfall = document.getElementById("rainfall").value;
    const season = document.getElementById("season").value;
    const language = document.getElementById("language").value;

    try {

        document.getElementById("result").innerHTML = `
            <div class="recommendation-card">
                <h3>🌱 Analyzing Farm Conditions...</h3>
                <p>Please wait a few seconds.</p>
            </div>
        `;

        const response = await fetch("/recommendation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                soilType,
                temperature,
                humidity,
                rainfall,
                season,
                language
            })
        });

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