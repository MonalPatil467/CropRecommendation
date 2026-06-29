async function fetchWeather() {

    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    try {

        const response = await fetch("/api/weather/" + city);

        const data = await response.json();

        document.getElementById("temperature").value =
            data.main.temp;

        document.getElementById("humidity").value =
            data.main.humidity;

        let rainfall = "Low";

        if (data.rain && data.rain["1h"]) {

            const rain = data.rain["1h"];

            if (rain < 2) {
                rainfall = "Low";
            } else if (rain < 10) {
                rainfall = "Moderate";
            } else {
                rainfall = "High";
            }
        }

        document.getElementById("rainfall").value = rainfall;

    } catch (error) {

        console.error(error);

        alert("Unable to fetch weather.");

    }
}

async function getRecommendation() {

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

    const irrigation =
        document.getElementById("irrigation").value;

    const language =
        document.getElementById("language").value;

    document.getElementById("comparisonContainer").style.display = "none";

    document.getElementById("result").innerHTML = `
        <div class="recommendation-card">
            <h3>🌱 Analyzing Farm Conditions...</h3>
            <p>Please wait a few seconds.</p>
        </div>
    `;

    try {

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
                irrigation,
                language

            })

        });

        if (!response.ok) {
            throw new Error("Server Error : " + response.status);
        }

        const data = await response.json();

        /* ===========================
           Recommendation
        ============================ */

        document.getElementById("result").innerHTML = `

            <div class="recommendation-card">

                <h3>🌾 Best Crop Recommendation</h3>

                <div class="recommendation-content">

                    ${(data.recommendation || "No recommendation received")
                        .replace(/\n/g,"<br>")}

                </div>

            </div>

        `;


        if (data.topCrops && data.topCrops.length > 0) {

            const comparisonCards =
                document.getElementById("comparisonCards");

            comparisonCards.innerHTML = "";

            data.topCrops.forEach((crop,index)=>{

                comparisonCards.innerHTML += `

                    <div class="crop-card">

                        <div class="rank">
                            Rank #${index+1}
                        </div>

                        <h3>${crop.name}</h3>

                        <p>
                            <strong>Suitability:</strong>
                            <span class="score">
                                ${crop.score}
                            </span>
                        </p>

                        <p>${crop.reason}</p>

                    </div>

                `;

            });

            document.getElementById("comparisonContainer").style.display =
                "block";

        }

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

