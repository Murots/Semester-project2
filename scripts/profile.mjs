const yourListings = document.getElementById("your-listings");
const yourBids = document.getElementById("your-bids");
// const optionsButtons = document.querySelectorAll("#button-options button");

yourListings.addEventListener("click", function () {
  yourListings.classList.add("active");
  yourBids.classList.remove("active");
});

yourBids.addEventListener("click", function () {
  yourBids.classList.add("active");
  yourListings.classList.remove("active");
});
