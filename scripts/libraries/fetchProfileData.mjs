import { fetchWithToken } from "../services/doFetch.mjs";

/**
 * Fetches the user's profile avatar and credits using the provided URL and creates html.
 * @param {string} url
 * @param {HTMLElement} navProfile
 * @returns {void}
 */
export async function fetchProfileData(url, navProfile) {
  try {
    const profile = await fetchWithToken(url);
    const profileAvatarLink = profile.avatar;
    const profileCredits = profile.credits;
    const profileUser = profile.name;

    const profileAvatar = document.createElement("img");
    profileAvatar.id = "profile-avatar";
    profileAvatar.className = "rounded-circle";
    profileAvatar.alt = "Profile avatar";
    profileAvatar.src = profileAvatarLink;

    const profileName = document.createElement("a");
    profileName.id = "nav-name";
    profileName.className = "nav-link h4 ps-2 my-2 my-md-0";
    profileName.innerText = profileUser;
    profileName.ariaCurrent = "page";

    const currentUrl = window.location.href;
    if (currentUrl.includes("/profile/")) {
      profileName.href = "#";
    } else if (currentUrl.includes("/auctions/") || currentUrl.includes("/new-listing/") || currentUrl.includes("/listing-details/")) {
      profileName.href = `../profile/index.html?id=${profileUser}`;
    } else {
      profileName.href = `profile/index.html?id=${profileUser}`;
    }

    const creditCount = document.createElement("h4");
    creditCount.className = "h4 py-1 px-2 ms-5 my-2 my-md-0 bg-primary text-white";
    creditCount.innerText = profileCredits + " CR";

    navProfile.prepend(profileAvatar, profileName, creditCount);
  } catch (error) {
    console.error("Error fetching profile data", error);
  }
}
