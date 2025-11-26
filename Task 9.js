// 2D Array
// Create a function called highestRunScorer that will
// Receive a 2d array called playersInfo
// Based on highest score, return the name of the player

function highestRunScorer(playersInfo) {
  var highestScorer = playersInfo[0][0];
  var highestScore = playersInfo[0][1];

  for (var x = 1; x < playersInfo.length; x++) {
    if (highestScore < playersInfo[x][1]) {
      highestScore = playersInfo[x][1];
      highestScorer = playersInfo[x][0];
    }
  }

  return highestScorer;
}

var playersInfo = [
   ["Sakib",95],
    ["Mashrafe",40],
    ["Mushfique",20],
    ["Tamim",180],
    ["Miraz",30]
];

var names = highestRunScorer(playersInfo);
console.log(names);