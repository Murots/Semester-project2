const yourListings = document.getElementById("your-listings");
const yourBids = document.getElementById("your-bids");

yourListings.addEventListener("click", function () {
  yourListings.classList.add("active");
  yourBids.classList.remove("active");
});

yourBids.addEventListener("click", function () {
  yourBids.classList.add("active");
  yourListings.classList.remove("active");
});
