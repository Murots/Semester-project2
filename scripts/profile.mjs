import { userProfileURL } from "./libraries/constants.mjs";
import { createYourBidsList } from "./components/createYourBidsList.mjs";
import { createListingHTML } from "./libraries/createListing.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { fetchWithToken } from "./services/doFetch.mjs";

const yourContentContainer = document.getElementById("your-content-container");

const spinner = document.getElementById("spinner-div");
const yourListings = document.getElementById("your-listings");
const yourBids = document.getElementById("your-bids");

let yourContentURL = userProfileURL + "/listings?_tag=OldSchoolAuctions&_bids=true";

yourListings.addEventListener("click", function () {
  yourContentContainer.innerHTML = "";
  spinner.classList.remove("d-none");
  yourListings.classList.add("active");
  yourBids.classList.remove("active");
  yourContentURL = userProfileURL + "/listings?_tag=OldSchoolAuctions&_bids=true";
  main();
});

yourBids.addEventListener("click", function () {
  yourContentContainer.innerHTML = "";
  spinner.classList.remove("d-none");
  yourBids.classList.add("active");
  yourListings.classList.remove("active");
  yourContentURL = userProfileURL + "/bids?_listings=true&_tag=OldSchoolAuctions=true";
  main();
});

/**
 * Retrieves listings with authentication token based on the unique tag.
 * Use different URL to fetch listings based on active button.
 * @returns {Promise<array>}
 * @example
 * getListings().then(listings => {
 *   console.log(listings); // Array of listings
 * });
 */
async function getProfileContent(url) {
  try {
    const json = await fetchWithToken(url);
    return json;
  } catch (error) {
    console.error(error);
    spinner.remove();
    yourContentContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * Creates single objects from an array
 * @param {object} yourContent
 * @returns {void}
 * @example
 * createListings([{ title: "Listing 1", ... }, { title: "Listing 2", ... }]);
 */
function createListings(yourContent, container) {
  yourContent.forEach((content) => {
    if (content.title) {
      createListingHTML(content, container);
    } else {
      createYourBidsList(content, container);
    }
  });
}

/**
 * Initial function to fetch and display listings.
 * @returns {void}
 */
async function main() {
  try {
    const getContent = await getProfileContent(yourContentURL);
    createListings(getContent, yourContentContainer);
    spinner.classList.add("d-none");
  } catch (error) {
    console.error(error);
    spinner.remove();
    yourContentContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
