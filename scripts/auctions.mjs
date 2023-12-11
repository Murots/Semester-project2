import { filteredListingsURL } from "./libraries/constants.mjs";
import { fetchWithToken } from "./services/doFetch.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { createListingHTML } from "./libraries/createListing.mjs";
import { searchListings, createSearchTag } from "./components/searchListings.mjs";

const listingsContainer = document.getElementById("listings-container");
const spinner = document.getElementById("spinner-div");
const loadMoreButton = document.getElementById("loadMore-button");

const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
let currentSearchQuery = "";
searchButton.disabled = true;

searchField.addEventListener("input", () => {
  currentSearchQuery = searchField.value.toLowerCase();
  searchButton.disabled = currentSearchQuery.length === 0;
});

searchButton.addEventListener("click", async () => {
  currentSearchQuery = searchField.value.toLowerCase();
  const allListings = await getListings();
  searchListings(currentSearchQuery, allListings);

  if (currentSearchQuery) {
    loadMoreButton.disabled = true;
    createSearchTag(currentSearchQuery, listingsContainer);
  }
});

let currentPage = 1;
const perPage = 9;

/**
 * Retrieves listings with authentication token based on the unique tag.
 * Dynamically constructs the URL based on current page and perPage.
 * Use different URL to fetch all listings if searching.
 * @returns {Promise<array>}
 * @example
 * getListings().then(listings => {
 *   console.log(listings); // Array of listings
 * });
 */
async function getListings() {
  let url;
  if (currentSearchQuery) {
    url = filteredListingsURL;
  } else {
    const offset = (currentPage - 1) * perPage;
    url = `${filteredListingsURL}&limit=${perPage}&offset=${offset}`;
  }

  try {
    const json = await fetchWithToken(url);
    return json;
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
 * @example
 * createListings([{ title: "Listing 1", ... }, { title: "Listing 2", ... }]);
 */
function createListings(listings) {
  listings.forEach((listing) => {
    createListingHTML(listing);
  });
}

/**
 * Function to load more listings when the 'Load More' button is clicked.
 * Handles pagination and updates the page with new listings.
 */
async function loadMoreListings() {
  try {
    if (currentSearchQuery) {
      return;
    }
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

loadMoreButton.addEventListener("click", loadMoreListings);

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
