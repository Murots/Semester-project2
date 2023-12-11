const user = localStorage.getItem("username");

const apiBaseURL = "https://api.noroff.dev/api/v1";

const endpointRegisterURL = "/auction/auth/register";
const endpointSignInURL = "/auction/auth/login";
const endpointListingsURL = "/auction/listings";
const endpointProfilesURL = "/auction/profiles";

export const registerURL = apiBaseURL + endpointRegisterURL;
export const signInURL = apiBaseURL + endpointSignInURL;
export const ListingsURL = apiBaseURL + endpointListingsURL;
export const profilesURL = apiBaseURL + endpointProfilesURL;
export const userProfileURL = apiBaseURL + endpointProfilesURL + "/" + user;
export const filteredListingsURL = apiBaseURL + endpointListingsURL + "?_tag=OldSchoolAuctions";
