// Declare a variable to append my DOM tree too.
// Coinsaves serves as a storage for the coins API request.
var coinSaves;
// Where the DOM tree appends too.
var $appended = document.querySelector('.appended');
var $appendCrypto = document.querySelector('.appendCrypto');
var $mobileAppended = document.querySelector('.mobileAppended');
var $toggleModalOn = document.querySelector('.toggleModalOn');
var $toggleMobileModal = document.querySelector('.toggleMobileModalOn');
var $modal = document.getElementById('modal');
var $tableView = document.getElementById('tableView');
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
var $queries = document.querySelector('.queryPage');
var $ret = document.querySelector('.ret');
var $cryptoView = document.getElementById('cryptoView');

// THE START OF DESKTOP FUNCTIONS

// Function to create the DOM tree, as well as add their respective element property to the proper td.
function renderElements(element) {
  var trAppended = document.createElement('tr');
  var tdOne = document.createElement('td');
  tdOne.setAttribute('class', 'numbers paddingForTable');
  tdOne.setAttribute('id', element.id);
  tdOne.textContent = element.rank;
  var tdOneImage = document.createElement('img');
  tdOneImage.setAttribute('src', element.icon);
  tdOneImage.setAttribute('class', 'logos');
  tdOneImage.setAttribute('id', element.id);
  var tdTwo = document.createElement('td');
  tdTwo.setAttribute('class', 'letters paddingForTable');
  tdTwo.setAttribute('id', element.id);
  tdTwo.textContent = element.name + ' ' + element.symbol;
  var tdThree = document.createElement('td');
  tdThree.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdThree.setAttribute('id', element.id);
  tdThree.textContent = '$' + Math.ceil(element.price * 100) / 100;
  var tdFour = document.createElement('td');
  tdFour.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdFour.setAttribute('id', element.id);
  tdFour.textContent = '$' + Math.ceil(element.volume * 100) / 100;
  var tdFive = document.createElement('td');
  tdFive.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdFive.setAttribute('id', element.id);
  tdFive.textContent = '$' + Math.ceil(element.marketCap * 100) / 100;
  var tdSix = document.createElement('td');
  tdSix.setAttribute('class', 'numbers text-align-center paddingForTable nodeList');
  tdSix.setAttribute('id', 'element.id');
  tdSix.textContent = element.priceChange1h + '%';
  var tdSeven = document.createElement('td');
  tdSeven.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdSeven.setAttribute('id', element.id);
  tdSeven.textContent = element.priceChange1d + '%';
  var tdEight = document.createElement('td');
  tdEight.setAttribute('class', 'numbers text-align-center paddingForTable');
  tdEight.setAttribute('id', element.id);
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
    // help save the coins API request
    coinSaves = xhr.response.coins;
  });
  xhr.send();
}

