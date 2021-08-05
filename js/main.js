var coinSaves;
let index;
var $appended = document.querySelector('.appended');
var $appendCrypto = document.querySelector('.append-crypto');
var $appendMobileP = document.querySelector('.append-mpage');
var $mobileAppended = document.querySelector('.mobile-appended');
var $toggleModalOn = document.querySelector('.toggle-modal-on');
var $toggleMobileModal = document.querySelector('.toggle-mobile-modal-on');
var $modal = document.getElementById('modal');
var $tableView = document.getElementById('tableView');
var $mobileView = document.getElementById('mobileView');
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
var $sortCap = document.querySelector('.sort-cap');
var $sort1h = document.querySelector('.sort-1h');
var $sort24h = document.querySelector('.sort-24h');
var $sort7d = document.querySelector('.sort-7d');
var $queries = document.querySelector('.query-page');
var $cryptoView = document.getElementById('cryptoView');
var $mobileCryptoView = document.getElementById('mobileCryptoView');
var $spinner = document.querySelector('.spinner');
var $mspinner = document.querySelector('.mspinner');

function renderElements(element) {
  var trAppended = document.createElement('tr');
  trAppended.setAttribute('class', 'hovered');
  var tdOne = document.createElement('td');
  tdOne.setAttribute('class', 'numbers padding-for-table clickable');
  tdOne.setAttribute('id', element.id);
  tdOne.textContent = element.rank;
  var divOne = document.createElement('div');
  var tdOneImage = document.createElement('img');
  tdOneImage.setAttribute('src', element.icon);
  tdOneImage.setAttribute('class', 'logos clickable');
  tdOneImage.setAttribute('id', element.id);
  var tdTwo = document.createElement('td');
  tdTwo.setAttribute('class', 'letters padding-for-table clickable');
  tdTwo.setAttribute('id', element.id);
  tdTwo.textContent = element.name;
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'letters padding-for-table clickable');
  divTwo.setAttribute('id', element.id);
  divTwo.textContent = element.symbol;
  var tdThree = document.createElement('td');
  tdThree.setAttribute('class', 'numbers text-align-center padding-for-table clickable');
  tdThree.setAttribute('id', element.id);
  tdThree.textContent = '$' + Math.ceil(element.price * 100) / 100;
  var tdFive = document.createElement('td');
  tdFive.setAttribute('class', 'numbers text-align-center padding-for-table clickable');
  tdFive.setAttribute('id', element.id);
  tdFive.textContent = '$' + Math.ceil(element.marketCap * 100) / 100;
  var tdSix = document.createElement('td');
  tdSix.setAttribute('id', element.id);
  tdSix.textContent = element.priceChange1h + '%';
  var tdSeven = document.createElement('td');
  tdSeven.setAttribute('id', element.id);
  tdSeven.textContent = element.priceChange1d + '%';
  var tdEight = document.createElement('td');
  tdEight.setAttribute('id', element.id);
  tdEight.textContent = element.priceChange1w + '%';
  var tdNine = document.createElement('td');
  tdNine.setAttribute('id', element.id);
  var tdNineSticky = document.createElement('i');
  tdNineSticky.setAttribute('class', 'toggle-modal-on fas fa-sticky-note margin-left-sm');
  tdNineSticky.setAttribute('id', element.id);

  if (element.priceChange1h === 0) {
    tdSix.className = 'numbers text-align-center neutral clickable';
  } else if (element.priceChange1h > 0) {
    tdSix.className = 'numbers text-align-center tendies clickable';
  } else {
    tdSix.className = 'numbers text-align-center losses clickable';
  }

  if (element.priceChange1d === 0) {
    tdSeven.className = 'neutral numbers text-align-center padding-for-table clickable';
  } else if (element.priceChange1d > 0) {
    tdSeven.className = 'tendies numbers text-align-center padding-for-table clickable';
  } else {
    tdSeven.className = 'losses numbers text-align-center padding-for-table clickable';
  }

  if (element.priceChange1w === 0) {
    tdEight.className = 'neutral numbers text-align-center padding-for-table clickable';
  } else if (element.priceChange1w > 0) {
    tdEight.className = 'tendies numbers text-align-center padding-for-table clickable';
  } else {
    tdEight.className = 'losses numbers text-align-center padding-for-table clickable';
  }
  trAppended.appendChild(tdOne);
  tdOne.appendChild(tdOneImage);
  tdOne.appendChild(divOne);
  divOne.appendChild(tdOneImage);
  tdTwo.appendChild(divTwo);
  trAppended.appendChild(tdTwo);
  trAppended.appendChild(tdThree);
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
  xhr.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=15&currency=USD');
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('error', function () {
    'Sorry, there was an error connecting to the network. Please check your internet connection once again.';
  });
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.coins.length; i++) {
      var test = renderElements(xhr.response.coins[i]);
      $appended.append(test);
    }
    $spinner.style.display = 'none';
    coinSaves = xhr.response.coins;
  });
  xhr.send();
}

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

