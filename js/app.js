'use strict';

Merch.allMerch = [];

Merch.dataArray = [];
Merch.nameArray = [];
Merch.colorArray = [];

Merch.lastDisplyed = [];

Merch.mainEl = document.getElementById('mainElement');
Merch.h3El = document.getElementById('instructions');
Merch.sectionEl = document.getElementById('choicesContainer');
Merch.testIsDoneEl = document.getElementById('testIsDone');
Merch.olEl = document.getElementById('resultsList');

Merch.showChartButtonEl = document.getElementById('showChart');
Merch.sortVoteButtonEl = document.getElementById('sortResultVote');
Merch.sortPercentButtonEl = document.getElementById('sortResultPercent');

Merch.numOfMerchDisplayed = 3;
Merch.arrayOfMerchImg = ['firstMerchImg', 'secondMerchImg', 'thirdMerchImg'];

Merch.maxVoteCount = 1;
Merch.voteCounter = 0;

Merch.parsedAllMerch = JSON.parse(localStorage.getItem('results'));

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
  return this.votePercent;
};

Merch.reinstance = function() {
  if(Merch.parsedAllMerch) {
    for(var i in Merch.parsedAllMerch) {
      new Merch(Merch.parsedAllMerch[i].name, Merch.parsedAllMerch[i].url, Merch.parsedAllMerch[i].id);
      Merch.allMerch[i].voted = Merch.parsedAllMerch[i].voted;
      Merch.allMerch[i].appeared = Merch.parsedAllMerch[i].appeared;
    }
  } else {
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
  }
};


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
  var uniqueIndicies = Merch.findUniqueNum();
  for(var i in uniqueIndicies) {
    Merch.allMerch[uniqueIndicies[i]].appeared++;
    var imgEl = document.getElementById(Merch.arrayOfMerchImg[i]);
    imgEl.src = Merch.allMerch[uniqueIndicies[i]].url;
    imgEl.alt = Merch.allMerch[uniqueIndicies[i]].id;
  }
};


Merch.calculateEachPercent = function() {
  for(var i = 0; i < Merch.allMerch.length; i++) {
    Merch.allMerch[i].calculatePercent();
  }
};

Merch.fillArray = function() {
  for(var i in Merch.allMerch) {
    Merch.nameArray.push(Merch.allMerch[i].name);
    Merch.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }
};

Merch.makeResult = function() {
  Merch.olEl.innerHTML = '';
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

Merch.sortThroughPercent = function() {
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

Merch.clearArray = function() {
  Merch.dataArray = [];
  Merch.nameArray = [];
};

Merch.renderChart = function(event) {
  var ctx = document.getElementById('resultChart');
  var chartLabel = 'Win Percentage';

  if(Merch.resultChart) {
    Merch.resultChart.destroy();
  }

  if(event.target.id === 'sortResultPercent') {
    Merch.clearArray();
    Merch.sortThroughPercent();
    Merch.fillArray();
    for(var i in Merch.allMerch) {
      Merch.dataArray.push(Merch.allMerch[i].votePercent);
    }
  } else  if (event.target.id === 'sortResultVote') {
    Merch.clearArray();
    Merch.sortThroughVotes();
    Merch.fillArray();
    for(i in Merch.allMerch) {
      Merch.dataArray.push(Merch.allMerch[i].voted);
    }
    chartLabel = 'Number of Wins';
  }

  Merch.resultChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Merch.nameArray,
      datasets: [{
        label: chartLabel,
        data: Merch.dataArray,
        backgroundColor: Merch.colorArray,
        hoverBackgroundColor: 'black'
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false,
            stepSize: 1,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      },
      title: {
        display: true,
        text: 'Results'
      }
    }
  });
};

Merch.storeInLocalStorage = function() {
  localStorage.setItem('results', JSON.stringify(Merch.allMerch));
};

Merch.showShowChartButton = function() {
  Merch.showChartButtonEl.removeAttribute('hidden');
};

Merch.changeTextOnPage = function() {
  var h2El = document.createElement('h2');
  h2El.textContent = 'Survey is Complete. Thank you for your cooperation!';
  Merch.testIsDoneEl.appendChild(h2El);
  Merch.mainEl.removeChild(Merch.h3El);
};

Merch.breakAt25 = function() {
  if(Merch.voteCounter === Merch.maxVoteCount) {
    Merch.mainEl.removeChild(Merch.sectionEl);
    Merch.calculateEachPercent();
    Merch.fillArray();
    Merch.changeTextOnPage();
    Merch.makeResult();
    Merch.showShowChartButton();
    Merch.storeInLocalStorage();
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


Merch.showChartButtonEl.addEventListener('click', function(event) {
  for(var i in Merch.allMerch) {
    Merch.dataArray.push(Merch.allMerch[i].votePercent);
  }
  Merch.renderChart(event);
  Merch.mainEl.removeChild(Merch.showChartButtonEl);
  Merch.sortPercentButtonEl.removeAttribute('hidden');
  Merch.sortVoteButtonEl.removeAttribute('hidden');
});

Merch.sortPercentButtonEl.addEventListener('click', function(event){
  Merch.renderChart(event);
  Merch.makeResult();
});
Merch.sortVoteButtonEl.addEventListener('click', function(event){
  Merch.renderChart(event);
  Merch.makeResult();
});

Merch.reinstance();
Merch.renderImg(); // render for the first time page is loaded