// Function to help sort names
function nameSortColumn(a) {
  var switching = true;
  var count = 0;
  var direction = 'ascending';
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var forceSwitch = false;
      var x = rows[i].getElementsByTagName('TD')[a];
      var y = rows[i + 1].getElementsByTagName('TD')[a];
      if (direction === 'ascending') {
        if (x.innerText.toUpperCase() > y.innerText.toUpperCase()) {
          forceSwitch = true;
          break;
        }
      } else if (direction === 'descending') {
        if (x.innerText.toUpperCase() < y.innerText.toUpperCase()) {
          forceSwitch = true;
          break;
        }
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      count++;
    } else {
      if (count === 0 && direction === 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}
// Function to help sort prices, volumes, and cap.
function priceSortColumn(a) {
  var switching = true;
  var count = 0;
  var direction = 'ascending';
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var forceSwitch = false;
      var x = rows[i].getElementsByTagName('TD')[a];
      var y = rows[i + 1].getElementsByTagName('TD')[a];
      if (direction === 'ascending') {
        if (x.innerText.slice(1, 15) * 1000000 > y.innerText.slice(1, 15) * 1000000) {
          forceSwitch = true;
          break;
        }
      } else if (direction === 'descending') {
        if (x.innerText.slice(1, 15) * 1000000 < y.innerText.slice(1, 15) * 1000000) {
          forceSwitch = true;
          break;
        }
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      count++;
    } else {
      if (count === 0 && direction === 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}
// Function to help sort the Ranks
function rankSortColumn(a) {
  var switching = true;
  var count = 0;
  var direction = 'ascending';
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var forceSwitch = false;
      var x = rows[i].getElementsByTagName('TD')[a];
      var y = rows[i + 1].getElementsByTagName('TD')[a];
      if (direction === 'ascending') {
        if (x.innerText * 100 > y.innerText * 100) {
          forceSwitch = true;
          break;
        }
      } else if (direction === 'descending') {
        if (x.innerText * 100 < y.innerText * 100) {
          forceSwitch = true;
          break;
        }
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      count++;
    } else {
      if (count === 0 && direction === 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}
// Function to help sort the %'s.
function percentSortColumn(a) {
  var switching = true;
  var count = 0;
  var direction = 'ascending';
  while (switching) {
    switching = false;
    var rows = $table.rows;
    for (var i = 1; i < (rows.length - 1); i++) {
      var forceSwitch = false;
      var x = rows[i].getElementsByTagName('TD')[a];
      var y = rows[i + 1].getElementsByTagName('TD')[a];
      if (direction === 'ascending') {
        if (parseFloat(x.innerText) > parseFloat(y.innerText)) {
          forceSwitch = true;
          break;
        }
      } else if (direction === 'descending') {
        if (parseFloat(x.innerText) < parseFloat(y.innerText)) {
          forceSwitch = true;
          break;
        }
      }
    }
    if (forceSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      count++;
    } else {
      if (count === 0 && direction === 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}

// Function to create DOM tree when crypto is clicked
function createClick(n) {
  var div = document.createElement('div');
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'flex space-evenly');
  var divBack = document.createElement('div');
  divBack.setAttribute('class', 'align-center');
  var iBack = document.createElement('i');
  iBack.setAttribute('class', 'fas fa-arrow-alt-circle-left fa-3x');
  iBack.setAttribute('id', 'returnButton');
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'align-center');
  var divTwoImage = document.createElement('img');
  divTwoImage.setAttribute('src', coinSaves[n].icon);
  divTwoImage.setAttribute('class', 'align-center symbol-clicked');
  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'align-center');
  var firsth1 = document.createElement('h1');
  firsth1.textContent = coinSaves[n].name;
  var firsth3 = document.createElement('h3');
  firsth3.textContent = coinSaves[n].symbol;
  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'align-center');
  var secondh3 = document.createElement('h3');
  secondh3.textContent = '$' + Math.ceil(coinSaves[n].price * 100) / 100;
  var thirdh3 = document.createElement('h3');
  thirdh3.textContent = coinSaves[n].priceChange1d + '%';
  var divFive = document.createElement('div');
  divFive.setAttribute('class', 'symbol-container');
  var a1 = document.createElement('a');
  a1.setAttribute('href', coinSaves[n].twitterUrl);
  a1.setAttribute('class', 'margin-right-sm');
  var a2 = document.createElement('a');
  a2.setAttribute('href', coinSaves[n].exp[0]);
  a2.setAttribute('class', 'margin-right-sm');
  var a3 = document.createElement('a');
  a3.setAttribute('href', coinSaves[n].websiteUrl);
  a3.setAttribute('class', 'margin-right-sm');
  var iOne = document.createElement('i');
  iOne.setAttribute('class', 'fab fa-twitter clicked-logos fa-4x margin-right-sm');
  var iTwo = document.createElement('i');
  iTwo.setAttribute('class', 'fas fa-list fa-4x margin-right-sm');
  var iThree = document.createElement('i');
  iThree.setAttribute('class', 'fas fa-external-link-alt fa-4x margin-right-sm');
  var divSix = document.createElement('div');
  divSix.setAttribute('class', 'body flex flex-wrap justify-center');
  var divSeven = document.createElement('div');
  divSeven.setAttribute('class', 'graph flex justify-center');
  var graph = document.createElement('img');
  graph.setAttribute('src', '/images/Amazon_1.png');
  var pOne = document.createElement('p');
  pOne.setAttribute('class', 'padding-left-sm');
  pOne.textContent = 'Market Cap: ' + Math.ceil(coinSaves[n].marketCap * 100) / 100;
  var pTwo = document.createElement('p');
  pTwo.setAttribute('class', 'padding-left-sm');
  pTwo.textContent = 'Price Change (1H): ' + coinSaves[n].priceChange1h + '%';
  var pThree = document.createElement('p');
  pThree.setAttribute('class', 'padding-left-sm');
  pThree.textContent = 'Price Change (24H): ' + coinSaves[n].priceChange1d + '%';
  var pFour = document.createElement('p');
  pFour.setAttribute('class', 'padding-left-sm');
  pFour.textContent = 'Price Change (7D): ' + coinSaves[n].priceChange1w + '%';
  var pFive = document.createElement('p');
  pFive.setAttribute('class', 'padding-left-sm');
  pFive.textContent = 'Rank: ' + coinSaves[n].rank;
  var pSix = document.createElement('p');
  pSix.setAttribute('class', 'padding-left-sm');
  pSix.textContent = 'Max Supply Available: ' + coinSaves[n].totalSupply + ' ' + coinSaves[n].symbol;

  div.appendChild(divOne);
  div.appendChild(divSix);
  div.appendChild(divSeven);
  divBack.appendChild(iBack);
  divOne.appendChild(divBack);
  divOne.appendChild(divTwo);
  divOne.appendChild(divThree);
  divOne.appendChild(divFour);
  divOne.appendChild(divFive);
  divTwo.appendChild(divTwoImage);
  divThree.appendChild(firsth1);
  divThree.appendChild(firsth3);
  divFour.appendChild(secondh3);
  divFour.appendChild(thirdh3);
  a1.appendChild(iOne);
  a2.appendChild(iTwo);
  a3.appendChild(iThree);
  divFive.appendChild(a1);
  divFive.appendChild(a2);
  divFive.appendChild(a3);
  divSix.appendChild(pOne);
  divSix.appendChild(pTwo);
  divSix.appendChild(pThree);
  divSix.appendChild(pFour);
  divSix.appendChild(pFive);
  divSix.appendChild(pSix);
  divSeven.appendChild(graph);

  return div;
}

$ret.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-arrow-alt-circle-left fa-3x') {
    // console.log('SUCCESS!');
    $tableView.className = 'container hiddenInMobile';
    $cryptoView.className = 'cryptoHide';
    document.location.reload();
  }
  // console.log('Event logged: ', event.target.className);
});

// When the window loads, will load the coinstatRequest function.
window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
});