function createClick(n) {
  var div = document.createElement('div');
  div.setAttribute('id', 'removed');
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'flex space-around padding-top-med');
  var divBack = document.createElement('div');
  divBack.setAttribute('class', 'align-center');
  var iBack = document.createElement('i');
  iBack.setAttribute('class', 'fas fa-arrow-alt-circle-left fa-3x');
  iBack.setAttribute('id', 'returnButton');
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'align-center');
  var divTwoImage = document.createElement('img');
  divTwoImage.setAttribute('src', coinSaves[index].icon);
  divTwoImage.setAttribute('class', 'align-center symbol-clicked indiv-hover');
  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'align-center');
  var firsth1 = document.createElement('h1');
  firsth1.setAttribute('class', 'letters indiv-hover');
  firsth1.textContent = coinSaves[index].name;
  var firsth3 = document.createElement('h3');
  firsth3.textContent = coinSaves[index].symbol;
  firsth3.setAttribute('class', 'letters indiv-hover');
  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'align-center');

  var secondh3 = document.createElement('h3');
  secondh3.textContent = '$' + Math.ceil(coinSaves[index].price * 100) / 100;
  secondh3.setAttribute('class', 'numbers indiv-hover');
  var thirdh3 = document.createElement('h3');
  thirdh3.textContent = coinSaves[index].priceChange1d + '%';

  var divFive = document.createElement('div');
  divFive.setAttribute('class', 'symbol-container');
  var a1 = document.createElement('a');
  if (coinSaves[index].twitterUrl) {
    a1.setAttribute('href', coinSaves[index].twitterUrl);
    a1.setAttribute('class', 'margin-right-sm');
  } else {
    a1.setAttribute('class', 'margin-right-sm');
  }
  var a2 = document.createElement('a');
  if (coinSaves[index].exp[0]) {
    a2.setAttribute('href', coinSaves[index].exp[0]);
    a2.setAttribute('class', 'margin-right-sm');
  } else {
    a2.setAttribute('class', 'margin-right-sm');
  }
  var a3 = document.createElement('a');
  if (coinSaves[index].websiteUrl) {
    a3.setAttribute('href', coinSaves[index].websiteUrl);
    a3.setAttribute('class', 'margin-right-sm');
  } else {
    a3.setAttribute('class', 'margin-right-sm');
  }
  var iOne = document.createElement('i');
  iOne.setAttribute('class', 'fab fa-twitter clicked-logos fa-4x margin-right-sm indiv-hover');
  var iTwo = document.createElement('i');
  iTwo.setAttribute('class', 'fas fa-list fa-4x margin-right-sm indiv-hover');
  var iThree = document.createElement('i');
  iThree.setAttribute('class', 'fas fa-external-link-alt fa-4x margin-right-sm indiv-hover');
  var divSix = document.createElement('div');
  divSix.setAttribute('class', 'body flex flex-wrap justify-center click-bot-top-pad');
  var divSeven = document.createElement('div');
  divSeven.setAttribute('class', 'graph flex justify-center padding-bot-med');

  var spanOne = document.createElement('span');
  spanOne.textContent = coinSaves[index].priceChange1h + '%';
  var spanTwo = document.createElement('span');
  spanTwo.textContent = coinSaves[index].priceChange1d + '%';
  var spanThree = document.createElement('span');
  spanThree.textContent = coinSaves[index].priceChange1w + '%';
  var spanFour = document.createElement('span');
  spanFour.textContent = Math.ceil(coinSaves[index].marketCap * 100) / 100;
  spanFour.setAttribute('class', 'numbers');
  var spanFive = document.createElement('span');
  spanFive.setAttribute('class', 'numbers');
  spanFive.textContent = coinSaves[index].rank;
  var spanSix = document.createElement('span');
  if (coinSaves[index].totalSupply !== 0) {
    spanSix.setAttribute('class', 'numbers');
    spanSix.textContent = coinSaves[index].totalSupply + ' ' + coinSaves[index].symbol;
  } else {
    spanSix.setAttribute('class', 'letters');
    spanSix.textContent = 'No Max-Supply known for the time being.';
  }

  var pOne = document.createElement('p');
  pOne.setAttribute('class', 'padding-left-med letters indiv-hover');
  pOne.textContent = 'Market Cap: ';
  var pTwo = document.createElement('p');
  pTwo.setAttribute('class', 'padding-left-med letters indiv-hover');
  pTwo.textContent = 'Price Change (1H): ';
  var pThree = document.createElement('p');
  pThree.setAttribute('class', 'padding-left-med letters indiv-hover');
  pThree.textContent = 'Price Change (24H): ';
  var pFour = document.createElement('p');
  pFour.setAttribute('class', 'padding-left-med letters indiv-hover');
  pFour.textContent = 'Price Change (7D): ';
  var pFive = document.createElement('p');
  pFive.setAttribute('class', 'padding-left-med letters indiv-hover');
  pFive.textContent = 'Rank: ';
  var pSix = document.createElement('p');
  pSix.setAttribute('class', 'padding-left-med letters indiv-hover');
  pSix.textContent = 'Max Supply Available: ';

  pOne.appendChild(spanFour);
  pTwo.appendChild(spanOne);
  pThree.appendChild(spanTwo);
  pFour.appendChild(spanThree);
  pFive.appendChild(spanFive);
  pSix.appendChild(spanSix);

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

  if (coinSaves[index].priceChange1h === 0) {
    spanOne.className = 'neutral';
  } else if (coinSaves[index].priceChange1h > 0) {
    spanOne.className = 'tendies';
  } else {
    spanOne.className = 'losses';
  }

  if (coinSaves[index].priceChange1d === 0) {
    spanTwo.className = 'neutral';
    thirdh3.className = 'neutral numbers indiv-hover';
  } else if (coinSaves[index].priceChange1d > 0) {
    spanTwo.className = 'tendies';
    thirdh3.className = 'header-tendies numbers indiv-hover';
  } else {
    spanTwo.className = 'losses';
    thirdh3.className = 'losses numbers indiv-hover';
  }

  if (coinSaves[index].priceChange1w === 0) {
    spanThree.className = 'neutral';
  } else if (coinSaves[index].priceChange1w > 0) {
    spanThree.className = 'tendies';
  } else {
    spanThree.className = 'losses';
  }

  return div;
}

