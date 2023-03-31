// IMPORT
import { API_KEY, ENDPOINT } from "./config.js";

window.addEventListener("DOMContentLoaded", () => {
  get();
});

// GETTING INFO FROM FORM
function getFormValues() {
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const isGood = document.getElementById("isGood").checked;
  const year = document.getElementById("year").value;
  const country = document.getElementById("country").value;
  const region = document.getElementById("region").value;
  const grapes = document.getElementById("grapes").value;

  return {
    name,
    type,
    isGood,
    year,
    origin: {
      country,
      region,
    },
    grapes: grapes.split(",").map((grape) => grape.trim()),
  };
}

// ADD AN EVENT LISTENER FOR FORM SUBMISSION
document
  .getElementById("wine-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const newWine = getFormValues();
    post(newWine);

    // Clear the form
    event.target.reset();
  });

// GET
export function get() {
  console.log("Fetching updated wine data...");
  fetch(ENDPOINT, {
    method: "get",
    headers: {
      apikey: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const template = document.querySelector("template").content;
      document.querySelector("main").innerHTML = "";

      data.forEach((wine) => {
        const copy = template.cloneNode(true);
        copy.querySelector("h2").textContent = wine.name;

        // Attach delete event listener
        copy.querySelector("button.delete").addEventListener("click", () => {
          deleteWine(wine.id);
        });

        // Attach update event listener
        copy.querySelector("button.update").addEventListener("click", () => {
          patch(wine.id);
        });

        document.querySelector("main").appendChild(copy);
      });
    });
}

// MODIFY THE POST FUNCTION TO ACCEPT THE WINE OBJECT AS AN ARGUMENT
export function post(newWine) {
  fetch(ENDPOINT, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
    body: JSON.stringify(newWine),
  })
    .then((response) => response.json())
    .then(() => get());
}

// DELETE
export function deleteWine(id) {
  fetch(`${ENDPOINT}?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error deleting wine");
      }
      return response.json();
    })
    .then(() => {
      console.log("Wine deleted");
      get(); // Update UI after successful deletion
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// PATCH
export function patch(id) {
  const updates = {
    name: "GWine",
  };

  fetch(`${ENDPOINT}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify(updates),
  })
    .then((response) => response.json())
    .then(() => {
      console.log("Wine data patched, updating UI..."); // Add this line
      get();
    });
}

//COUNRIES API
async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  return countries;
}

function populateCountries(countries) {
  const countryList = document.getElementById("countries");
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name.common;
    countryList.appendChild(option);
  });
}

fetchCountries().then(populateCountries);
