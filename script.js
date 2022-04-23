let c = document.getElementById('canvas'),
   ctx = canvas.getContext('2d'),
   size = 30,
   food = [],
   snake = [
      [0,0],
      [30,0]
   ],
   d = 1,
   moveIn,
   fColor = "#FF0000",
   sColor = "#000000";       // 1 - влево, 2 - право, 3 - вверх, 4 - вниз
c.width = Math.round(innerWidth / size) * size;
c.height = Math.round(innerHeight / size) * size;
let width = c.width - size,
   height = c.height - size;

let startBlock = document.querySelector('.start-game'),
   startButton = document.querySelector('.start-game .start'),
   endBlock = document.querySelector('.end-game'),
   endButton = document.querySelector('.end-game .end'),
   bColor = document.querySelector('.background-color'),
   snakeColor = document.querySelector('.snake-color'),
   foodColor = document.querySelector('.food-color'),
   setColor = document.querySelector('.set-color'),
   body = document.querySelector('body'),
   pause = document.querySelector('.pause');


pause.onclick = function() {
   if (moveIn) {
      clearInterval(moveIn);
      moveIn = 0;
      pause.src = "files/start.png";
   } else {
      moveIn = setInterval(() => move(), 100);
      pause.src = "files/pause.png";
   }
}

setColor.onclick = function() {
   body.style.backgroundColor = bColor.value;
   fColor = foodColor.value;
   sColor = snakeColor.value;
}

startButton.onclick = function() {
   newFood();
   drawBody();
   startBlock.style.display = "none";
   moveIn = setInterval(() => move(), 100);
}
endButton.onclick = function() {
   endBlock.style.display = "none";
   clear();
   newFood();
   snake = [
      [0,0],
      [30,0]
   ];
   d = 1;
   drawBody();
   moveIn = setInterval(() => move(), 100);
}

function clear() {
   ctx.clearRect (food[0], food[1], size, size);
   snake.forEach(body => {
      ctx.clearRect (body[0], body[1], size, size)
   });
}

function rand (min, max) {
   n = Math.floor(min + Math.random() * (max + 1 - min));
   number = Math.round( n / size) * size;
   return number;
}

function foodCoord() {
   food[0] = rand (0, width);
   food[1] = rand (0, height);
   snake.forEach(body => {
      if (body[0] == food[0] && body[1] == food[1]) {
         foodCoord();
      }
   });
}

function newFood() {
   foodCoord();
   ctx.fillStyle = fColor;
   ctx.fillRect (food[0], food[1], size, size);
}

function drawBody() {
   snake.forEach(body => {
      ctx.fillStyle = sColor;
      ctx.fillRect (body[0], body[1], size, size);
   });
};

function newBody(x,y) {
   body = [x,y];
   snake.push(body);
   return body;
}

function move() {
   let last = snake.length - 1;
   let x = 0,
      y = 0;

   if (d == 1) {                 // выбор направления
      x = snake[last][0] + size;
      y = snake[last][1];
   } else if (d == 2) {
      x = snake[last][0] - size;
      y = snake[last][1];
   } else if (d == 3) {
      x = snake[last][0];
      y = snake[last][1] - size;
   } else if (d == 4) {
      x = snake[last][0];
      y = snake[last][1] + size;
   }

   //console.log(x); console.log(y);
   death(x,y);
   
   newBody(x,y);
   let grow = eat(x,y);

   ctx.fillStyle = sColor;
   if (grow) {
      ctx.fillRect(body[0], body[1], size, size);
   } else {
      ctx.clearRect(snake[0][0], snake[0][1], size, size);
      ctx.fillRect(body[0], body[1], size, size);
      snake.splice(0,1);
   }
}

function death (x,y) {
   if (x >= c.width || y >= c.height || x < 0 || y < 0) {   // проверка на столкновение с границами
      endBlock.style.display = "block";
      clearInterval(moveIn);
   }
   snake.forEach(body => {
      if (x == body[0] && y == body[1]) {
         endBlock.style.display = "block";
         clearInterval(moveIn);
      }
   });
}

function eat(x,y) {
   if (x == food[0] && y == food[1]) {
      newFood();
      return 1;
   }
}


document.addEventListener('keydown', function(event) {
   if ((event.code == 'ArrowLeft' || event.code == 'KeyA') && d != 1) {
     d = 2;
   } else if ((event.code == 'ArrowUp' || event.code == 'KeyW') && d != 4) {
      d = 3;
   } else if ((event.code == 'ArrowDown' || event.code == 'KeyS') && d != 3) {
      d = 4;
   } else if ((event.code == 'ArrowRight' || event.code == 'KeyD') && d != 2) {
      d = 1;
   }
 });
