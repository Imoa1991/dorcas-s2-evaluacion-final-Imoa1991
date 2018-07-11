'use strict';
var search = document.querySelector('.series');
var buttonSearch = document.querySelector('.button');
var ul = document.querySelector('ul');
buttonSearch.addEventListener('click', see);
function see() {
  ul.innerHTML = '';
  fetch('http://api.tvmaze.com/search/shows?q=' + search.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(apiResponse) {
      for(var i = 0; i<apiResponse.length; i++) {
        var name = apiResponse[i].show.name;
        var lis = document.createElement('li');
        var image = document.createElement('img');
        var divs = document.createElement('div');
        divs.classList.add('container');
        var contentName = document.createTextNode(name);
        if (apiResponse[i].show.image === null){
          ul.innerHTML += '<img src= "https://via.placeholder.com/210x295/FFE4C4/008B8B/?text=TV">';
        } else {
          image.src += apiResponse[i].show.image.medium;
        }
        lis.appendChild(divs);
        divs.appendChild(image);
        divs.appendChild(contentName);
        ul.appendChild(lis);
        divs.addEventListener('click', showTitle); //el div aun no esta creado
      // ul.removeChild(lis); NO funciona :(
      }
    });
}
function showTitle(event) {
  event.currentTarget.classList.add('stiles');
}
// ul.innerHTML += '<li>' + '<img src=' + apiResponse[i].show.image.medium + '>' + apiResponse[i].show.name + '</li>';
// }
