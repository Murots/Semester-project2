// import { postListingURL } from "./libraries/constants.mjs";
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
  const allMedia = {};

  cards.forEach((card, index) => {
    allMedia[`link${index}`] = card.getAttribute("data-image-link");
  });

  const dataToList = {
    title: titleInput.value,
    description: JSON.stringify(descriptionObject),
    endsAt: `${deadlineDate}T${deadlineTime}:00.000Z`,
    tags: ["OldSchoolAuctions", genre],
    media: JSON.stringify(allMedia),
  };

  // savePost(allPostsByTitle, dataToPost);
  console.log(dataToList);
}

newListingForm.addEventListener("submit", createListingData);

// /**
//  * Saves a post to the server.
//  * @param {string} url
//  * @param {object} postData
//  * @returns {void}
//  * @example
//  * const url = "https://example.com/api/posts";
//  * const postData = { title: "My Post", body: "This is my post content", tags: ["tag1"] };
//  * savePost(url, postData);
//  */
// async function savePost(url, postData) {
//   try {
//     const json = await fetchWithToken(url, "POST", postData);
//     if (json) {
//       location.reload();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
