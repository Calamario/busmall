'use strict';

var merch1, merch2, merch3;

var merch1Img = document.getElementById('firstMerchImg');
var merch2Img = document.getElementById('secondMerchImg');
var merch3Img = document.getElementById('thirdMerchImg');

var voteButton1 = document.getElementById('vote-button-1');
var voteButton2 = document.getElementById('vote-button-2');
var voteButton3 = document.getElementById('vote-button-3');

var voteCounter = 0;

var mainEl = document.getElementById('mainElement');
var sectionEl = document.createElement('section');
sectionEl.id = 'resultSection';

function Merch(name, url, id) {
  this.name = name;
  this.url = url;
  this.id = id;
  this.voted = 0;
  this.appeared = 0;
  this.voteRatio = 0;
}

var allMerch = [
  new Merch('R2-D2 Bag', 'img/bag.jpg', 'bag'),
  new Merch('Banana Cutter', 'img/banana.jpg', 'banana'),
  new Merch('Restroom iPad Holder', 'img/bathroom.jpg', 'bathroom'),
  new Merch('Sandle Boots', 'img/boots.jpg', 'boot'),
  new Merch('Breakfast Machine', 'img/breakfast.jpg', 'breakfast'),
  new Merch('Meatball Gum', 'img/bubblegum.jpg', 'bubblegum'),
  new Merch('Bump Chair', 'img/chair.jpg', 'chair'),
  new Merch('Action-hulhu', 'img/cthulhu.jpg', 'cthulhu'),
  new Merch('Buack!', 'img/dog-duck.jpg', 'dog-duck'),
  new Merch('Dragon Meat', 'img/dragon.jpg', 'dragon'),
  new Merch('Speen', 'img/pen.jpg', 'pen'),
  new Merch('Pet-cuum', 'img/pet-sweep.jpg', 'pet-sweep'),
  new Merch('Pizza Scissors', 'img/scissors.jpg', 'scissors'),
  new Merch('Rest in Shark', 'img/shark.jpg', 'shark'),
  new Merch('Infant-cuum', 'img/sweep.png', 'sweep'),
  new Merch('Tauntaun', 'img/tauntaun.jpg', 'tauntaun'),
  new Merch('Unicorn Meat', 'img/unicorn.jpg', 'unicorn'),
  new Merch('OctopUSB', 'img/usb.gif', 'usb'),
  new Merch('Penrose Can', 'img/water-can.jpg', 'water-can'),
  new Merch('Wine Pod', 'img/wine-glass.jpg', 'wine-glass'),
];

function pickNewMerch() {
  merch1 = allMerch[Math.floor(Math.random() * allMerch.length )];
  merch1.appeared++;
  merch1Img.src = merch1.url;
  // merch1Img.id = merch1Img.id;
  do {
    merch2 = allMerch[Math.floor(Math.random() * allMerch.length )];
  } while (merch1 === merch2);
  merch2.appeared++;
  merch2Img.src = merch2.url;
  do {
    merch3 = allMerch[Math.floor(Math.random() * allMerch.length )];
  } while (merch3 === merch1 || merch3 === merch2);
  merch3.appeared++;
  merch3Img.src = merch3.url;
}
pickNewMerch();

// function createResults() {
//   if (voteCounter >= 25) {
//     for(var i = 0; i > allMerch.length; i++) {
//       var pEl = document.createElement('p');
      
//     }  
//   }
// }

voteButton1.addEventListener('click', function(e) {
  merch1.voted++;
  pickNewMerch();
  voteCounter++;
});

voteButton2.addEventListener('click', function(e) {
  merch2.voted++;
  pickNewMerch();
  voteCounter++;
});

voteButton3.addEventListener('click', function(e) {
  merch3.voted++;
  pickNewMerch();
  voteCounter++;
});

