var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
var Paddle_thikness = 10;

var player1Score = 0;
var player2Score = 0;


window.onload = function(){
	
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	setInterval(function (){
		drawEverything();
		moveEverything();
	}, 50);
	
	canvas.addEventListener('mousemove', 
		function (evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); //to center the mouse to paddle
			
	});
}


function moveEverything(){
	computerMovement();
	
	ballX += ballSpeedX;

	//change direction when hit X walls
	
	if (ballX < 0){//paddle collision left
		if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
		} else {
			ballReset();
			player2Score++;
		}
	}
	//paddle collision right
	if (ballX > canvas.width){
		if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
				ballSpeedX = -ballSpeedX;
				var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
				ballSpeedY = deltaY * 0.35;
		} else {
			ballReset();
			player1Score++;
		}
	}
	
	//change direction when hit Y walls
	ballY += ballSpeedY;
	if(ballY > canvas.height|| ballY < 0){
		ballSpeedY = -ballSpeedY;
	}
	
	
}

function drawEverything (){
	
	console.log(ballX);
	//draw the canvas first
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	//draw paddle - left
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(10,paddle1Y, Paddle_thikness, PADDLE_HEIGHT);
	//draw paddle - right
	canvasContext.fillStyle = 'white';
	canvasContext.fillRect(canvas.width - 20,paddle2Y, Paddle_thikness, PADDLE_HEIGHT);
	//draw ball
	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX,ballY,10,0, Math.PI*2, true);
	canvasContext.fill();
	//score
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width -100, 100);
	
}


function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x: mouseX,
			y: mouseY
		};
	
}

function ballReset(){
	ballSpeedX = -ballSpeedX; //change dir when reset is called
	ballX = canvas.width/2;
	bally = canvas.height/2;
	
}

function computerMovement (){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY -35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY + 35){
		paddle2Y -=6;;
	}
}










