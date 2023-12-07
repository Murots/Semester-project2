import { fetchWithToken } from "../services/doFetch.mjs";

/**
 * Fetches the user's profile avatar using the provided URL and creates a profile image.
 * @param {string} url
 * @param {HTMLElement} profileAvatarElement
 * @returns {void}
 */
export async function fetchAvatar(url, profileAvatarElement) {
  try {
    const profile = await fetchWithToken(url);
    const profileAvatarLink = profile.avatar;
    if (profileAvatarLink) {
      profileAvatarElement.src = profileAvatarLink;
    }
  } catch (error) {
    console.error("Error fetching avatar", error);
  }
}
