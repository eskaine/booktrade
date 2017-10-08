'use strict';

var appUrl = window.location.origin;
var requestedBooksBtn  = document.getElementById("requestList");
var approvalBooksBtn = document.getElementById("approvalList");

(function() {

  requestedBooksBtn.addEventListener("click", function(event) {
    ajaxFunctions.get(appUrl + "/requestList", function(response) {
      response = JSON.parse(response);
      domFunctions.showRequestedList(response);
    });
  });

  window.addEventListener("click", function(e) {

    removeButton(e);
    requestButton(e);

  });

})();

function removeButton(event) {
  if (event.target.tagName === "BUTTON" && event.target.innerHTML === "Remove") {
    ajaxFunctions.post(appUrl + "/remove", "id=" + event.target.id, function(response) {
      if (response) {
        var elementToRemove = event.target.parentElement.parentElement;
        elementToRemove.parentElement.removeChild(elementToRemove);
      }
    });
  }
}

function requestButton(event) {
  if(event.target.tagName === "BUTTON" && (event.target.innerHTML === "Request" || event.target.innerHTML === "Delete")) {
    var url = "/request";

    if(event.target.innerHTML === "Delete") {
      url = "/requestList";
    }

    ajaxFunctions.post(appUrl + url, "book_id=" + event.target.id, function(response) {
      console.log(response);
      response = JSON.parse(response);
      var elementToRemove = event.target.parentElement.parentElement;
      elementToRemove.parentElement.removeChild(elementToRemove);
      requestedBooksBtn.innerHTML = "My Requested Books (" + response.totalRequests + ")";
    });
  }
}
