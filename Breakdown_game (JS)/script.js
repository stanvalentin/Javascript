var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

/*ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

--exemple de desenat

ctx.beginPath();
ctx.arc(240, 160, 20, 0, 2*Math.PI);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath(); */


var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//user interaction variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;


var bricks = [];
for(c = 0; c < brickColumnCount; c++) {
	
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++){
		bricks[c][r] = {x: 0, y: 0, status: 1}
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
	for (c=0; c<brickColumnCount; c++){
		for (r=0; r<brickRowCount; r++){
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight+ brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
		}
	}
	}
	
}

function keyDownHandler (e) {
		if (e.keyCode == 39){
			rightPressed = true;
		}
		else if (e.keyCode == 37){
			leftPressed = true;
		}
}

function keyUpHandler (e) {
		if (e.keyCode == 39){
			rightPressed = false;
		}
		else if (e.keyCode == 37){
			leftPressed = false;
		}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, 2*Math.PI);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	
}

function drawPaddle() {
	//centrare obiect pe axa x = canvas.width - obiect.width, totul impartit la 2
	//orientare (jos) obiect pe axa Y = canvas.height - obiect.height
	//daca voiam sa-l pun in centru si pe axa y imparteam la 2 ca la x
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	
}

function collisionDetection() {
	
	for (c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if (b.status == 1) {
				if(x > b.x && x < b.x + brickWidth && y > b.y & y < b.y + brickHeight){
				dy = -dy;
				b.status = 0;
				score++;
				if(score == brickRowCount * brickColumnCount){
					alert ("Well Done !!! You Won!!!");
					document.location.reload();
				}
			}
				
			}
			
		}
	}
}


function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score :" + score, 8, 20);
	
}
//pe axa y (height) "-" deplaseaza in sus iar "+ " in jos
function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width -65, 20);

}

function draw() {
	
	ctx.clearRect(0,0, canvas.width, canvas. height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawLives();
	
	if((x + dx > canvas.width - ballRadius) || (x + dx < ballRadius)) {
		dx = -dx;
	}
	
	/* -- cod initial -daca atinge bottom canvas schimba directia
	if((y + dy > canvas.height - ballRadius) || (y + dy < ballRadius)) {
		dy = -dy;
	} */

	if (y + dy < ballRadius) {//if the ball is touching the top of canvas
		dy = -dy; //then change direction
		
		//otherwise if the ball is touching bottom of canvas
	} else if (y + dy > canvas.height-ballRadius) {
		//if is betweeen left and right edges of the paddle
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy; //change again direction
		}
		else { //otherwise game is over and refresh page
			lives--;
			if (!lives) {
				alert("Game Over! :)")
				document.location.reload();
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy= -2;
				paddleX = (canvas.width - paddleWidth)/2;
			}
		}
	}
	//move paddle on x axis 
	if(rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	x += dx;
	y += dy;
	requestAnimationFrame(draw); // better than setInterval();
}

//mouse controller 

document.addEventListener("mousemove", mouseMoveHandler);
  
function mouseMoveHandler(e) {
  
                var relativeX = e.clientX - canvas.offsetLeft;
  
                if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
  
                                paddleX = relativeX - paddleWidth/2;
  
                }
  
}
 //setInterval(draw, 10); instead i used requestAnimationFrame

draw();