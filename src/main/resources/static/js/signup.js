async function register() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            alert(errorText);

            return;
        }

        const data =
            await response.json();

        localStorage.setItem(
            "token",
            data.token
        );

        alert("Registration Successful");

        window.location.href =
            "/login";

    } catch (error) {

        console.error(error);

        alert("Registration Failed");
    }
}