window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
});

$cancelDesktopButton.addEventListener('click', function (event) {
  $modal.className = 'modal-container-off';
  document.querySelector('#desktopForm').reset();
});

function idMatcher() {
  for (var i = 0; i < coinSaves.length; i++) {
    if (event.target.id === coinSaves[i].id) {
      index = i;
      return index;
    }
  }
}

$queries.addEventListener('click', function (event) {
  if (event.target.id && event.target.tagName !== 'I') {
    idMatcher();
    $tableView.className = 'table-hide';
    $appendCrypto.append(createClick(index));
  }
});

$cryptoView.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-arrow-alt-circle-left fa-3x') {
    $tableView.className = 'container hidden-in-mobile';
    while ($cryptoView.firstChild) {
      $cryptoView.removeChild($cryptoView.firstChild);
    }
  }
});

$toggleModalOn.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $modal.className = 'modal-container-on';
    data.currentCoin = event.target.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.currentCoin === data.entries[i].coinID) {
        $desktopNotes.value = data.entries[i].note;
      }
    }
  }
});

$desktopForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    note: $desktopNotes.value,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.push(formData);
  }
  $modal.className = 'modal-container-off';
  document.querySelector('#desktopForm').reset();
});

$sortRank.addEventListener('click', function (event) {
  rankSortColumn(0);
});
$sortName.addEventListener('click', function (event) {
  nameSortColumn(1);
});
$sortPrice.addEventListener('click', function (event) {
  priceSortColumn(2);
});
$sortCap.addEventListener('click', function (event) {
  priceSortColumn(3);
});
$sort1h.addEventListener('click', function (event) {
  percentSortColumn(4);
});
$sort24h.addEventListener('click', function (event) {
  percentSortColumn(5);
});
$sort7d.addEventListener('click', function (event) {
  percentSortColumn(6);
});

