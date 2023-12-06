import { registerURL } from "./libraries/constants.mjs";
import { errorFeedback } from "./libraries/errorFeedback.mjs";

const registerForm = document.getElementById("form-register");

/**
 * API call that registers the user
 * @param {string} url
 * @param {any} userData
 * @example
 * ```js
 * registerUser(registerURL, user);
 * ```
 */
async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);

    if (json.errors) {
      errorFeedback(json.errors, registerForm);
    } else {
      const successMessage = document.createElement("p");
      successMessage.classList.add("success", "p-1", "m-3");
      successMessage.textContent = "Congratulations on your new account. Click ";

      const signInLink = document.createElement("a");
      signInLink.setAttribute("data-bs-toggle", "modal");
      signInLink.setAttribute("data-bs-target", "#sign-in-modal");
      signInLink.textContent = "HERE";
      signInLink.className = "here-link";
      successMessage.append(signInLink);

      successMessage.append(" to sign in.");
      registerForm.append(successMessage);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves registration data from the form and initiates the registration process.
 * @param {event} event
 * @returns {void}
 */
function getRegistrationData(event) {
  event.preventDefault();
  const name = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const userToRegister = {
    name,
    email,
    password,
  };

  const existingFeedback = document.querySelector(".error, .success");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  registerUser(registerURL, userToRegister);
}

registerForm.addEventListener("submit", getRegistrationData);
