/* exported data */
var noteEntry = {
  entries: [],
  editing: null
};

var toJSON = localStorage.getItem('local-storage');
if (toJSON !== null) {
  noteEntry = JSON.parse(toJSON);
}

window.addEventListener('beforeunload', function (event) {
  var toJSONOld = JSON.stringify(noteEntry);
  localStorage.setItem('local-storage', toJSONOld);
});
