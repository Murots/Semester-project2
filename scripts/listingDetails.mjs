import { fetchWithToken } from "./services/doFetch.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { listingsURL } from "./libraries/constants.mjs";
import { createDetailsContent } from "./components/createDetailsContent.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

const ListingWithSellerAndBidsURL = listingsURL + "/" + listingId + "?_seller=true&_bids=true";

const bidHistoryModal = document.getElementById("bid-history");
const detailsContainer = document.getElementById("details-container");
const spinner = document.getElementById("spinner-div");

/**
 * Retrieves listing data from the server.
 * @param {string} url
 * @returns {Promise<object>}
 */
async function getListingWithToken(url) {
  try {
    const json = await fetchWithToken(url);
    return json;
  } catch (error) {
    console.error(error);
    spinner.remove();
    detailsContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * The main function to fetch post data, initiates process of creating post HTML and details content.
 * @returns {void}
 */
async function main() {
  try {
    const listingData = await getListingWithToken(ListingWithSellerAndBidsURL);
    createDetailsContent(listingData, detailsContainer, bidHistoryModal);
    spinner.remove();
  } catch (error) {
    console.error(error);
    spinner.remove();
    detailsContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();
