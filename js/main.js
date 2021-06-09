var $appended = document.querySelector('.appended');

function renderElements(element) {
  var trAppended = document.createElement('tr');
  var tdOne = document.createElement('td');
  tdOne.setAttribute('class', 'numbers');
  var tdTwo = document.createElement('td');
  tdTwo.setAttribute('class', 'letters');
  var tdThree = document.createElement('td');
  tdThree.setAttribute('class', 'numbers');
  var tdFour = document.createElement('td');
  tdFour.setAttribute('class', 'numbers');
  var tdFive = document.createElement('td');
  tdFive.setAttribute('class', 'numbers');
  var tdSix = document.createElement('td');
  tdSix.setAttribute('class', 'numbers');
  var tdSeven = document.createElement('td');
  tdSeven.setAttribute('class', 'numbers');
  var tdEight = document.createElement('td');
  tdEight.setAttribute('class', 'numbers');
  var tdNine = document.createElement('i');
  tdNine.setAttribute('class', 'fas fa-sticky-note');

  trAppended.appendChild(tdOne);
  trAppended.appendChild(tdTwo);
  trAppended.appendChild(tdThree);
  trAppended.appendChild(tdFour);
  trAppended.appendChild(tdFive);
  trAppended.appendChild(tdSix);
  trAppended.appendChild(tdSeven);
  trAppended.appendChild(tdEight);
  trAppended.appendChild(tdNine);
  return trAppended;
}

function coinstatRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD');
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
    // console.log(xhr.response.coins.length);
  });
  for (var i = 0; i < 6; i++) {
    var test = renderElements(xhr.response.coins[i]);
    $appended.append(test);
  }
  xhr.send();
}

window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
});
