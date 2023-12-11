import { filteredListingsURL } from "./libraries/constants.mjs";
import { fetchWithToken } from "./services/doFetch.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { createListingHTML } from "./libraries/createListing.mjs";

const listingsContainer = document.getElementById("listings-container");
const spinner = document.getElementById("spinner-div");
const loadMoreButton = document.getElementById("loadMore-button");

loadMoreButton.addEventListener("click", loadMoreListings);

let currentPage = 1;
const perPage = 9;

/**
 * Retrieves listings with authentication token based on the unique tag.
 * Dynamically constructs the URL based on current page and perPage.
 * @returns {Promise<array>}
 */
async function getListings() {
  const offset = (currentPage - 1) * perPage;
  const url = `${filteredListingsURL}&limit=${perPage}&offset=${offset}`;

  try {
    const response = await fetchWithToken(url);
    return response;
  } catch (error) {
    console.error(error);
    spinner.remove();
    listingsContainer.innerText = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * Creates single objects from an array
 * @param {object} listings
 * @returns {void}
 */
function createListings(listings) {
  listings.forEach((listing) => {
    createListingHTML(listing);
  });
}

/**
 * Loads more listings and updates the page.
 */
async function loadMoreListings() {
  try {
    currentPage++;
    const newlistings = await getListings();
    createListings(newlistings);

    if (newlistings.length < perPage) {
      loadMoreButton.disabled = true;
    }
  } catch (error) {
    console.error(error);
    listingsContainer.innerText = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * Initial function to fetch and display listings.
 * @returns {void}
 */
async function main() {
  try {
    const initialListings = await getListings();
    createListings(initialListings);
    spinner.remove();
  } catch (error) {
    console.error(error);
    spinner.remove();
    listingsContainer.innerText = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
