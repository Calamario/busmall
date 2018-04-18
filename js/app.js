'use strict';

Merch.mainEl = document.getElementById('mainElement');
Merch.sectionEl = document.getElementById('choicesContainer');
Merch.testIsDoneEl = document.getElementById('testIsDone');
Merch.olEl = document.getElementById('resultsList');

// How many merch do you want to show for the q?
Merch.numOfMerchDisplayed = 3;

Merch.arrayOfMerchImg = ['firstMerchImg', 'secondMerchImg', 'thirdMerchImg'];

Merch.maxVoteCount = 25;
Merch.voteCounter = 0;

Merch.allMerch = [];

Merch.lastDisplyed = [];

function Merch(name, url, id) {
  this.name = name;
  this.url = url;
  this.id = id;
  this.voted = 0;
  this.appeared = 0;
  this.votePercent = 0;
  Merch.allMerch.push(this);
}

Merch.prototype.calculatePercent = function () {
  var ratio = (this.voted / this.appeared);
  this.votePercent = Math.round(ratio * 100);
};

new Merch('R2-D2 Bag', 'img/bag.jpg', 'bag');
new Merch('Banana Cutter', 'img/banana.jpg', 'banana');
new Merch('Restroom iPad Holder', 'img/bathroom.jpg', 'bathroom');
new Merch('Sandle Boots', 'img/boots.jpg', 'boot');
new Merch('Breakfast Machine', 'img/breakfast.jpg', 'breakfast');
new Merch('Meatball Gum', 'img/bubblegum.jpg', 'bubblegum');
new Merch('Bump Chair', 'img/chair.jpg', 'chair');
new Merch('Action-hulhu', 'img/cthulhu.jpg', 'cthulhu');
new Merch('Buack!', 'img/dog-duck.jpg', 'dog-duck');
new Merch('Dragon Meat', 'img/dragon.jpg', 'dragon');
new Merch('Speen', 'img/pen.jpg', 'pen');
new Merch('Pet-cuum', 'img/pet-sweep.jpg', 'pet-sweep');
new Merch('Pizza Scissors', 'img/scissors.jpg', 'scissors');
new Merch('Rest in Shark', 'img/shark.jpg', 'shark');
new Merch('Infant-cuum', 'img/sweep.png', 'sweep');
new Merch('Tauntaun', 'img/tauntaun.jpg', 'tauntaun');
new Merch('Unicorn Meat', 'img/unicorn.jpg', 'unicorn');
new Merch('OctopUSB', 'img/usb.gif', 'usb');
new Merch('Penrose Can', 'img/water-can.jpg', 'water-can');
new Merch('Wine Pod', 'img/wine-glass.jpg', 'wine-glass');

Merch.findUniqueNum = function() {
  var uniqueNumber = [];
  while(uniqueNumber.length < Merch.numOfMerchDisplayed) {
    var randomNum = Math.floor(Math.random() * Merch.allMerch.length);
    if(!(Merch.lastDisplyed.includes(randomNum)) && !(uniqueNumber.includes(randomNum))) {
      uniqueNumber.push(randomNum);
    } else {
      console.log('There was a dupe');
    }
  }
  Merch.lastDisplyed = uniqueNumber;
  return uniqueNumber;
};

Merch.renderImg = function() {
  // HERE i would need to write code that supports multiple img production
  // if(Merch.numOfMerchDisplayed > 3) {
  //   for(var j = 0; j < (Merch.numOfMerchDisplayed - 3); j++) {
  //     var newImgEl = document.createElement('img');

  //   }
  // }
  var uniqueIndicies = Merch.findUniqueNum();
  for(var i in uniqueIndicies) {
    Merch.allMerch[uniqueIndicies[i]].appeared++;
    var imgEl = document.getElementById(Merch.arrayOfMerchImg[i]);
    imgEl.src = Merch.allMerch[uniqueIndicies[i]].url;
    imgEl.alt = Merch.allMerch[uniqueIndicies[i]].id;
  }
};

Merch.sortThroughPercent = function() {
  for(var i = 0; i < Merch.allMerch.length; i++) {
    Merch.allMerch[i].calculatePercent();
  }
  Merch.allMerch.sort(function(obj1, obj2){
    return obj1.votePercent - obj2.votePercent;
  });
  Merch.allMerch.reverse();
};

Merch.sortThroughVotes = function() {
  Merch.allMerch.sort(function(obj1, obj2){
    return obj1.voted - obj2.voted;
  });
  Merch.allMerch.reverse();
};

