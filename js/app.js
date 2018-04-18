'use strict';

Merch.mainEl = document.getElementById('mainElement');
Merch.h3El = document.getElementById('instructions');
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
  Merch.mainEl.removeChild(Merch.h3El);
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

