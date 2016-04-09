var config = {
	"speed":200,
	"snake_color":"#FF0000",
	"food_color":"#000000",
	"canvas_width":500,
	"canvas_height":500
}

function Snake() {
	this.width = 10;
	this.height = 10;
	this.direction = 1;
	this.body = [[0, 0]];
}

function Food() {
	this.x = Math.round(Math.random()*10)*40;
	this.y = Math.round(Math.random()*10)*40;
	this.width = 10;
	this.height = 10;
}

function moveTo(direction) {//蛇正常移动
	var move = null;
	switch(direction) {
		case 1: {//right
			move = function() {
				eat();
				var x = snake.body[snake.body.length-1][0];
				var y = snake.body[snake.body.length-1][1];
				cxt.fillStyle = config.snake_color;
				if(x + snake.width >= config.canvas_width) {
					clearInterval(timeout);
					alert("游戏结束！");
					return;
				}
				cxt.clearRect(snake.body[0][0], snake.body[0][1],snake.width, snake.height);
				cxt.fillRect(x + snake.width, y, snake.width, snake.height);
				snake.body.shift();
				snake.body.push([x + snake.width, y]);
				hurt();
			};
			return move;
		}
		case 2: {//left
			move = function() {
				eat();
				var x = snake.body[snake.body.length-1][0];
				var y = snake.body[snake.body.length-1][1];
				cxt.fillStyle = config.snake_color;
				if(x<= 0) {
					clearInterval(timeout);
					alert("游戏结束！");
					return;
				}
				cxt.clearRect(snake.body[0][0], snake.body[0][1],snake.width, snake.height);
				cxt.fillRect(x - snake.width, y,snake.width, snake.height);
				snake.body.shift();
				snake.body.push([x - snake.width, y]);
                hurt();
			};
			return move;
		}
		case 3: {//up
			
			move = function() {
				eat();
				var x = snake.body[snake.body.length-1][0];
				var y = snake.body[snake.body.length-1][1];
				cxt.fillStyle = config.snake_color;
				if(y<= 0) {
					clearInterval(timeout);
					alert("游戏结束！");
					return;
				}
				cxt.clearRect(snake.body[0][0], snake.body[0][1], snake.width, snake.height);
				cxt.fillRect(x, y - snake.height,snake.width, snake.height);
				snake.body.shift();
				snake.body.push([x, y - snake.height]);
                hurt();
			};
			return move;
		}
		case 4: {//down
			move = function() {
		    	eat();
				var x = snake.body[snake.body.length-1][0];
				var y = snake.body[snake.body.length-1][1];
				cxt.fillStyle = config.snake_color;
				if(y + snake.height >= config.canvas_height) {
					clearInterval(timeout);
					alert("游戏结束！");
					return;
				}
				cxt.clearRect(snake.body[0][0], snake.body[0][1],snake.width, snake.height);
				cxt.fillRect(x, y + snake.height, snake.width, snake.height);
				snake.body.shift();
				snake.body.push([x, y + snake.height]);
                hurt();
			};
			return move;
		}
	}

}

document.onkeydown = function(e) {//键盘控制蛇的移动方向
	if(e.keyCode == 38 && snake.direction != 3 && snake.direction != 4) {//up
		snake.direction = 3;
		clearInterval(timeout);
		timeout = setInterval(moveTo(snake.direction), config.speed);
	} else if(e.keyCode == 40 && snake.direction != 4  && snake.direction != 3) {//down
		snake.direction = 4;
		clearInterval(timeout);
		timeout = setInterval(moveTo(snake.direction), config.speed);
	} else if(e.keyCode == 37 && snake.direction != 2 && snake.direction != 1) {//left
		snake.direction = 2;
		clearInterval(timeout);
		timeout = setInterval(moveTo(snake.direction), config.speed);
	} else if(e.keyCode == 39 && snake.direction != 1 && snake.direction != 2) {//right
		snake.direction = 1;
		clearInterval(timeout);
		timeout = setInterval(moveTo(snake.direction), config.speed);
	}
}

function eat(){//判断是否吃到了食物
	var head = snake.body[snake.body.length-1];
	if(head[0] == food.x&&head[1] == food.y){
		snake.body.push([food.x,food.y]);
		food = new Food();
		cxt.fillStyle = config.food_color;
        cxt.fillRect(food.x, food.y, food.width, food.height);
	}
}

function hurt(){//判断是否伤到了自己
	var head = snake.body[snake.body.length-1];
	for(var i = 0;i<snake.body.length-1;i++){
		if(snake.body[i][0]==head[0]&&snake.body[i][1]==head[1]){
			clearInterval(timeout);
			alert("game over!");
			return;
		}
	}
}
function init() {
	snake = new Snake();
	food = new Food();
	cxt.clearRect(0,0,config.canvas_width,config.canvas_height);
	cxt.fillStyle = config.snake_color;
	cxt.fillRect(0, 0,snake.width, snake.height);
	moveTo(snake.direction);
	cxt.fillStyle = config.food_color;
    cxt.fillRect(food.x, food.y, food.width, food.height);
}
var c = document.getElementById("field");
var cxt = c.getContext("2d");
var snake;
var food;
var timeout = null;
init();

document.getElementById("start").onclick=function(){
	 timeout = setInterval(moveTo(snake.direction), config.speed); 
}
document.getElementById("stop").onclick=function(){
     clearInterval(timeout); 
}
document.getElementById("reStart").onclick=function(){
     init();
}


