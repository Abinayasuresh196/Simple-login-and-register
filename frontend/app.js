const API = "http://localhost:5000/api/auth";

async function registerUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        document.getElementById("msg").innerText = "Please fill in all fields";
        return;
    }

    try {
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        document.getElementById("msg").innerText = data.message;

        if (data.message === "Registration successful") {
            // Clear fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        }

        // If user already exists, navigate to login after 1.5s
        if (data.message === "User already exists") {
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }

    } catch (error) {
        console.error(error);
        document.getElementById("msg").innerText = "Server error, try again later";
    }
}

// Login function
async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        document.getElementById("msg").innerText = "Please fill in all fields";
        return;
    }

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        document.getElementById("msg").innerText = data.message;

    } catch (error) {
        console.error(error);
        document.getElementById("msg").innerText = "Server error, try again later";
    }
}
