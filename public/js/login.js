const form =
  document.getElementById("loginForm");

form.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    try {

      const response =
        await fetch(
          ("/api/login"),
          {

            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              email,
              password
            })

          }
        );

      const data =
        await response.json();

      if (response.ok) {

        window.location.href =
          "/admin/dashboard";

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.log(error);

      alert("Unable to login.");

    }

  }
);