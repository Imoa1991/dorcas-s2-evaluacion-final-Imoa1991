'use strict';
var search = document.querySelector('.series');
var buttonSearch = document.querySelector('.button');
var ul = document.querySelector('ul');
// var saveFavorites = [
//   'id':0,
// ];
buttonSearch.addEventListener('click', see);
search.addEventListener('keypress', enter);
function enter(event) {
  if (event.key === 'Enter') {
    see();
  }
}
function see() {
  ul.innerHTML = '';
  fetch('https://api.tvmaze.com/search/shows?q=' + search.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(apiResponse) {
      for(var i = 0; i<apiResponse.length; i++) {
        var name = apiResponse[i].show.name;
        var li = document.createElement('li');
        var div = document.createElement('div');
        var image = document.createElement('img');
        var contentName = document.createTextNode(name);
        li.classList.add('list');
        div.classList.add('container');
        image.classList.add('poster');
        // div.setAtributte('data-favorite', apiResponse[i].show.id);
        // var guiltyElement = apiResponse.currentTarget;
        // var seriesID = guiltyElement.getAttribute('data-favorite');
        // document.querySelector('#' + seriesID).innerHTML = guiltyElement.value;
        // saveFavorites[seriesID] = guiltyElement.value;

        if (apiResponse[i].show.image === null){
          image.src = 'https://via.placeholder.com/210x295/FFE4C4/008B8B/?text=TV';
        } else {
          image.src = apiResponse[i].show.image.medium;
        }
        div.addEventListener('click', showTitle);
        div.appendChild(image);
        div.appendChild(contentName);
        li.appendChild(div);
        ul.appendChild(li);
      }
    });
}
function showTitle(event) {
  event.currentTarget.classList.toggle('favourite');
  //saveForm();
}
// function saveForm() {
//   localStorage.setItem('userForm', JSON.stringify(userForm));
// }
