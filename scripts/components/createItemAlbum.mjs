export function addImageCard() {
  const imageLinkInput = document.getElementById("inputImageLink");

  if (imageLinkInput) {
    const imageLink = imageLinkInput.value;

    if (imageLink) {
      const cardGroup = document.getElementById("imageCardGroup");

      const cardDiv = document.createElement("div");
      cardDiv.className = "card d-flex align-items-center";
      cardDiv.setAttribute("data-image-link", imageLink);
      cardGroup.append(cardDiv);

      const linkImg = document.createElement("img");
      linkImg.src = imageLink;
      linkImg.className = "card-img-top";
      linkImg.alt = "Item Image";
      cardDiv.append(linkImg);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardDiv.append(cardBody);

      const deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.className = "card-link";
      deleteLink.textContent = "Delete";
      deleteLink.addEventListener("click", function (event) {
        event.preventDefault();
        cardDiv.remove();
      });
      cardBody.append(deleteLink);

      imageLinkInput.value = "";
    } else {
      console.error("Input element not found");
    }
  }
}
