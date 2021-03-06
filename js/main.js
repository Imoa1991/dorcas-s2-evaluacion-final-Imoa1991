'use strict';
var search = document.querySelector('.series');
var buttonSearch = document.querySelector('.button');
var ul = document.querySelector('ul');
buttonSearch.addEventListener('click', see);
search.addEventListener('keypress', enter);
function enter(event) {
  if (event.key === 'Enter') {
    see();
  }
}
function see() {
  ul.innerHTML = '';
  fetch('https://api.tvmaze.com/search/people?q=' + search.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(apiResponse) {
      for(var i = 0; i<apiResponse.length; i++) {
        var name = apiResponse[i].person.name;
        var dateStart = apiResponse[i].person.birthday;
        console.log(dateStart);
        var li = document.createElement('li');
        var div = document.createElement('div');
        var image = document.createElement('img');
        var date = document.createElement('p');
        var contentName = document.createTextNode(name);
        li.classList.add('list');
        div.classList.add('container');
        image.classList.add('poster');
        date.classList.add('date');
        if (apiResponse[i].person.image === null){
          image.src = 'https://via.placeholder.com/210x295/FFE4C4/008B8B/?text=TV';
        } else {
          image.src = apiResponse[i].person.image.medium;
        }
        if (dateStart === null) {
          dateStart = 'No ha nacido';
        }
        var contentDate = document.createTextNode(dateStart);
        date.appendChild(contentDate);
        div.addEventListener('click', showTitle);
        div.appendChild(image);
        div.appendChild(contentName);
        div.appendChild(date);
        li.appendChild(div);
        ul.appendChild(li);
      }
    });
}
function showTitle(event) {
  event.currentTarget.classList.toggle('favourite');
}
