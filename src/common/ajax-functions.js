'use strict';

var ajaxFunctions = {

  ready: function(fn) {
    if (typeof fn !== 'function')
      return;

    if (document.readyState === 'complete')
      return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
  },

  post: function(url, body, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    }
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(body);
  },

  get: function(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.response);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

};
