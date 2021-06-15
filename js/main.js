// Declare a variable to append my DOM tree too.
var $appended = document.querySelector('.appended');
var $mobileAppended = document.querySelector('.mobileAppended');
var $toggleModalOn = document.querySelector('.toggleModalOn');
var $modal = document.getElementById('modal');
var $cancelDesktopButton = document.querySelector('#cancelDesktopModal');
// var $save = document.getElementById('saveDesktopModal')
var $desktopNotes = document.querySelector('#desktopNotes');
var $desktopForm = document.querySelector('#desktopForm');
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
  var tdNineSticky = document.createElement('i');
  tdNineSticky.setAttribute('class', 'toggleModalOn fas fa-sticky-note paddingForTable');
  tdNineSticky.setAttribute('id', element.id);
  tdNineSticky.setAttribute('coin-name', element.id);

  // if (element.priceChange1h > 0) {
  //   tdSix.className = 'tendies';
  // } else {
  //   tdSix.className = 'losses';
  // }

  // if (element.priceChange1d > 0) {
  //   tdSeven.className = 'tendies';
  // } else {
  //   tdSeven.className = 'losses';
  // }

  // if (element.priceChange1w > 0) {
  //   tdEight.className = 'tendies';
  // } else {
  //   tdEight.className = 'losses';
  // }

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

  divOne.appendChild(divTwo);
  divTwo.appendChild(imgOne);
  divOne.appendChild(divThree);
  divThree.appendChild(h3One);
  divThree.appendChild(h3Two);
  divOne.appendChild(divFour);
  divFour.appendChild(h3Three);
  divFour.appendChild(h3Four);
  return divOne;
}
// FOR FUTURE USEEEEE!!!!!
// Function to create data entries for coins
// function createCoinEntries() {
// 1) Create Data Object that has a list of all the coins we have.
// push each coin object into data.entries arr
// }

// Function to update data entry

// function viewCoinNoteEntry() {
// need to show the current note's content
// check data.entries[i].coin === coin attribute from DOM tree.
// if ===, show data.entries[i].textContent (append to DOM)

// }

// function updateCoinNoteEntry() {

// Compare the coin vs attribute of the clicked === data.coinId to update correct entry.

// for loop data.entries
// check data.entries[i].coin === coin attribute from DOM tree.
// if ===, update textContent
// data.entries[0].textContent = "new note information"

// TL;DR
// So when you click on the note, you need to loop through the entries and find the one with the proper coinId
// then assign that note to the value property of the text area

// }
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
      // console.log(xhr.response);
    }
  });
  xhr.send();
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
// When the window loads, will load the coinstatRequest function.
window.addEventListener('DOMContentLoaded', function (event) {
  coinstatRequest();
  // console.log('after function runs;')
  // var trial = document.querySelectorAll('#nodeList')
  // console.log('after var declaration')
  // console.log(trial)
  // for(var i = 0; i < trial.length; i++) {
  //   console.log('for loop worked!')
  //   if(parseInt(trial[i]) > 0) {
  //     trial[i].className = 'tendies'
  //   } else {
  //     console.log('broken')
  //   }
  // }
});
// When the window loads, will load the mobileCoinStatRequest function
window.addEventListener('DOMContentLoaded', function (event) {
  mobileCoinStatRequest();
});

// Create addEventListener  for the sticky note click.
$toggleModalOn.addEventListener('click', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.currentCoin === data.entries[i].coinID) {
      data.entries[i].note = $desktopNotes.value;
    }
  }
  if (event.target.tagName === 'I') {
    $modal.className = 'modalContainerOn';
    data.currentCoin = event.target.getAttribute('id');
  }
});
// Create addEventListener of Cancel Button
$cancelDesktopButton.addEventListener('click', function (event) {
  $desktopForm.reset();
  $modal.className = 'modalContainerOff';
});
// Desktop Submit?
$desktopForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formData = {
    note: $desktopNotes.value,
    // noteID: data.nextEntryId,
    coinID: data.currentCoin
  };
  if (formData.note !== '') {
    data.entries.unshift(formData);
    data.nextEntryId++;
  }

  // if (data.currentCoin !== '') {
  //   console.log('value of formData:', formData);
  //   console.log('coindID upon submission:', formData.coinID);
  //   console.log('Value of note:', formData.note);
  //   console.log('Value of Coin:', data.currentCoin);
  //   console.log('value of all data.entries:', data.entries);
  //   console.log('index 0:', data.entries[0]);
  // }
});
