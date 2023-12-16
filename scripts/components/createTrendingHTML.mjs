/**
 * Creates the HTML for displaying trending listings.
 * @param {object} listing
 * @param {HTMLElement} trendingContainer
 * @returns {void}
 */
export function createTrendingHTML(listingData, trendingContainer) {
  try {
    const listingID = listingData.id;
    const listingCover = listingData.media[0];
    const listingTitle = listingData.title;
    const descriptionArray = JSON.parse(listingData.description);
    const listingArtist = descriptionArray[0];

    const trendingDiv = document.createElement("div");
    trendingDiv.className = "col-12 col-sm-6 col-lg-3 d-flex justify-content-center";
    trendingContainer.append(trendingDiv);

    const centerDiv = document.createElement("div");
    centerDiv.className = "col text-center";
    trendingDiv.append(centerDiv);

    let imageDiv;
    imageDiv = document.createElement("a");
    if (localStorage.getItem("accessToken")) {
      imageDiv.href = `listing-details/index.html?id=${listingID}`;
    } else {
      imageDiv.href = "#";
      imageDiv.setAttribute("data-bs-toggle", "modal");
      imageDiv.setAttribute("data-bs-target", "#sign-in-modal");
    }
    centerDiv.append(imageDiv);

    const trendingImage = document.createElement("img");
    trendingImage.src = listingCover;
    trendingImage.alt = "Trending album";
    trendingImage.className = "img-fluid rounded-circle";
    trendingImage.id = "trending-album";
    imageDiv.append(trendingImage);

    const trendingTitle = document.createElement("h5");
    trendingTitle.className = "fw-bold mt-3 mb-1";
    trendingTitle.innerText = listingTitle;
    centerDiv.append(trendingTitle);

    const trendingArtist = document.createElement("p");
    trendingArtist.innerText = listingArtist;
    centerDiv.append(trendingArtist);
  } catch (error) {
    console.error(error);
    spinner.remove();
    trendingContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
  }
}
