import { fetchWithToken } from "../services/doFetch.mjs";

/**
 * Fetches the user's profile avatar and credits using the provided URL and creates html.
 * @param {string} url
 * @returns {void}
 */
export async function fetchProfileData(url) {
  try {
    const profile = await fetchWithToken(url);
    return profile;
  } catch (error) {
    console.error("Error fetching profile data", error);
  }
}