Merch.makeResult = function() {
  var h2El = document.createElement('h2');
  h2El.textContent = 'Survey is Complete. Thank you for your cooperation!';
  Merch.testIsDoneEl.appendChild(h2El);
  for(var i = 0; i < Merch.allMerch.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Merch.allMerch[i].name;
    Merch.olEl.appendChild(liEl);

    var ulEl = document.createElement('ul');
    var imgEl = document.createElement('img');
    imgEl.src = Merch.allMerch[i].url;
    ulEl.appendChild(imgEl);
    liEl.appendChild(ulEl);

    var uliEl = document.createElement('li');
    uliEl.textContent = 'Voted: ' + Merch.allMerch[i].voted;
    ulEl.appendChild(uliEl);

    uliEl = document.createElement('li');
    uliEl.textContent = 'Appeared: ' + Merch.allMerch[i].appeared;
    ulEl.appendChild(uliEl);

    uliEl = document.createElement('li');
    uliEl.textContent = 'Percent Won: ' + Merch.allMerch[i].votePercent + '%';
    ulEl.appendChild(uliEl);
    
  }
};

Merch.breakAt25 = function() {
  if(Merch.voteCounter === Merch.maxVoteCount) {
    Merch.mainEl.removeChild(Merch.sectionEl);
    Merch.sortThroughPercent();
    Merch.makeResult();
  } else {
    Merch.renderImg();
  }
};

Merch.handleVote = function(event) {
  Merch.voteCounter++;
  for(var i in Merch.allMerch) {
    if(event.target.alt === Merch.allMerch[i].id) {
      Merch.allMerch[i].voted++;
    }
  }
  Merch.breakAt25();
};

Merch.sectionEl.addEventListener('click', Merch.handleVote);

Merch.renderImg();






// var merch1, merch2, merch3, merchCheck1, merchCheck2, merchCheck3;

// var merch1Img = document.getElementById('firstMerchImg');
// var merch2Img = document.getElementById('secondMerchImg');
// var merch3Img = document.getElementById('thirdMerchImg');

// var voteButton1 = document.getElementById('vote-button-1');
// var voteButton2 = document.getElementById('vote-button-2');
// var voteButton3 = document.getElementById('vote-button-3');

// var voteCounter = 0;

// // Going to use to Show results
// var mainEl = document.getElementById('mainElement');
// var divEl = document.getElementById('choicesContainer');
// var testIsDoneEl = document.getElementById('testIsDone');
// var showResultButtonEl = document.getElementById('showResultButton');
// var sortButtonVEl = document.getElementById('sortResultVote');
// var sortButtonPEl = document.getElementById('sortResultPercent');
// var sectionEl = document.createElement('section');
// sectionEl.id = 'resultSection';

// function Merch(name, url, id) {
//   this.name = name;
//   this.url = url;
//   this.id = id;
//   this.voted = 0;
//   this.appeared = 0;
//   this.votePercent = 0;
//   Merch.allMerch.push(this);
// }

// Merch.prototype.calculatePercent = function () {
//   var ratio = (this.voted / this.appeared);
//   this.votePercent = Math.round(ratio * 100);
// };

// new Merch('R2-D2 Bag', 'img/bag.jpg', 'bag');
// new Merch('Banana Cutter', 'img/banana.jpg', 'banana');
// new Merch('Restroom iPad Holder', 'img/bathroom.jpg', 'bathroom');
// new Merch('Sandle Boots', 'img/boots.jpg', 'boot');
// new Merch('Breakfast Machine', 'img/breakfast.jpg', 'breakfast');
// new Merch('Meatball Gum', 'img/bubblegum.jpg', 'bubblegum');
// new Merch('Bump Chair', 'img/chair.jpg', 'chair');
// new Merch('Action-hulhu', 'img/cthulhu.jpg', 'cthulhu');
// new Merch('Buack!', 'img/dog-duck.jpg', 'dog-duck');
// new Merch('Dragon Meat', 'img/dragon.jpg', 'dragon');
// new Merch('Speen', 'img/pen.jpg', 'pen');
// new Merch('Pet-cuum', 'img/pet-sweep.jpg', 'pet-sweep');
// new Merch('Pizza Scissors', 'img/scissors.jpg', 'scissors');
// new Merch('Rest in Shark', 'img/shark.jpg', 'shark');
// new Merch('Infant-cuum', 'img/sweep.png', 'sweep');
// new Merch('Tauntaun', 'img/tauntaun.jpg', 'tauntaun');
// new Merch('Unicorn Meat', 'img/unicorn.jpg', 'unicorn');
// new Merch('OctopUSB', 'img/usb.gif', 'usb');
// new Merch('Penrose Can', 'img/water-can.jpg', 'water-can');
// new Merch('Wine Pod', 'img/wine-glass.jpg', 'wine-glass');



