const url = window.location.href;
const country = url.replace(/.*=/, "").replaceAll(/%\d*/g, " ");

// Example function to add dynamic items
function addDropdownItem(text) {
  var newItem = $(
    `<li><a class="dropdown-item" href="WhereBuffer.html?country=${country}?place=${text}">` +
      text +
      "</a></li>"
  );
  $(".dropdown-menu").append(newItem);
}

function goBack() {
  window.open(`https://kyloren010.github.io/world-clock/Options.html?country=${country}`);
  window.close();
}

fetch("output.json")
  .then((response) => response.json())
  .then((data) => {
    // Process the JSON data
    console.log(data);
    data[country].forEach((element) => {
      addDropdownItem(element);
    });
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch request
    console.error("Error:", error);
  });

// You can call this function multiple times with different item texts

var dynamicTextElement = document.getElementById("dynamicText");
dynamicTextElement.textContent = country;
