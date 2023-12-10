import { filteredListings } from "./libraries/constants.mjs";
import { fetchWithToken } from "./services/doFetch.mjs";
import { errorMessage } from "./libraries/errorMessage.mjs";
import { createListingHTML } from "./libraries/createListing.mjs";

const listingsContainer = document.getElementById("listings-container");

const spinner = document.getElementById("spinner-div");
// const loadMoreButton = document.querySelector("#loadMore-button");

// let postValue = 1;
// let currentPage = `?page=${postValue}`;

// const pageURL = getListingsURL + currentPage;

// const sortByForm = document.getElementById("sort-by-form");

// sortByForm.addEventListener("change", async () => {
//   const selectedOption = sortByForm.value;

//   const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);

//   filterPosts(selectedOption, filteredTwisterPosts);
// });

// const searchField = document.getElementById("search-field");
// const searchButton = document.getElementById("search-button");

// searchButton.addEventListener("click", async () => {
//   const searchQuery = searchField.value.toLowerCase();
//   const filteredTwisterPosts = await getPostsWithToken(allPostsByTitle);

//   filterPosts(searchQuery, filteredTwisterPosts);
// });

/**
 * Retrieves posts with authentication token and filters them based on the selected option.
 * @param {string} url
 * @returns {Promise<array>}
 */
async function getListings(url) {
  try {
    const json = await fetchWithToken(url);
    return json;
  } catch (error) {
    console.error(error);
    spinner.remove();
    listingsContainer.innerText = errorMessage("Could not fetch data. Please try again later.");
  }
}

/**
 * Creates objects of an array
 * @param {object} listings
 * @returns {void}
 */
function createListings(listings) {
  listings.forEach((listing) => {
    createListingHTML(listing);
  });
}

/**
 * Main function to fetch and initiate process of displaying filtered posts.
 * @returns {void}
 */
async function main() {
  try {
    const processedListings = await getListings(filteredListings);
    createListings(processedListings);
    spinner.remove();
  } catch (error) {
    console.error(error);
    spinner.remove();
    listingsContainer.innerText = errorMessage("Could not fetch data. Please try again later.");
  }
}

main();

// async function getListings(URL) {
//     try {
//         const response = await fetch(URL);
//         const posts = await response.json();
//         return posts;
//     } catch (error) {
//         console.error(error);
//         listingsContainer.innertext = errorMessage("Could not fetch data. Please try again later.");
//     }
// }

// async function createPostListHTML(post) {
//     try {
//         const featuredImageId = post.featured_media;
//         const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
//         const response = await fetch(featuredImageURL);
//         const featuredImage = await response.json();

//         const blogId = post.id;
//         const blogListImage = featuredImage.source_url;

//         const blogContainer = document.createElement("a");
//         blogContainer.classList.add("blog-container");
//         blogContainer.classList.add("featuredImage-" + featuredImageId);
//         blogContainer.style.backgroundImage = `url(${blogListImage})`;
//         blogContainer.setAttribute("alt", featuredImage.alt_text);
//         blogContainer.href = "blogDetails.html?id=" + blogId;
//         blogListContainer.append(blogContainer);

//         const TextContent = document.createElement("div");
//         TextContent.className = "blogContainer-textContent";
//         blogContainer.append(TextContent);

//         const blogTitle = document.createElement("h5");
//         blogTitle.className = "blogContainer-title";
//         blogTitle.innerText = post.title.rendered;
//         TextContent.append(blogTitle);

//         const readMore = document.createElement("h4");
//         readMore.className = "blogContainer-readMore";
//         readMore.innerText = "Read more...";
//         TextContent.append(readMore);
//     } catch (error) {
//         console.error(error);
//         blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
//     }
// }

// function createPostsHTML(posts) {
//     for (let i = 0; i < posts.length; i++) {
//         const post = posts[i];
//         createPostListHTML(post);
//     }
// }

// async function loadMorePosts() {
//     try {
//         postValue++;
//         currentPage = `?page=${postValue}`;
//         const nextPageURL = apiBase + postsBase + currentPage;

//         const response = await fetch(nextPageURL);
//         const posts = await response.json();
//         createPostsHTML(posts);

//         if (posts.length < 10) {
//             loadMoreButton.disabled = true;
//             loadMoreButton.style.backgroundColor = "#717c5b";
//         }
//     } catch (error) {
//         console.error(error);
//         blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
//     }
// }

// loadMoreButton.addEventListener("click", loadMorePosts);

// async function main(getListingsURL) {
//     try {
//         const posts = await getListings(getListingsURL);
//         createPostsHTML(posts);

//         // if (posts.length < 10) {
//         //     loadMoreButton.disabled = true;
//         // }

//         // const loaderDiv = document.querySelector(".loader");
//         // loaderDiv.remove();
//     } catch (error) {
//         console.error(error);
//         blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
//     }
// }

// main();
