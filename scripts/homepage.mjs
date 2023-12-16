import { filteredListingsURL } from "./libraries/constants.mjs";
import { fetchWithToken } from "./services/doFetch.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { createTrendingHTML } from "./components/createTrendingHTML.mjs";

const listingsWithBids = filteredListingsURL + "&_bids=true";

const trendingContainer = document.getElementById("trending-container");
const spinner = document.getElementById("spinner-div");

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
async function getListings(url) {
  try {
    const json = await fetchWithToken(url);
    return json;
  } catch (error) {
    console.error(error);
    spinner.remove();
    trendingContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * Creates single objects from an array, selecting only the top four listings based on bid count.
 * @param {object} listings
 * @param {HTMLElement} container
 * @returns {void}
 * @example
 * createListings([{ title: "Listing 1", _count: { bids: 5 }, ... }, { title: "Listing 2", _count: { bids: 3 }, ... }], document.getElementById("someContainer"));
 */
function createListings(listings, container) {
  let sortedListings = listings.sort((a, b) => {
    let bidsA = a._count.bids;
    let bidsB = b._count.bids;
    return bidsB - bidsA;
  });

  let topFourListings = sortedListings.slice(0, 4);

  topFourListings.forEach((listing) => {
    createTrendingHTML(listing, container);
  });
}

/**
 * Initial function to fetch and display listings.
 * @returns {void}
 */
async function main() {
  try {
    const listings = await getListings(listingsWithBids);
    createListings(listings, trendingContainer);
    spinner.remove();
  } catch (error) {
    console.error(error);
    spinner.remove();
    trendingContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
