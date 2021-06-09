var $appended = document.querySelector('.appended');

function renderElements(element) {
  var trAppended = document.createElement('tr');
  var tdOne = document.createElement('td');
  tdOne.setAttribute('class', 'numbers');
  tdOne.textContent = element.rank;
  var tdOneImage = document.createElement('img');
  tdOneImage.setAttribute('src', element.icon);
  tdOneImage.setAttribute('class', 'logos');
  var tdTwo = document.createElement('td');
  tdTwo.setAttribute('class', 'letters');
  tdTwo.textContent = element.name + ' ' + element.symbol;
  var tdThree = document.createElement('td');
  tdThree.setAttribute('class', 'numbers');
  tdThree.textContent = Math.ceil(element.price * 1000) / 1000;
  var tdFour = document.createElement('td');
  tdFour.setAttribute('class', 'numbers');
  tdFour.textContent = Math.ceil(element.volume) + element.symbol;
  var tdFive = document.createElement('td');
  tdFive.setAttribute('class', 'numbers');
  tdFive.textContent = '$' + Math.ceil(element.marketCap * 100) / 100;
  var tdSix = document.createElement('td');
  tdSix.setAttribute('class', 'numbers');
  tdSix.textContent = element.totalSupply + ' ' + element.symbol;
  var tdSeven = document.createElement('td');
  tdSeven.setAttribute('class', 'numbers');
  tdSeven.textContent = element.priceChange1h + '%';
  var tdEight = document.createElement('td');
  tdEight.setAttribute('class', 'numbers');
  tdEight.textContent = element.priceChange1d + '%';
  var tdNine = document.createElement('td');
  var tdNineSticky = document.createElement('i');
  tdNineSticky.setAttribute('class', 'fas fa-sticky-note');

  // console.log(element);

  trAppended.appendChild(tdOne);
  tdOne.appendChild(tdOneImage);
  trAppended.appendChild(tdTwo);
  trAppended.appendChild(tdThree);
  trAppended.appendChild(tdFour);
  trAppended.appendChild(tdFive);
  trAppended.appendChild(tdSix);
  trAppended.appendChild(tdSeven);
  trAppended.appendChild(tdEight);
  trAppended.appendChild(tdNine);
  tdNine.appendChild(tdNineSticky);
  return trAppended;
}

function coinstatRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=7&currency=USD');
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('What is received:' + xhr.response);
    // console.log('An array of what is received', xhr.response.coins);
    // console.log('The Index 0 of this Array: ', xhr.response.coins[0]);
    // console.log('The current price of Index 0: ' + xhr.response.coins[0].price);
    for (var i = 0; i < xhr.response.coins.length; i++) {
      var test = renderElements(xhr.response.coins[i]);
      $appended.append(test);
    }
  });
  xhr.send();
}

window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
});
