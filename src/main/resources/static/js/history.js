document.addEventListener("DOMContentLoaded", () => {

    loadHistory();

});

async function loadHistory() {

    try {

        const response = await fetch("/api/recommendations/history", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch history");
        }

        const data = await response.json();

        const historyBody =
            document.getElementById("historyBody");

        historyBody.innerHTML = "";

        data.forEach(item => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.cropName}</td>
                <td>${item.temperature}</td>
                <td>${item.humidity}</td>
                <td>${item.ph}</td>
                <td>${item.rainfall}</td>
                <td>${item.createdAt}</td>
            `;

            historyBody.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("historyBody").innerHTML =
            `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No recommendation history found
                </td>
            </tr>
            `;
    }
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "/login";
}