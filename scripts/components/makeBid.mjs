import { listingsURL } from "../libraries/constants.mjs";
import { fetchWithToken } from "../services/doFetch.mjs";
import { errorFeedback } from "../libraries/errorFeedback.mjs";

/**
 * Saves bid to the server.
 * @param {string} url
 * @param {object} bidData
 * @param {element} bidForm
 * @returns {void}
 * @example
 * const url = "https://example.com/api/auction/listings/<id>/bids";
 * const bidData = {"amount": 10};
 * makeBid(url, bidData);
 */
async function makeBid(url, bidData, bidForm) {
  try {
    const json = await fetchWithToken(url, "POST", bidData);

    if (json.errors) {
      errorFeedback(json.errors, bidForm);
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Constructs the bid URL, parses the bid value, and calls "makeBid" to submit the bid.
 * @param {Event} event
 * @param {string} listingID
 * @param {string} bidValue
 * @param {HTMLElement} bidForm
 * @example
 * bidForm.addEventListener('submit', event =>
 *   getBidValue(event, '123456', document.getElementById("bid-input").value, bidForm));
 */
export function getBidValue(event, listingID, bidValue, bidForm) {
  event.preventDefault();

  const makeBidURL = listingsURL + "/" + listingID + "/bids";
  const amount = parseFloat(bidValue);
  console.log(amount);

  const bidToMake = {
    amount,
  };

  console.log(bidToMake);
  makeBid(makeBidURL, bidToMake, bidForm);
}
