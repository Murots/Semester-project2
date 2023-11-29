function handleContentAccess() {
  if (localStorage.getItem("accessToken")) {
    const signInButton = document.getElementById("sign-in-button");
    const navProfile = document.getElementById("nav-profile");
    const navName = document.getElementById("nav-name");
    const navNewListing = document.getElementById("nav-new");

    signInButton.style.display = "none";

    navNewListing.classList.remove("d-none");
    navNewListing.classList.add("d-flex");

    navProfile.classList.remove("d-none");
    navProfile.classList.add("d-flex");
    navName.innerText = localStorage.getItem("username");

    // profileAvatar.className.add("d-flex");
  }
}

handleContentAccess();
