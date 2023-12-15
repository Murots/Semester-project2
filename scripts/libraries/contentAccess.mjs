import { userProfileURL } from "./constants.mjs";
import { fetchAvatar } from "./fetchAvatar.mjs";

function handleContentAccess() {
  if (localStorage.getItem("accessToken")) {
    const username = localStorage.getItem("username");
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

    const profileAvatar = document.createElement("img");
    profileAvatar.id = "profile-avatar";
    profileAvatar.className = "rounded-circle";
    profileAvatar.alt = "Profile avatar";
    navProfile.append(profileAvatar);

    fetchAvatar(userProfileURL, profileAvatar);

    const navName = document.createElement("a");
    navName.id = "nav-name";
    navName.className = "nav-link h4 ps-2 my-2 my-md-0";
    navName.innerText = username;
    navName.ariaCurrent = "page";
    navProfile.append(navName);

    const creditCount = document.createElement("h4");
    creditCount.className = "h4 py-1 px-2 ms-5 my-2 my-md-0 bg-primary text-white";
    creditCount.innerText = "XXXX €";
    navProfile.append(creditCount);

    const currentUrl = window.location.href;
    if (currentUrl.includes("/profile/")) {
      navName.href = "#";

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
    } else if (currentUrl.includes("/auctions/") || currentUrl.includes("/new-listing/") || currentUrl.includes("/listing-details/")) {
      navName.href = `../profile/index.html?id=${username}`;
    } else {
      navName.href = `profile/index.html?id=${username}`;
    }
  }
}

handleContentAccess();
