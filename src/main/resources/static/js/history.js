let historyData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
});

async function loadHistory() {

    try {

        const response = await fetch("/recommendation/history");

        if (!response.ok) {
            throw new Error("Failed to fetch history");
        }

        const data = await response.json();

        historyData = data;

        const historyBody = document.getElementById("historyBody");
        historyBody.innerHTML = "";

        if (data.length === 0) {

            historyBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">
                        No recommendation history found
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.soilType}</td>
                <td>${item.temperature} °C</td>
                <td>${item.humidity} %</td>
                <td>${item.rainfall}</td>
                <td>${new Date(item.createdAt).toLocaleString()}</td>
                <td>
                    <button class="view-btn"
                            onclick="showRecommendation(${item.id})">
                        View
                    </button>
                </td>
            `;

            historyBody.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("historyBody").innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;color:red;">
                    Unable to load recommendation history
                </td>
            </tr>
        `;
    }
}

function showRecommendation(id) {

    const item = historyData.find(history => history.id == id);

    if (!item) {
        alert("Recommendation not found.");
        return;
    }

    document.getElementById("recommendationText").innerHTML =
        item.recommendation.replace(/\n/g, "<br>");

    // Store the current recommendation id for PDF download
    document.getElementById("downloadBtn").dataset.id = item.id;

    document.getElementById("recommendationModal").style.display = "flex";
}

function closeModal() {

    document.getElementById("recommendationModal").style.display = "none";
}

window.onclick = function (event) {

    const modal = document.getElementById("recommendationModal");

    if (event.target === modal) {
        closeModal();
    }
};

function downloadPdf(id) {

    if (!id) {
        alert("Recommendation ID not found.");
        return;
    }

    // Opens the PDF in a new tab (or downloads it depending on browser headers)
    window.open("/recommendation/pdf/" + id, "_blank");
}

function logout() {

    window.location.href = "/login";
}