'use strict';

var ajaxFunctions = {

  ready: function(fn) {
    if (typeof fn !== 'function')
      return;

    if (document.readyState === 'complete')
      return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
  },

  ajaxRequest: function(method, url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    }
    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

};
