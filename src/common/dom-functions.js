'use strict';
var listContainer = document.getElementById("trade-list");

var domFunctions = {

  showRequestedList:  function(books) {
    prepareListContainer('requests');
    for (var i in books) {
        listContainer.appendChild(createBook(books[i], "requests"));
    }
  },

  showApprovalList: function(books) {
    prepareListContainer('approvals');
    for (var i in books) {
        listContainer.appendChild(createBook(books[i], "approvals"));
    }
  }

}

function prepareListContainer(titleType) {
  //clear container
  listContainer.innerHTML = "";
  var listTitle = document.createElement("h1");
  //set title text
  if(titleType === 'requests')
      listTitle.innerHTML = "My Requested Books";
  else if (titleType === 'approvals')
      listTitle.innerHTML = "Pending My Approvals";
  //append elements to container
  var divider = document.createElement("hr");
  listContainer.appendChild(listTitle);
  listContainer.appendChild(divider);
}


function createBook(book, overlayBtnType) {
  let imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");

  let bookImage = document.createElement('img');
  bookImage.setAttribute("src", book.imageUrl);

  let overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay");

  let overlayButton = document.createElement("button");
  overlayButton.setAttribute("id", book._id);

  //Approved button
  if(book.isApproved) {
    overlayButton.setAttribute("class", "btn btn-secondary overlay-btn");
    overlayButton.setAttribute("disabled", true);
    overlayButton.innerHTML = "Approved";
    overlay.appendChild(overlayButton);
  //Delete button
  } else if(overlayBtnType === 'requests') {
    overlayButton.setAttribute("class", "btn btn-danger overlay-btn");
    overlayButton.innerHTML = "Delete";
    overlay.appendChild(overlayButton);
  //Approve button
  } else if (overlayBtnType === 'approvals') {
    overlayButton.setAttribute("class", "btn btn-success approve-btn");
    overlayButton.innerHTML = "Approve";

    let overlayButton2 = document.createElement("button");
    overlayButton2.setAttribute("id", book._id);
    overlayButton2.setAttribute("class", "btn btn-danger reject-btn");
    overlayButton2.innerHTML = "Reject";

    overlay.appendChild(overlayButton);
    overlay.appendChild(overlayButton2);
  }

  imgContainer.appendChild(bookImage);
  imgContainer.appendChild(overlay);

  return imgContainer;
}