// // var merch;
// // var displayMerchArr = [];

// // // simplify this code using arrays
// // function pickNewMerch() {
// //   merch = allMerch[Math.floor(Math.random() * allMerch.length )];
// //   merch.appeared++;
// //   merch1Img.src = merch.url;

// // }

// function pickNewMerch() {
//   if(voteCounter === 0) {
//     merch1 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     merch1.appeared++;
//     merch1Img.src = merch1.url;
//     merchCheck1 = merch1;
//     do {
//       merch2 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     } while (merch2 === merch1);
//     merch2.appeared++;
//     merch2Img.src = merch2.url;
//     merchCheck2 = merch2;
//     do {
//       merch3 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     } while (merch3 === merch1 || merch3 === merch2);
//     merch3.appeared++;
//     merch3Img.src = merch3.url;
//     merchCheck3 = merch3;
//   } else {
//     do {
//       merch1 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     } while (merch1 === merchCheck1 || merch1 === merchCheck2 || merch1 === merchCheck3);
//     merch1.appeared++;
//     merch1Img.src = merch1.url;
//     do {
//       merch2 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     } while (merch2 === merchCheck1 || merch2 === merchCheck2 || merch2 === merchCheck3 || merch2 === merch1);
//     merch2.appeared++;
//     merch2Img.src = merch2.url;
//     do {
//       merch3 = allMerch[Math.floor(Math.random() * allMerch.length )];
//     } while (merch3 === merchCheck1 || merch3 === merchCheck2 || merch3 === merchCheck3 || merch3 === merch1 || merch3 === merch2);
//     merch3.appeared++;
//     merch3Img.src = merch3.url;
//     merchCheck1 = merch1;
//     merchCheck2 = merch2;
//     merchCheck3 = merch3;
//   }
// }

// function sortThroughPercent() {
//   for(var i = 0; i < allMerch.length; i++) {
//     allMerch[i].calculatePercent();
//   }
//   allMerch.sort(function(obj1, obj2){
//     return obj1.votePercent - obj2.votePercent;
//   });
//   allMerch.reverse();
// }

// function sortThroughVotes() {
//   allMerch.sort(function(obj1, obj2){
//     return obj1.voted - obj2.voted;
//   });
//   allMerch.reverse();
// }

// function makeResultsEl() {
//   for(var i = 0; i < allMerch.length; i++) {
//     var h3El = document.createElement('h3');
//     h3El.textContent = allMerch[i].name;
//     sectionEl.appendChild(h3El);
//     var pEl = document.createElement('p');
//     pEl.textContent = allMerch[i].voted + '/' + allMerch[i].appeared + ' = ' + allMerch[i].votePercent + '% won ' ;
//     sectionEl.appendChild(pEl);
//   }
// }

// function breakAt25() {
//   if(voteCounter === 25) {
//     sortThroughPercent();
//     makeResultsEl();
//     mainEl.removeChild(divEl);
//     var h2El = document.createElement('h2');
//     h2El.textContent = 'Test is Complete: Check the results below';
//     testIsDoneEl.appendChild(h2El);
//   }
// }

// voteButton1.addEventListener('click', function(e) {
//   merch1.voted++;
//   voteCounter++;
//   breakAt25();
//   pickNewMerch();
// });

// voteButton2.addEventListener('click', function(e) {
//   merch2.voted++;
//   voteCounter++;
//   breakAt25();
//   pickNewMerch();
// });

// voteButton3.addEventListener('click', function(e) {
//   merch3.voted++;
//   voteCounter++;
//   breakAt25();
//   pickNewMerch();
// });

// showResultButtonEl.addEventListener('click', function(e) {
//   mainEl.appendChild(sectionEl);
//   sortButtonPEl.removeAttribute('hidden');
//   sortButtonVEl.removeAttribute('hidden');
// });

// sortButtonVEl.addEventListener('click', function(e) {
//   sectionEl.innerHTML = '';
//   sortThroughVotes();
//   makeResultsEl();
//   mainEl.appendChild(sectionEl);
// });

// sortButtonPEl.addEventListener('click', function(e) {
//   sectionEl.innerHTML = '';
//   sortThroughPercent();
//   makeResultsEl();
//   mainEl.appendChild(sectionEl);
// });


// pickNewMerch();