/* exported data */
var data = {
  entries: [],
  currentCoin: ''
};

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

// STEPS!!!!
// 1. onAPI success, call createCoinEntries()
// 2. on editIcon click, call viewCoinNoteEntry()
// 3. on save,  call updateCoinEntry()
