const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            responseMessage.style.color = "green";
            responseMessage.textContent = result.message;

            contactForm.reset();

        } else {

            responseMessage.style.color = "red";
            responseMessage.textContent = result.message;

        }

    } catch (err) {

        console.log(err);

        responseMessage.style.color = "red";
        responseMessage.textContent =
            "Unable to send message.";

    }

});