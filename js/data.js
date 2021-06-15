/* exported data */
var data = {
  entries: []
  // currentCoin: ''
};

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

// 1) Create Data Object that has a list of all the coins we have.
// Compare the coin vs attribute of the clicked === data.coinId
// Update correct entry.
// So when you click on the note, you need to loop through the entries and find the one with the proper coinId
// then assign that note to the value property of the text area
