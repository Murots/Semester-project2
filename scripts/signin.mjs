import { signInURL } from "./constants.mjs";
import { errorFeedback } from "./components/errorFeedback.mjs";

const signInForm = document.getElementById("form-sign-in");

/**
 * API call that let the user sign in
 * @param {string} url
 * @param {any} userData
 * @example
 * ```js
 * loginUser(loginURL, userToLogin);
 * ```
 */
async function signInUser(url, userData) {
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
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);

    const username = json.name;
    localStorage.setItem("username", username);

    if (json.errors) {
      errorFeedback(json.errors, signInForm);
    } else {
      document.querySelector("#sign-in-modal .btn-close").click();
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves login data from the form and initiates the login process.
 * @param {event} event
 * @returns {void}
 */
function getSignInData(event) {
  event.preventDefault();
  const email = document.getElementById("sign-inEmail").value;
  const password = document.getElementById("sign-inPassword").value;

  const userToSignIn = {
    email,
    password,
  };

  const existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }

  signInUser(signInURL, userToSignIn);
}

signInForm.addEventListener("submit", getSignInData);
