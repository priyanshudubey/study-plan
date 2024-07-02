document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const boxes = document.querySelectorAll(".box");
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookiesButton = document.getElementById("accept-cookies");

  // Search functionality
  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();
    let found = false;
    boxes.forEach((box) => {
      const language = box.getAttribute("data-language").toLowerCase();
      if (language.includes(searchTerm)) {
        box.classList.add("highlight");
        box.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
      } else {
        box.classList.remove("highlight");
      }
    });
    if (!found && searchTerm !== "") {
      alert("No results found.");
    }
  });

  // Check if cookies are accepted
  if (!getCookie("cookiesAccepted")) {
    cookieConsent.style.display = "block";
  }

  acceptCookiesButton.addEventListener("click", function () {
    setCookie("cookiesAccepted", "true", 365);
    cookieConsent.style.display = "none";
  });

  // Function to set a cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }
});
