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
var $mobileNotes = document.querySelector('#mobileNotes');
var $mobileForm = document.querySelector('#mobileForm');
var $table = document.getElementById('desktopTable');
var $sortRank = document.querySelector('.sort-rank');
var $sortName = document.querySelector('.sort-name');
var $sortPrice = document.querySelector('.sort-price');
var $sortVolume = document.querySelector('.sort-volume');
var $sortCap = document.querySelector('.sort-cap');
var $sort1h = document.querySelector('.sort-1h');
var $sort24h = document.querySelector('.sort-24h');
var $sort7d = document.querySelector('.sort-7d');

// $('th').on('click', function () {
//   var column = $(this).data('column')
//   var order = $(this).data('order')
//   console.log('Column was Clicked!,' column, order)
// })

// THE START OF DESKTOP FUNCTIONS
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

  // IF the priceChangeX is less than 0, turn Red, if greater than 0, turn green.
  if (element.priceChange1h === 0) {
    tdSix.className = 'neutral';
  } else if (element.priceChange1h > 0) {
    tdSix.className = 'tendies';
  } else {
    tdSix.className = 'losses';
  }

  if (element.priceChange1d === 0) {
    tdSeven.className = 'neutral';
  } else if (element.priceChange1d > 0) {
    tdSeven.className = 'tendies';
  } else {
    tdSeven.className = 'losses';
  }

  if (element.priceChange1w === 0) {
    tdEight.className = 'neutral';
  } else if (element.priceChange1w > 0) {
    tdEight.className = 'tendies';
  } else {
    tdEight.className = 'losses';
  }

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
  xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=15&currency=USD');
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

// Function to help sort names, and priceChanges columns
function nameSortColumn(n) {
  var switching = true;
  var forceSwitch;
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var x = rows[i].getElementsByTagName('TD')[n];
      var y = rows[i + 1].getElementsByTagName('TD')[n];
      forceSwitch = false;
      if (x.innerText.toUpperCase() > y.innerText.toUpperCase()) {
        forceSwitch = true;
        break;
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// Function to help sort numbers like ranks and prices
function numSortColumn(n) {
  var switching = true;
  var forceSwitch;
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var x = rows[i].getElementsByTagName('TD')[n];
      var y = rows[i + 1].getElementsByTagName('TD')[n];
      forceSwitch = false;
      if (x.innerText * 100 > y.innerText * 100) {
        forceSwitch = true;
        break;
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// function sortScore(a, b) {
//   return (a * 1000) - (b * 1000);
// }

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

$sortRank.addEventListener('click', function (event) {
  numSortColumn(0);
});

// Desktop Sort eventListener
$sortName.addEventListener('click', function (event) {
  // console.log('Name Sort Clicked!');
  nameSortColumn(1);
  // reverseColumn1();
});

$sortPrice.addEventListener('click', function (event) {
  // console.log('Price sort Clicked!');
  numSortColumn(2);
});

$sortVolume.addEventListener('click', function (event) {
  // console.log('Volume sort Clicked!');
  numSortColumn(3);
});

$sortCap.addEventListener('click', function (event) {
  numSortColumn(4);
});

$sort1h.addEventListener('click', function (event) {
  nameSortColumn(5);
});
$sort24h.addEventListener('click', function (event) {
  nameSortColumn(6);
});
$sort7d.addEventListener('click', function (event) {
  nameSortColumn(7);
});

// END OF DESKTOP FUNCTIONS

// NEXT FUNCTIONS ARE FOR MOBILE ONLY
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

  if (mobileElement.priceChange1d === 0) {
    h3Four.className = 'mobileNeutral';
  } else if (mobileElement.priceChange1d > 0) {
    h3Four.className = 'mobileTendies';
  } else {
    h3Four.className = 'mobileLosses';
  }

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
  xhrm.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=15&currency=USD');
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
    note: $mobileNotes.value,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.push(formData);
  }
  $mobileModal.className = 'mobileModalContainerOff';
  // document.querySelector('#mobileForm').reset();
});

// END OF MOBILE ONLY FUNCTIONS
