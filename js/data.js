/* exported data */
var data = {
  entries: [
    {
      coin: 'bitcoin',
      textContent: ' '
    },
    {
      coin: 'ethereum',
      textContent: ' '
    },
    {
      coin: 'tether',
      textContent: ' '
    },
    {
      coin: 'binance-coin',
      textContent: ' '
    },
    {
      coin: 'cardano',
      textContent: ' '
    },
    {
      coin: 'dogecoin',
      textContent: ' '
    },
    {
      coin: 'XRP',
      textContent: ' '
    }
  ]
};
  // ^^^ hardcoded objects
  // dynamically add objects from API in main JS, function that runs on API Success

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
