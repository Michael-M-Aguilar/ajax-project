/* exported data */
var data = {
  entries: [],
  editing: null,
  nextEntryId: 1,
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