function mobileRenderElements(mobileElement) {
  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'flex justify-center selector');
  divOne.setAttribute('id', mobileElement.id);
  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'mobile-selector align-center padding-left');
  divTwo.setAttribute('id', mobileElement.id);
  var imgOne = document.createElement('img');
  imgOne.setAttribute('class', 'mobile-logo');
  imgOne.setAttribute('src', mobileElement.icon);
  imgOne.setAttribute('id', mobileElement.id);
  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'mobile-selector align-center padding-left');
  divThree.setAttribute('id', mobileElement.id);
  var h3One = document.createElement('h3');
  h3One.setAttribute('class', 'letters');
  h3One.setAttribute('id', mobileElement.id);
  h3One.textContent = mobileElement.symbol;
  var h3Two = document.createElement('h3');
  h3Two.setAttribute('class', 'letters');
  h3Two.setAttribute('id', mobileElement.id);
  h3Two.textContent = mobileElement.name;
  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'mobile-selector align-center padding-left padding-bottom');
  divFour.setAttribute('id', mobileElement.id);
  var h3Three = document.createElement('h3');
  h3Three.setAttribute('class', 'numbers');
  h3Three.setAttribute('id', mobileElement.id);
  h3Three.textContent = '$' + Math.ceil(mobileElement.price * 100) / 100;
  var h3Four = document.createElement('h3');
  h3Four.setAttribute('class', 'numbers');
  h3Four.setAttribute('id', mobileElement.id);
  h3Four.textContent = mobileElement.priceChange1d + '%';
  var tdSticky = document.createElement('i');
  tdSticky.setAttribute('class', 'toggle-modal-on fas fa-sticky-note padding-for-table');
  tdSticky.setAttribute('id', mobileElement.id);

  if (mobileElement.priceChange1d === 0) {
    h3Four.className = 'mobile-neutral';
  } else if (mobileElement.priceChange1d > 0) {
    h3Four.className = 'mobile-tendies';
  } else {
    h3Four.className = 'mobile-losses';
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

function mobileCoinStatRequest() {
  var xhrm = new XMLHttpRequest();
  xhrm.open('GET', 'https://api.coinstats.app/public/v1/coins?skip=0&limit=15&currency=USD');
  xhrm.setRequestHeader('token', 'abc123');
  xhrm.responseType = 'json';
  xhrm.addEventListener('error', function () {
    'Sorry, there was an error connecting to the network. Please check your internet connection once again.';
  });
  xhrm.addEventListener('load', function () {
    for (var i = 0; i < xhrm.response.coins.length; i++) {
      var test = mobileRenderElements(xhrm.response.coins[i]);
      $mobileAppended.append(test);
    }
    $mspinner.style.display = 'none';
  });
  xhrm.send();
}

window.addEventListener('DOMContentLoaded', function (event) {
  mobileCoinStatRequest();
});

$cancelMobileButton.addEventListener('click', function (event) {
  if (event.target.id === 'cancelMobileModal') {
    $mobileModal.className = 'mobile-modal-container-off';
    document.querySelector('#mobileForm').reset();
  }
});

$toggleMobileModal.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $mobileModal.className = 'mobile-modal-container-on';
    data.currentCoin = event.target.getAttribute('id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.currentCoin === data.entries[i].coinID) {
        $mobileNotes.value = data.entries[i].note;
      }
    }
  }
});

$mobileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    note: $mobileNotes.value,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.push(formData);
  }
  $mobileModal.className = 'mobile-modal-container-off';
});

$mobileAppended.addEventListener('click', function (event) {
  if (event.target.id && event.target.tagName !== 'I') {
    if (event.target.id !== 'cancelMobileModal') {
      idMatcher();
      $mobileView.className = 'table-hide';
      $appendMobileP.append(createClick(index));
    }
  }
});

$mobileCryptoView.addEventListener('click', function (event) {
  if (event.target.className === 'fas fa-arrow-alt-circle-left fa-3x') {
    $mobileView.className = 'container hidden-in-desktop';
    while ($mobileCryptoView.firstChild) {
      $mobileCryptoView.removeChild($mobileCryptoView.firstChild);
    }
  }
});
