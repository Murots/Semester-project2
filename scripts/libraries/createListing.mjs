/**
 * Creates and appends HTML elements to display a listing(s) in the Auction list.
 * @param {any} listing
 * @returns {void}
 */
export function createListingHTML(listingData) {
  try {
    const listingsContainer = document.getElementById("listings-container");
    const listingCover = listingData.media[0];
    const listingTitle = listingData.title;
    const descriptionArray = JSON.parse(listingData.description);
    const listingArtist = descriptionArray[0];
    const bidsCount = listingData._count.bids;

    const listingDeadline = listingData.endsAt;
    const deadline = new Date(listingDeadline);
    const formattedDeadline = deadline.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    const cardColumn = document.createElement("div");
    cardColumn.className = "col-12 col-sm-6 col-lg-4 mb-4";
    listingsContainer.append(cardColumn);

    const card = document.createElement("div");
    card.className = "card auction-card position-relative";
    card.style.backgroundImage = `url('${listingCover}')`;
    cardColumn.append(card);

    const overlay = document.createElement("div");
    overlay.className = "overlay p-3 position-absolute";
    card.append(overlay);

    const cardTitle = document.createElement("h5");
    cardTitle.className = "fw-bold text-white mb-0";
    cardTitle.innerText = listingTitle;
    overlay.append(cardTitle);

    const cardArtist = document.createElement("h5");
    cardArtist.className = "text-white fs-6 mb-3";
    cardArtist.innerText = listingArtist;
    overlay.append(cardArtist);

    const bidRow = document.createElement("div");
    bidRow.className = "row";
    overlay.append(bidRow);

    const bidTextColumn = document.createElement("div");
    bidTextColumn.className = "col-6";
    bidRow.append(bidTextColumn);

    const bidText = document.createElement("p");
    bidText.className = "text-info fw-bold mb-0";
    bidText.innerText = "Current bid:";
    bidTextColumn.append(bidText);

    const bidPriceColumn = document.createElement("div");
    bidPriceColumn.className = "col-6 text-end";
    bidRow.append(bidPriceColumn);

    const bidPrice = document.createElement("p");
    bidPrice.className = "text-info fw-bold mb-0";
    bidPrice.innerText = bidsCount;
    bidPriceColumn.append(bidPrice);

    const deadlineRow = document.createElement("div");
    deadlineRow.className = "row";
    overlay.append(deadlineRow);

    const deadlineTextColumn = document.createElement("div");
    deadlineTextColumn.className = "col-6";
    deadlineRow.append(deadlineTextColumn);

    const deadlineText = document.createElement("p");
    deadlineText.className = "mb-0 text-white";
    deadlineText.innerText = "Deadline:";
    deadlineTextColumn.append(deadlineText);

    const deadlineTimeColumn = document.createElement("div");
    deadlineTimeColumn.className = "col-6 text-end";
    deadlineRow.append(deadlineTimeColumn);

    const deadlineTime = document.createElement("p");
    deadlineTime.className = "mb-0 text-white";
    deadlineTime.innerText = formattedDeadline;
    deadlineTimeColumn.append(deadlineTime);
  } catch (error) {
    console.error(error);
  }
}
