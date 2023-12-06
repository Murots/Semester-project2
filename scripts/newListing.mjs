import { fetchWithToken } from "./services/doFetch.mjs";
import { postListingURL } from "./libraries/constants.mjs";
import { addImageCard } from "./components/createItemAlbum.mjs";

const newListingForm = document.getElementById("form-new-listing");
const addImageButton = document.getElementById("add-image-button");

addImageButton.addEventListener("click", addImageCard);

/**
 * Creates listing data and saves it to the server.
 * @param {Event} event
 * @returns {void}
 */
function createListingData(event) {
  event.preventDefault();

  const titleInput = document.getElementById("inputTitle");
  const artistInput = document.getElementById("inputArtist");
  const releaseInput = document.getElementById("inputRelease");
  const labelInput = document.getElementById("inputLabel");
  const conditionInput = document.getElementById("inputCondition");
  const tracklistAInput = document.getElementById("inputTracklistA");
  const tracklistBInput = document.getElementById("inputTracklistB");

  const descriptionObject = {
    artist: artistInput.value,
    releaseYear: releaseInput.value,
    recordLabel: labelInput.value,
    condition: conditionInput.value,
    tracklistA: tracklistAInput.value,
    tracklistB: tracklistBInput.value,
  };

  const deadlineDateInput = document.getElementById("inputDeadlineDate");
  const deadlineTimeInput = document.getElementById("inputDeadlineTime");
  const deadlineDate = deadlineDateInput.value;
  const deadlineTime = deadlineTimeInput.value;

  const selectedGenre = document.getElementById("selectGenre");
  const genre = selectedGenre.value;

  const cards = document.querySelectorAll("#imageCardGroup .card");
  const media = [];

  cards.forEach((card) => {
    const linkToImage = card.getAttribute("data-image-link");
    media.push(linkToImage);
  });

  const dataToList = {
    title: titleInput.value,
    description: JSON.stringify(descriptionObject),
    endsAt: `${deadlineDate}T${deadlineTime}:00.000Z`,
    tags: ["OldSchoolAuctions", genre],
    media,
  };

  saveListing(postListingURL, dataToList);
}

newListingForm.addEventListener("submit", createListingData);

/**
 * Saves a listing to the server.
 * @param {string} url
 * @param {object} listingData
 * @returns {void}
 * @example
 * const url = "https://example.com/api/listings";
 * const listingData = { title: "Example title", description: "This is the description of my LP album", endsAt: "2023-12-04T13:01:55.422Z", tags: ["tag1", "tag2"] }, media: "Link to image";
 * saveListing(url, listingData);
 */
async function saveListing(url, listingData) {
  try {
    const json = await fetchWithToken(url, "POST", listingData);
    if (json) {
      // location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}
