let startBlock = document.querySelector('.start-game'),
startButton = document.querySelector('.start-game .start'),
endBlock = document.querySelector('.end-game'),
endButton = document.querySelector('.end-game .end'),
body = document.querySelector('body'),
color = document.querySelectorAll('.color input'),
vSpeed = document.querySelector('.speed'),
randomColors = document.querySelector('.random input');

startButton.onclick = function() {
   setSettings();
   startMove();
}
endButton.onclick = function() {
   if (boost) {
      speed = 120;
   }
   startMove();
}

function setSettings() {
   if (randomColors.checked) {
      body.style.backgroundColor = '#66A1D2';
      sColor = 'black';
      rColor = true;
   } else {
      body.style.backgroundColor = color[0].value;
      sColor = color[1].value;
      fColor = color[2].value;
   }
   if (vSpeed.value == 'boost') {
      speed = 120;
      boost = true;
   } else {
      speed = vSpeed.value;
   }
}

function startMove() {
   startBlock.style.display = "none";
   endBlock.style.display = "none";
   clear();
   newFood();
   snake = [
      [0,0],
      [30,0]
   ];
   d = 1;
   drawBody();
   moveIn = setInterval(() => move(), speed);
}