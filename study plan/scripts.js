// scripts.js

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchResult = document.getElementById("search-result");
  const boxes = document.querySelectorAll(".box");

  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      searchResult.textContent = "Please enter a search term.";
      return;
    }

    let found = false;

    boxes.forEach((box) => {
      const language = box.getAttribute("data-language").toLowerCase();
      const boxElement = box.querySelector("h2");

      if (language.includes(searchTerm)) {
        boxElement.style.backgroundColor = "#ffc107"; // Highlight color
        found = true;

        // Scroll the matching box into view
        box.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add pop-out effect
        box.style.transform = "scale(1.1)";
        box.style.transition = "transform 0.3s";

        setTimeout(() => {
          box.style.transform = "scale(1)";
        }, 300);
      } else {
        boxElement.style.backgroundColor = ""; // Reset background color
      }
    });

    if (found) {
      searchResult.textContent = `Found '${searchTerm}' in the study plans.`;
    } else {
      searchResult.textContent = `No results found for '${searchTerm}'.`;
    }
  });
});
