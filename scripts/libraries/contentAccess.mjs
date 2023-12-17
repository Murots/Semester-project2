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

    fetchProfileData(userProfileURL, navProfile);

    const currentUrl = window.location.href;
    if (currentUrl.includes("/profile/")) {
      const navLogOut = document.createElement("a");
      navLogOut.className = "nav-link h4 ms-5 my-2 my-md-0";
      navLogOut.innerText = "Log out";
      navLogOut.ariaCurrent = "page";
      navLogOut.href = "../index.html";
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
