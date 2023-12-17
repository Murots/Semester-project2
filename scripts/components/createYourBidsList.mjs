import { deadlineConverter } from "../libraries/deadlineConverter.mjs";

/**
 * Creates and appends HTML elements to display a list of listing user has made a bidding on.
 * @param {any} listing
 * @returns {void}
 */
export function createYourBidsList(listingData, container) {
  try {
    if (listingData.listing.tags.includes("OldSchoolAuctions")) {
      const listingID = listingData.listing.id;
      const listingCover = listingData.listing.media[0];
      const listingTitle = listingData.listing.title;
      const descriptionArray = JSON.parse(listingData.listing.description);
      const listingArtist = descriptionArray[0];
      const yourBid = listingData.amount;

      const formattedDeadline = deadlineConverter(listingData.listing.endsAt);

      const listItem = document.createElement("a");
      listItem.className = "row mx-0 mx-lg-auto align-items-center bg-light mb-4 py-3 text-decoration-none";
      listItem.id = "your-bids-item";
      listItem.href = `../listing-details/index.html?id=${listingID}`;
      container.append(listItem);

      const infoCol = document.createElement("div");
      infoCol.className = "col-12 col-sm-6";
      listItem.append(infoCol);

      const itemTitle = document.createElement("h5");
      itemTitle.className = "fw-bold";
      itemTitle.innerText = listingTitle;
      infoCol.append(itemTitle);

      const itemArtist = document.createElement("p");
      itemArtist.innerText = listingArtist;
      infoCol.append(itemArtist);

      const itemBid = document.createElement("p");
      itemBid.innerText = `Your bid: ${yourBid} CR`;
      infoCol.append(itemBid);

      const itemDeadline = document.createElement("p");
      itemDeadline.innerText = `Deadline: ${formattedDeadline}`;
      infoCol.append(itemDeadline);

      const imgCol = document.createElement("div");
      imgCol.className = "col-12 col-sm-6 text-center text-sm-end";
      listItem.append(imgCol);

      const itemImage = document.createElement("img");
      itemImage.src = listingCover;
      imgCol.append(itemImage);
    }
  } catch (error) {
    console.error(error);
  }
}
