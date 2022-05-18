let c = document.getElementById('canvas'),
   ctx = canvas.getContext('2d'),
   size = 30,
   food = [],
   snake = [],
   d,// 1 - влево, 2 - право, 3 - вверх, 4 - вниз
   moveIn,
   fColor,
   sColor,
   rColor,
   speed,
   boost,
   pauseBtn = document.querySelector('.pause');
c.width = Math.round(innerWidth / size) * size;
c.height = Math.round(innerHeight / size) * size;
let width = c.width - size,
   height = c.height - size;

pauseBtn.onclick = pause;

function pause() {
   if (moveIn) {
      clearInterval(moveIn);
      moveIn = 0;
      pauseBtn.src = "files/start.png";
   } else {
      moveIn = setInterval(() => move(), speed);
      pauseBtn.src = "files/pause.png";
   }
}

function clear() {
   ctx.clearRect (food[0], food[1], size, size);
   snake.forEach(body => {
      ctx.clearRect (body[0], body[1], size, size)
   });
}

function randomNumber (min, max) {
   n = Math.floor(min + Math.random() * (max + 1 - min));
   return n;
}

function rand (min, max) {
   n = randomNumber(min, max);
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
   if (rColor) {
      let key = randomNumber(0,colorList.length-1);
      fColor = colorList[key];
   }
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
      sColor = fColor;
      newFood();
      if (boost && speed > 70) {
         speed -= 3;
         clearInterval(moveIn);
         moveIn = setInterval(() => move(), speed);
      }
      return 1;
   }
}


document.addEventListener('keydown', function(event) {
   if ((event.code == 'ArrowLeft' || event.code == 'KeyA') && d != 1 && moveIn) {
     d = 2;
   } else if ((event.code == 'ArrowUp' || event.code == 'KeyW') && d != 4 && moveIn) {
      d = 3;
   } else if ((event.code == 'ArrowDown' || event.code == 'KeyS') && d != 3 && moveIn) {
      d = 4;
   } else if ((event.code == 'ArrowRight' || event.code == 'KeyD') && d != 2 && moveIn) {
      d = 1;
   } else if (event.code == 'Space') {
      pause();
   }
 });
