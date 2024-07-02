document.addEventListener("DOMContentLoaded", (event) => {
  // Load checkbox states from cookies
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const savedState = getCookie(checkbox.id);
    if (savedState === "true") {
      checkbox.checked = true;
      checkbox.parentNode.classList.add("completed");
    }
    checkbox.addEventListener("change", (e) => {
      // Save checkbox state to cookies
      setCookie(checkbox.id, checkbox.checked, 365);
      // Toggle the completed class
      checkbox.parentNode.classList.toggle("completed", checkbox.checked);
    });
  });

  // Toggle the visibility of each section
  document
    .querySelectorAll(".expandable h2, .expandable h3")
    .forEach((heading) => {
      heading.addEventListener("click", () => {
        let nextElement = heading.nextElementSibling;
        while (nextElement && !nextElement.tagName.match(/^h[23]$/i)) {
          nextElement.style.display =
            nextElement.style.display === "none" ? "block" : "none";
          nextElement = nextElement.nextElementSibling;
        }
      });
    });

  // Initially show or hide sections based on cookies
  document
    .querySelectorAll(".expandable h2, .expandable h3")
    .forEach((heading) => {
      let nextElement = heading.nextElementSibling;
      const savedState = getCookie(heading.textContent.trim());
      if (savedState === "true") {
        while (nextElement && !nextElement.tagName.match(/^h[23]$/i)) {
          nextElement.style.display = "block";
          nextElement = nextElement.nextElementSibling;
        }
      } else {
        while (nextElement && !nextElement.tagName.match(/^h[23]$/i)) {
          nextElement.style.display = "none";
          nextElement = nextElement.nextElementSibling;
        }
      }
      heading.addEventListener("click", () => {
        const isVisible = nextElement.style.display === "block";
        setCookie(heading.textContent.trim(), !isVisible, 365);
      });
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