// Create addEventListener of Desktop Cancel Button
$cancelDesktopButton.addEventListener('click', function (event) {
  $modal.className = 'modalContainerOff';
  document.querySelector('#desktopForm').reset();
});

// Created addEventListener for clicking on a crypto for more info
$queries.addEventListener('click', function (event) {
  var testing;
  if (event.target.id === 'bitcoin') {
    testing = createClick(0);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Bitcoin clicked!');
  }
  if (event.target.id === 'ethereum') {
    testing = createClick(1);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Ethereum clicked!');
  }

  if (event.target.id === 'tether') {
    testing = createClick(2);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Tether clicked!');
  }

  if (event.target.id === 'binance-coin') {
    testing = createClick(3);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Binance-coin clicked!');
  }

  if (event.target.id === 'cardano') {
    testing = createClick(4);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Cardano clicked!');
  }

  if (event.target.id === 'dogecoin') {
    testing = createClick(5);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('DOGE clicked!');
  }

  if (event.target.id === 'ripple') {
    testing = createClick(6);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('XRP clicked!');
  }

  if (event.target.id === 'usd-coin') {
    testing = createClick(7);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('usd-coin clicked!');
  }

  if (event.target.id === 'polkadot') {
    testing = createClick(8);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Polka clicked!');
  }

  if (event.target.id === 'bitcoin-cash') {
    testing = createClick(9);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
  // console.log('Bitcoin-cash clicked!');
  }

  if (event.target.id === 'uniswap') {
    testing = createClick(10);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
  // console.log('Uni clicked!');
  }
  if (event.target.id === 'litecoin') {
    testing = createClick(11);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);

    // console.log('Lite clicked!');
  }

  if (event.target.id === 'solana') {
    testing = createClick(12);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
    // console.log('Solana clicked!');
  }

  if (event.target.id === 'binance-usd') {
    testing = createClick(13);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
  // console.log('Binance clicked!');
  }

  if (event.target.id === 'chainlink') {
    testing = createClick(14);
    $tableView.className = 'tableHide';
    $appendCrypto.append(testing);
  // console.log('Chain clicked!');
  }
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

// Next several sorts are listeners to help sort the table.
$sortRank.addEventListener('click', function (event) {
  rankSortColumn(0);
});
$sortName.addEventListener('click', function (event) {
  nameSortColumn(1);
});
$sortPrice.addEventListener('click', function (event) {
  priceSortColumn(2);
});
$sortVolume.addEventListener('click', function (event) {
  priceSortColumn(3);
});
$sortCap.addEventListener('click', function (event) {
  priceSortColumn(4);
});
$sort1h.addEventListener('click', function (event) {
  percentSortColumn(5);
});
$sort24h.addEventListener('click', function (event) {
  percentSortColumn(6);
});
$sort7d.addEventListener('click', function (event) {
  percentSortColumn(7);
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
