'use strict';

var appUrl = window.location.origin;
var requestedBooksBtn  = document.getElementById("requestList");
var approvalBooksBtn = document.getElementById("approvalList");

(function() {

  requestedBooksBtn.addEventListener("click", function(event) {
    ajaxFunctions.ajaxRequest("GET", appUrl + "/requestList", function(response) {
      response = JSON.parse(response);
      //generate list
      domFunctions.showRequestedList(response);
    });
  });

  approvalBooksBtn.addEventListener("click", function(event) {
    ajaxFunctions.ajaxRequest("GET", appUrl + "/approvalList", function(response) {
      response = JSON.parse(response);
      //generate list
      domFunctions.showApprovalList(response.books);
      //update button label text
      approvalBooksBtn.innerHTML = "Pending My Approvals (" + response.count + ")";
    });
  });

  window.addEventListener("click", function(e) {
    var buttonName = e.target.innerHTML;
    //filter button click events
    if(e.target.tagName === "BUTTON" &&
      ( buttonName === "Request" || buttonName === "Delete" ||   buttonName === "Remove" || buttonName === "Approve" || buttonName === "Reject")
    ) {
      //prepare url
      var url = "/" + e.target.innerHTML.toLowerCase() + "/";
      //post request to url with book id
      ajaxFunctions.ajaxRequest("POST", appUrl + url + e.target.id, function(response) {
          response = JSON.parse(response);
          //remove book from list
          var elementToRemove = e.target.parentElement.parentElement;
          elementToRemove.parentElement.removeChild(elementToRemove);
          if(e.target.innerHTML === "Request" || e.target.innerHTML === "Delete") {
            //update button label text with current count
            requestedBooksBtn.innerHTML = "My Requested Books (" + response.count + ")";
          }
          if(e.target.innerHTML === "Approve" || e.target.innerHTML === "Reject") {
            //update button label text with current count
            approvalBooksBtn.innerHTML = "Pending My Approvals (" + response.count + ")";
          }
      });
    }
  });

})();
