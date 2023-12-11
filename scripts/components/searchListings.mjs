import { createListingHTML } from "../libraries/createListing.mjs";

/**
 * Filters the provided listings based on the search query and displays them.
 * @param {string} searchQuery
 * @param {Object} listings
 * @example
 * searchListings('Art', allListingsArray);
 */
export function searchListings(searchQuery, listings) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";

  listings.forEach((listing) => {
    const listingDescription = listing.description.toLowerCase();
    const listingTitle = listing.title.toLowerCase();
    const listingGenre = listing.tags[1].toLowerCase();

    if (searchQuery === "" || listingDescription.includes(searchQuery) || listingTitle.includes(searchQuery) || listingGenre.includes(searchQuery)) {
      createListingHTML(listing);
    }
  });
}

/**
 * Creates a search tag and appends it to the listings container. Includes a close button to clear the search.
 * @param {string} query
 * @param {HTMLElement} listingsContainer
 * @example
 * createSearchTag('Vintage Art', document.getElementById('listings-container'));
 */
export function createSearchTag(query, listingsContainer) {
  const existingTag = document.getElementById("search-tag");
  if (existingTag) {
    existingTag.remove();
  }

  const tagRow = document.createElement("div");
  tagRow.className = "row mx-0 mx-lg-auto pb-3 d-flex justify-content-center";
  listingsContainer.prepend(tagRow);

  const tagCol = document.createElement("div");
  tagCol.className = "col-auto fs-5";
  tagRow.append(tagCol);

  const spanTag = document.createElement("div");
  spanTag.classList.add("badge", "bg-success");
  spanTag.innerText = `Search: ${query}`;
  tagCol.prepend(spanTag);

  const closeButton = document.createElement("span");
  closeButton.textContent = " ×";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => clearSearch();
  spanTag.append(closeButton);
}

/**
 * Reloads the page when when clicking "x" on tag.
 */
function clearSearch() {
  window.location.reload();
}
