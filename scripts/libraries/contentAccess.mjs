import { userProfileURL } from "./constants.mjs";
import { fetchProfileData } from "./fetchProfileData.mjs";

/**
 * Controls content accessibility for users based on their authentication status.
 * It modifies the navigation bar by hiding the sign-in button, showing the new listing link,
 * creating a user profile section, and adding a log-out option on the profile page.
 * @example
 * // To handle content access based on user authentication status
 * handleContentAccess();
 */
function handleContentAccess() {
  if (localStorage.getItem("accessToken")) {
    const navBar = document.getElementById("navbarCollapse");
    const signInButton = document.getElementById("sign-in-button");
    const navNewListing = document.getElementById("nav-new");

    signInButton.style.display = "none";

    if (navNewListing) {
      navNewListing.classList.remove("d-none");
      navNewListing.classList.add("d-flex");
    }

    const navProfile = document.createElement("div");
    navProfile.id = "nav-profile";
    navProfile.className = "d-flex align-items-center my-2 my-md-0";
    navBar.append(navProfile);

    createProfileContent(userProfileURL, navProfile);

    const currentUrl = window.location.href;
    if (currentUrl.includes("/profile/")) {
      const navLogOut = document.createElement("a");
      navLogOut.className = "nav-link h4 ms-5 my-2 my-md-0";
      navLogOut.innerText = "Log out";
      navLogOut.ariaCurrent = "page";
      navLogOut.href = "../../index.html";
      navProfile.append(navLogOut);

      navLogOut.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = navLogOut.href;
      });
    }
  }
}

handleContentAccess();

/**
 * Creates and appends/prepends profile content elements to a navigation profile container(s) in the Auction list.
 * @param {string} url
 * @param {HTMLElement} navProfile}
 */
async function createProfileContent(url, navProfile) {
  try {
    const profile = await fetchProfileData(url);

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
      profileName.href = `./html/profile/index.html?id=${profileUser}`;
    }

    const creditCount = document.createElement("h4");
    creditCount.className = "h4 py-1 px-2 ms-5 my-2 my-md-0 bg-primary text-white";
    creditCount.innerText = profileCredits + " CR";

    navProfile.prepend(profileAvatar, profileName, creditCount);
  } catch (error) {
    console.error("Error in createProfileContent:", error);
  }
}
