'use strict';

var domFunctions = {

  showRequestedList:  function(books) {
    var listContainer = document.getElementById("trade-list");
    var listTitle = document.createElement("h1");
    listTitle.innerHTML = "My Requested Books";
    var divider = document.createElement("hr");
    listContainer.appendChild(listTitle);
    listContainer.appendChild(divider);

    for (var i in books) {
        listContainer.appendChild(createBook(books[i]));
    }
  }

}


function createBook(book) {
  let imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");

  let bookImage = document.createElement('img');
  bookImage.setAttribute("src", book.imageUrl);

  let overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay");

  let removeButton = document.createElement("button");
  removeButton.setAttribute("id", book._id);
  removeButton.setAttribute("class", "btn btn-secondary overlay-btn");
  removeButton.innerHTML = "Delete";

  overlay.appendChild(removeButton);
  imgContainer.appendChild(bookImage);
  imgContainer.appendChild(overlay);

  return imgContainer;
}
