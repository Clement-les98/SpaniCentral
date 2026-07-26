const cookieBanner =
    document.getElementById("cookieBanner");

const acceptButton =
    document.getElementById("acceptCookies");

if (cookieBanner && acceptButton) {

    if (!localStorage.getItem("cookiesAccepted")) {

        cookieBanner.style.display = "flex";

    }

    acceptButton.addEventListener("click", () => {

        localStorage.setItem(
            "cookiesAccepted",
            "true"
        );

        cookieBanner.style.display = "none";

    });

}