import { deadlineConverter } from "../libraries/deadlineConverter.mjs";

/**
 * Creates the HTML for displaying listing details.
 * @param {object} listing
 * @param {HTMLElement} detailsContainer
 * @param {HTMLElement} bidsHistoryModal
 * @returns {void}
 */
export function createDetailsContent(listing, detailsContainer, bidHistoryModal) {
  try {
    const carouselRow = document.getElementById("carousel-row");
    const carouselInner = document.getElementById("carousel-inner");
    const modalOlElement = bidHistoryModal.querySelector("ol");
    modalOlElement.innerHTML = "";

    if (listing) {
      carouselRow.classList.remove("d-none");
      carouselRow.classList.add("d-flex");
    }

    const title = listing.title;
    document.title = `OLD SCHOOL AUCTIONS | ${title}`;

    const descriptionArray = JSON.parse(listing.description);
    const artist = descriptionArray[0];
    const releaseYear = descriptionArray[1];
    const recordLabel = descriptionArray[2];
    const condition = descriptionArray[3];
    const sideATracks = descriptionArray[4].split("\n");
    const sideBTracks = descriptionArray[5].split("\n");

    const genre = listing.tags[1];
    const formattedDeadline = deadlineConverter(listing.endsAt);
    const seller = listing.seller.name;
    const sellerAvatar = listing.seller.avatar;
    const mediaLinks = listing.media;

    mediaLinks.forEach((link, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      if (index === 0) {
        carouselItem.classList.add("active");
      }

      carouselInner.append(carouselItem);

      const img = document.createElement("img");
      img.className = "d-block w-100 details-image";
      img.src = link;
      img.alt = `Image ${index + 1}`;
      carouselItem.append(img);
    });

    const bids = listing.bids;
    let latestBidAmount = "No Bids";

    if (bids.length > 0) {
      const latestBid = bids[bids.length - 1];
      const amount = latestBid.amount;
      latestBidAmount = `${amount} CR`;
    }

    bids.forEach((bid) => {
      const bidList = document.createElement("li");
      const bidMade = deadlineConverter(bid.created);
      bidList.className = "mb-3";
      bidList.innerText = `Bid: ${bid.amount} CR by ${bid.bidderName} on ${bidMade}`;
      modalOlElement.appendChild(bidList);
    });

    const bidContentColumn = document.createElement("div");
    bidContentColumn.className = "col-12 col-md-6 d-flex flex-column ps-md-4";
    carouselRow.append(bidContentColumn);

    const flexContainer = document.createElement("div");
    flexContainer.className = "d-flex flex-column flex-grow-1 justify-content-center";
    bidContentColumn.append(flexContainer);

    const titleRow = document.createElement("div");
    titleRow.className = "row";
    flexContainer.append(titleRow);

    const titleCol = document.createElement("div");
    titleCol.className = "col";
    titleRow.append(titleCol);

    const titleHeading = document.createElement("h5");
    titleHeading.className = "fs-3 fw-bold mb-0 mt-5 mt-md-0";
    titleHeading.innerText = title;
    titleCol.append(titleHeading);

    const artistRow = document.createElement("div");
    artistRow.className = "row mb-4";
    flexContainer.append(artistRow);

    const artistCol = document.createElement("div");
    artistCol.className = "col";
    artistRow.append(artistCol);

    const artistHeading = document.createElement("h5");
    artistHeading.className = "fs-4";
    artistHeading.innerText = artist;
    artistCol.append(artistHeading);

    const currentBidRow = document.createElement("div");
    currentBidRow.className = "row mb-2";
    flexContainer.append(currentBidRow);

    const currentBidColLeft = document.createElement("div");
    currentBidColLeft.className = "col-7 pe-0";
    currentBidRow.append(currentBidColLeft);

    const currentBidHeading = document.createElement("h5");
    currentBidHeading.className = "fs-5 fw-bold text-primary m-0";
    currentBidHeading.innerText = "Current bid:";
    currentBidColLeft.append(currentBidHeading);

    const currentBidColRight = document.createElement("div");
    currentBidColRight.className = "col-5 text-end";
    currentBidRow.append(currentBidColRight);

    const currentBidPrice = document.createElement("h5");
    currentBidPrice.className = "fs-5 fw-bold text-primary m-0";
    currentBidPrice.innerText = latestBidAmount;
    currentBidColRight.append(currentBidPrice);

    const deadlineRow = document.createElement("div");
    deadlineRow.className = "row";
    flexContainer.append(deadlineRow);

    const deadlineColLeft = document.createElement("div");
    deadlineColLeft.className = "col-5 pe-0";
    deadlineRow.append(deadlineColLeft);

    const deadlineHeading = document.createElement("h5");
    deadlineHeading.className = "fs-5";
    deadlineHeading.innerText = "deadline:";
    deadlineColLeft.append(deadlineHeading);

    const deadlineColRight = document.createElement("div");
    deadlineColRight.className = "col-7 text-end";
    deadlineRow.append(deadlineColRight);

    const deadlineDate = document.createElement("h5");
    deadlineDate.className = "fs-5";
    deadlineDate.innerText = formattedDeadline;
    deadlineColRight.append(deadlineDate);

    const sellerRow = document.createElement("div");
    sellerRow.className = "row";
    flexContainer.append(sellerRow);

    const sellerColLeft = document.createElement("div");
    sellerColLeft.className = "col-4 pe-0";
    sellerRow.append(sellerColLeft);

    const sellerHeading = document.createElement("h5");
    sellerHeading.className = "fs-5";
    sellerHeading.innerText = "Seller:";
    sellerColLeft.append(sellerHeading);

    const sellerColRight = document.createElement("div");
    sellerColRight.className = "col-8";
    sellerRow.append(sellerColRight);

    const sellerProfile = document.createElement("div");
    sellerProfile.className = "d-flex align-items-center justify-content-end";
    sellerColRight.append(sellerProfile);

    const sellerProfileAvatar = document.createElement("img");
    sellerProfileAvatar.className = "rounded-circle seller-profile me-2";
    sellerProfileAvatar.alt = "Seller avatar";
    sellerProfileAvatar.src = sellerAvatar;
    sellerProfile.append(sellerProfileAvatar);

    const sellerName = document.createElement("h5");
    sellerName.className = "fs-5 my-0";
    sellerName.innerText = seller;
    sellerProfile.append(sellerName);

    const bidSectionContainer = document.createElement("div");
    bidSectionContainer.className = "mt-auto";
    bidContentColumn.append(bidSectionContainer);

    const bidRow = document.createElement("div");
    bidRow.className = "row mt-4 mt-md-0";
    bidSectionContainer.append(bidRow);

    const bidColLeft = document.createElement("div");
    bidColLeft.className = "col-6 d-flex align-items-center pe-0";
    bidRow.append(bidColLeft);

    const bidHeading = document.createElement("h5");
    bidHeading.className = "fs-3 fw-bold m-0";
    bidHeading.innerText = "Place bid:";
    bidColLeft.append(bidHeading);

    const bidColRight = document.createElement("div");
    bidColRight.className = "col-6 d-flex align-items-center justify-content-end";
    bidRow.append(bidColRight);

    const bidInput = document.createElement("input");
    bidInput.type = "text";
    bidInput.className = "form-control form-control-sm py-0";
    bidColRight.append(bidInput);

    const bidCurrency = document.createElement("h5");
    bidCurrency.className = "fs-3 fw-bold ms-2 mb-0";
    bidCurrency.innerText = "€";
    bidColRight.append(bidCurrency);

    const submitButtonRow = document.createElement("div");
    submitButtonRow.className = "row px-2 mt-3";
    bidSectionContainer.append(submitButtonRow);

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.className = "btn btn-primary h4 fs-4 text-white py-0 m-0";
    submitButton.innerText = "Submit";
    submitButtonRow.append(submitButton);

    const albumDetailsRow = document.createElement("div");
    albumDetailsRow.className = "row mt-5 pt-5";
    detailsContainer.append(albumDetailsRow);

    const albumDetailsHeadingCol = document.createElement("div");
    albumDetailsHeadingCol.className = "col-12";
    albumDetailsRow.append(albumDetailsHeadingCol);

    const albumDetailsHeading = document.createElement("h5");
    albumDetailsHeading.className = "fw-bold";
    albumDetailsHeading.innerText = "Album Details";
    albumDetailsHeadingCol.append(albumDetailsHeading);

    const albumDetailsListRow = document.createElement("div");
    albumDetailsListRow.className = "row";
    detailsContainer.append(albumDetailsListRow);

    const albumDetailsListCol = document.createElement("div");
    albumDetailsListCol.className = "col-12";
    albumDetailsListRow.append(albumDetailsListCol);

    const albumDetailsList = document.createElement("ul");
    albumDetailsList.className = "list-unstyled";
    albumDetailsListCol.append(albumDetailsList);

    const details = [`Title: ${title}`, `Artist/band: ${artist}`, `Release Year: ${releaseYear}`, `Record Label: ${recordLabel}`, `Condition: ${condition}`, `Genre: ${genre}`];

    details.forEach((detail) => {
      const detailsList = document.createElement("li");
      detailsList.innerText = detail;
      albumDetailsList.append(detailsList);
    });

    const tracklistRow = document.createElement("div");
    tracklistRow.className = "row mt-4";
    detailsContainer.append(tracklistRow);

    const tracklistHeadingCol = document.createElement("div");
    tracklistHeadingCol.className = "col-12";
    tracklistRow.append(tracklistHeadingCol);

    const tracklistHeading = document.createElement("h5");
    tracklistHeading.className = "fw-bold";
    tracklistHeading.innerText = "Tracklist";
    tracklistHeadingCol.append(tracklistHeading);

    const tracklistColA = document.createElement("div");
    tracklistColA.className = "col-12 col-md-6";
    tracklistRow.append(tracklistColA);

    const tracklistSideAHeading = document.createElement("p");
    tracklistSideAHeading.innerText = "Side A:";
    tracklistColA.append(tracklistSideAHeading);

    const tracklistSideA = document.createElement("ul");
    tracklistSideA.className = "list-unstyled";
    tracklistColA.append(tracklistSideA);

    sideATracks.forEach((track) => {
      const trackAList = document.createElement("li");
      trackAList.innerText = track;
      tracklistSideA.append(trackAList);
    });

    const tracklistColB = document.createElement("div");
    tracklistColB.className = "col-12 col-md-6";
    tracklistRow.append(tracklistColB);

    const tracklistSideBHeading = document.createElement("p");
    tracklistSideBHeading.innerText = "Side B:";
    tracklistColB.append(tracklistSideBHeading);

    const tracklistSideB = document.createElement("ul");
    tracklistSideB.className = "list-unstyled";
    tracklistColB.append(tracklistSideB);

    sideBTracks.forEach((track) => {
      const trackBList = document.createElement("li");
      trackBList.innerText = track;
      tracklistSideB.append(trackBList);
    });

    const viewBidsRow = document.createElement("div");
    viewBidsRow.className = "row mt-4";
    detailsContainer.append(viewBidsRow);

    const viewBidsLink = document.createElement("a");
    viewBidsLink.className = "fs-5";
    viewBidsLink.setAttribute("data-bs-toggle", "modal");
    viewBidsLink.setAttribute("data-bs-target", "#bid-history");
    viewBidsLink.innerText = "View bid history";
    viewBidsLink.href = "#";
    viewBidsRow.append(viewBidsLink);
  } catch (error) {
    console.error(error);
  }
}
