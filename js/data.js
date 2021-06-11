/* exported data */
var data = {
  view: '',
  entries: [],
  editing: null
};

var toJSON = localStorage.getItem('local-storage');
if (toJSON !== null) {
  data = JSON.parse(toJSON);
}

window.addEventListener('beforeunload', function (event) {
  var toJSONOld = JSON.stringify(data);
  localStorage.setItem('local-storage', toJSONOld);
});
