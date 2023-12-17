import { userProfileURL } from "../libraries/constants.mjs";
import { fetchWithToken } from "../services/doFetch.mjs";

const fistButton = document.getElementById("fist-button");

/**
 * When clicked, the button fetches the new avatar URL from an input field and sends a PUT request to update the user's avatar.
 * @param {string} userProfileURL
 * @param {function} fetchWithToken
 * @returns {void}
 * @example
 * // Display an error message in a form
 * const input = document.getElementById("myInput");
 * const avatar = input.value;
 * await fetchWithToken(userProfileURL, "PUT", avatar);
 */
fistButton.addEventListener("click", async (event) => {
  const newAvatarInput = document.getElementById("new-avatar-input");
  const updateAvatarURL = userProfileURL + "/media";
  try {
    event.preventDefault();
    const avatar = newAvatarInput.value;

    const dataToPost = {
      avatar,
    };

    await fetchWithToken(updateAvatarURL, "PUT", dataToPost);
    location.reload();
  } catch (error) {
    console.error(error);
  }
});
