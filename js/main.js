// Declare a variable to append my DOM tree too.
var $appended = document.querySelector('.appended');
var $mobileAppended = document.querySelector('.mobileAppended');
var $toggleModalOn = document.querySelector('.toggleModalOn');
var $toggleMobileModal = document.querySelector('.toggleMobileModalOn');
var $modal = document.getElementById('modal');
var $mobileModal = document.getElementById('mobileModal');
var $cancelDesktopButton = document.querySelector('#cancelDesktopModal');
var $cancelMobileButton = document.querySelector('#cancelMobileModal');
var $desktopNotes = document.querySelector('#desktopNotes');
var $desktopForm = document.querySelector('#desktopForm');
var $mobileForm = document.querySelector('#mobileForm');
var $mobileNotes = document.querySelector('#mobileNotes');

// Function to create the DOM tree, as well as add their respective element property to the proper td.
function renderElements(element) {
  var trAppended = document.createElement('tr');
  var tdOne = document.createElement('td');
  tdOne.setAttribute('class', 'numbers paddingForTable');
  tdOne.textContent = element.rank;
  var tdOneImage = document.createElement('img');
  tdOneImage.setAttribute('src', element.icon);
  tdOneImage.setAttribute('class', 'logos');
  var tdTwo = document.createElement('td');
  tdTwo.setAttribute('class', 'letters paddingForTable');
  tdTwo.textContent = element.name + ' ' + element.symbol;
  var tdThree = document.createElement('td');
  tdThree.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdThree.textContent = '$' + Math.ceil(element.price * 100) / 100;
  var tdFour = document.createElement('td');
  tdFour.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdFour.textContent = '$' + Math.ceil(element.volume * 100) / 100;
  var tdFive = document.createElement('td');
  tdFive.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdFive.textContent = '$' + Math.ceil(element.marketCap * 100) / 100;
  var tdSix = document.createElement('td');
  tdSix.setAttribute('class', 'numbers text-align-center paddingForTable nodeList');
  tdSix.setAttribute('id', 'nodeList');
  tdSix.textContent = element.priceChange1h + '%';
  var tdSeven = document.createElement('td');
  tdSeven.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdSeven.textContent = element.priceChange1d + '%';
  var tdEight = document.createElement('td');
  tdEight.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdEight.textContent = element.priceChange1w + '%';
  var tdNine = document.createElement('td');
  tdNine.setAttribute('id', element.id);
  var tdNineSticky = document.createElement('i');
  tdNineSticky.setAttribute('class', 'toggleModalOn fas fa-sticky-note paddingForTable');
  tdNineSticky.setAttribute('id', element.id);

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

// Function to make our API request, and then append our DOM tree to our targeted position.
function coinstatRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=7&currency=USD');
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.coins.length; i++) {
      var test = renderElements(xhr.response.coins[i]);
      $appended.append(test);
    }
  });
  xhr.send();
}

// When the window loads, will load the coinstatRequest function.
window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
});

// Create addEventListener of Desktop Cancel Button
$cancelDesktopButton.addEventListener('click', function (event) {
  $modal.className = 'modalContainerOff';
  document.querySelector('#desktopForm').reset();
});

// Create addEventListener  for the sticky note click.
$toggleModalOn.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $modal.className = 'mobileModalContainerOn';
    data.currentCoin = event.target.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.currentCoin === data.entries[i].coinID) {
        $desktopNotes.value = data.entries[i].note;
      }
    }
  }
});

// Desktop Submit Listener.
$desktopForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    note: $desktopNotes.value,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.push(formData);
  }
  $modal.className = 'modalContainerOff';
  document.querySelector('#desktopForm').reset();
});

// Function to create Mobile DOM Tree
function mobileRenderElements(mobileElement) {
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'flex justify-center selector');
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'mobileSelector align-center padding-left');
  var imgOne = document.createElement('img');
  imgOne.setAttribute('class', 'mobileLogo');
  imgOne.setAttribute('src', mobileElement.icon);
  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'mobileSelector align-center padding-left');
  var h3One = document.createElement('h3');
  h3One.setAttribute('class', 'letters');
  h3One.textContent = mobileElement.symbol;
  var h3Two = document.createElement('h3');
  h3Two.setAttribute('class', 'letters');
  h3Two.textContent = mobileElement.name;
  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'mobileSelector align-center padding-left padding-bottom');
  var h3Three = document.createElement('h3');
  h3Three.setAttribute('class', 'numbers');
  h3Three.textContent = '$' + Math.ceil(mobileElement.price * 100) / 100;
  var h3Four = document.createElement('h3');
  h3Four.setAttribute('class', 'numbers');
  h3Four.textContent = mobileElement.priceChange1d + '%';
  var tdSticky = document.createElement('i');
  tdSticky.setAttribute('class', 'toggleModalOn fas fa-sticky-note paddingForTable');
  tdSticky.setAttribute('id', mobileElement.id);

  divOne.appendChild(divTwo);
  divTwo.appendChild(imgOne);
  divOne.appendChild(divThree);
  divThree.appendChild(h3One);
  divThree.appendChild(h3Two);
  divOne.appendChild(divFour);
  divFour.appendChild(h3Three);
  divFour.appendChild(h3Four);
  divFour.appendChild(tdSticky);
  return divOne;
}

// Function to make the API request, and append our DOM tree for mobile only.
function mobileCoinStatRequest() {
  var xhrm = new XMLHttpRequest();
  xhrm.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=7&currency=USD');
  xhrm.setRequestHeader('token', 'abc123');
  xhrm.responseType = 'json';
  xhrm.addEventListener('load', function () {
    for (var i = 0; i < xhrm.response.coins.length; i++) {
      var test = mobileRenderElements(xhrm.response.coins[i]);
      $mobileAppended.append(test);
    }
  });
  xhrm.send();
}

// When the window loads, will load the mobileCoinStatRequest function
window.addEventListener('DOMContentLoaded', function (event) {
  mobileCoinStatRequest();
});

// Create addEventListener of Mobile Cancel Button
$cancelMobileButton.addEventListener('click', function (event) {
  $mobileModal.className = 'mobileModalContainerOff';
  document.querySelector('#mobileForm').reset();
});

// Create addEventListener for Mobile Sticky Note Click
$toggleMobileModal.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $mobileModal.className = 'mobileModalContainerOn';
    data.currentCoin = event.target.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.currentCoin === data.entries[i].coinID) {
        $mobileNotes.value = data.entries[i].note;
      }
    }
  }
});

// Mobile Submit Listener
$mobileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    note: $desktopNotes.value,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.push(formData);
  }
  $mobileModal.className = 'mobileModalContainerOff';
  document.querySelector('#mobileForm').reset();
});
