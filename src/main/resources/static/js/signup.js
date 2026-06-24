async function register(){

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        "/api/auth/signup",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }
    );

    if(response.ok){

        alert("Registration Successful");

        window.location.href =
            "/login";
    }
}