var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
	//if we click on start/reset btn

document.getElementById('startset').onclick = function() {
	//if we are playing
	if (playing) {
		//reload page
		location.reload();
		
		//if we are not playing
	} else 	
		//change mode to playing
		playing = true;
		//set score to 0 and change HTML document to 0
		score = 0;
		document.getElementById('scorevalue').innerHTML = score;
			//show countdown box
		show('time');
		
		//hide game over box
		hide('gameover');
			//change btn to reset
		document.getElementById('startset').innerHTML = "Reset Game";
		
		//start reducing time by 1 sec in loops
			//set first the var tiemremaning then call the funct
		timeremaining = 60;
		document.getElementById('seconds').innerHTML = timeremaining;
		
		startCountdown();
		
		//generate new Q&A
		generateQA();
		
}
	
		
			
		
			
	//clicking an answer box

	for (i = 1; i<5; i++) {
		document.getElementById("box"+i).onclick = function(){
		//check if we are playing
		if(playing){//answer correct ?
			if(this.innerHTML == correctAnswer) {//yes
			score ++;
			document.getElementById('scorevalue').innerHTML = score;
			//hide wrongbox
			hide("wrong");
			show("correct");
			setTimeout(function() {
				hide ("correct");
			}, 1000);
			//Generate new Q&A
			generateQA();
		}else { //wrong answer
			show("wrong");
			hide("correct");
			setTimeout(function() {
				hide ("wrong");
			}, 1000);
		
		}
		
	}
		
	}
	}			
	//if we clink on answer box	
		//if we are playing
			//correct ?
				//yes
					//increase score by 1
					//show correct box for 1 sec
					//generate new Q&A
				//no 
					//show try again box
	

	
//functions

function startCountdown(){
	
	action = setInterval(function(){
		timeremaining -= 1;
		document.getElementById('seconds')
		.innerHTML = timeremaining;
			if(timeremaining == 0) {
				//stop countdown when reach zero
				clearInterval(action);
				//show gameover div
				show('gameover');
				document.getElementById('gameover').innerHTML =
				"<p> Game Over! </p> <p> Your Score Is " + score +".</p>"
				//hide the time display
				hide('time');
				hide('correct');
				hide('wrong');
				//set playing to non-playing mode
				playing = false;
				//change btn to Start
				document.getElementById('startset').innerHTML = "Start";
			}
	}, 1000);
}

function show (Id) {
	
	document.getElementById(Id).style.display = "block";
}

function hide(Id) {
	
	document.getElementById(Id).style.display = "none";
}

function generateQA (){
	//genearate rand numb between 1 - 10
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x*y;
	document.getElementById('question').innerHTML =
	x + " X " + y;
		var correctPosition = 
		1 + Math.round(3 * Math.random());
		//fill one random box with correct answer
		document.getElementById("box"+correctPosition).innerHTML =
		correctAnswer; 
		
		//fill other boxes with wrong answers
		var answers = [correctAnswer];
		for(i=1; i<5; i++){
			if (i != correctPosition){
				var wrongAnswer;
				do { wrongAnswer = 1 + Math.round(9 * Math.random())*
				1 + Math.round(9 * Math.random()); //wrong answer}
			}while (answers.indexOf(wrongAnswer) > -1)
				
				document.getElementById('box' + i).innerHTML = wrongAnswer;
				answers.push(wrongAnswer);
			
		}
			
}
}






