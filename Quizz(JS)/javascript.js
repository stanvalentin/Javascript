var check_answer ;
var score = 0;
var question_id = []; 
var id_of_current_question;
var game_play;
var game_over = false;

var no_of_lives = 3;

var lives = document.getElementById("lives1");


//define the prototype function for question objects

function Question (text, choices, answer, id) {
	 
	 this.text = text;
	 this.choices = choices;
	 this.answer = answer;
	 this.id = id;
	 this.correctAnswer = function(choice) {
	 
			return choice == this.answer;
	 
			}

 }
 
 //define prototype for lives
 function Lives (score, no_of_lives) {
	 
	 this.score = score;
	 this.no_of_lives = no_of_lives;
	 
	 this.displayLives = function(no_of_lives) {
		

		//then add lives to it
		for(i = 0; i < no_of_lives; i++){
			
			console.log("i am working");
			
			//var images = document.createElement("img");
			//images.setAttribute('src', 'images/heart.png'); 
			//images.classList.add("life"); 
			//document.getElementById("lives").appendChild(images);
		
			}
		 
		}
	 
	 this.life_warning = function() {
		
		if(this.no_of_lives == 1  && this.score < 3) {
			return 
				"Watch out for your only remaining life ! " + "<br>" +
				"You results so far are worst than I imagined!";
				}
		}
		
	 this.gameOver = function() {
		
			if (this.no_of_lives == 0 ) {
				
				return "Sorry my friend for your loss !";
			}
		}
	
	 
 }

 
 
 
//prepare the questions - make an array of objects
 var questions = [

	new Question("Which is the greatest peak in the world?", ["Moldoveanu", "Everest","Mont Blanc","Other"], "Everest", 1 ),
	new Question("Which is a loosely typed language?", ["PHP", "C#","Java","C++"], "PHP", 2 ),
	new Question("Who is the last king in Romania?", ["Carol", "Mihai I","Ferdinand","Carol II"], "Mihai I", 3 ),
	new Question("Do you expect to win this game?", ["Yes", "NO WAY","100%","I think...so"], "NO WAY", 4 ),
	new Question("Who's the best team in Keysfin ?", ["Sales", "Support", "HR","Starbyte"], "Support", 5 ),
	new Question("What is a bannana?", ["fruit", "vegtable","root","plant"], "fruit", 6 ),
	new Question("intrebarea capcana?", ["fruit", "vegtable","root","Starbyte"], "Starbyte", 7 )
];



//start_ reset buttons

function st_res() {
	
				document.getElementById("left").style.display = "none";
				document.getElementById("right").style.display = "none";
	
				var start_stop = document.getElementById("new_question").innerHTML;
					
				if(start_stop == "START") {
					
						no_of_lives = 3;
						
						game_play = "on";
						
						document.getElementById("lives1").style.width = '150px';
						
						window.alert("I whish you good luck ! Ha ha ha ");
						
						document.getElementById("new_question").innerHTML = "RESET";
						
						populate();
					
					} 
					
					else {
						
						document.getElementById("new_question").innerHTML = "START";
						
						score = 0;
						
						question_id = [];
						
						id_of_current_question = "";
						
						game_play = "off";
						
						document.getElementById("score").innerHTML = "SCORE : " + score;
						
						var elems = document.getElementsByClassName('buttons');
						for (var i=0; i<elems.length; i++){
					
							elems[i].style.display = 'none';
							}
							
						document.getElementById("question").innerHTML = "Want a new start ahhh?";
						document.getElementById("answer").style.display = "none";
						
						
						return false;
						
					}
		
	return true;
}

 
//generate random question

function populate() {
	
					//as long as the number of questions displayed is not over
					if ((question_id.length != questions.length) && no_of_lives != 0) {
						
					//display reset button 
					document.getElementById("new_question").style.display = "block";
					
					//create a var to take a random question object
					var	rand_question = questions[Math.floor(Math.random() * questions.length )];
					
					//and another one to check index of question	
					var	index = question_id.indexOf(rand_question.id);
					
					switch (index) {
								case -1: //if is not fuound then add it to the question_id array
								
											question_id.push(rand_question.id);
											//and take the id of the current question
											id_of_current_question = rand_question.id;
											//select the buttons with answers
											var elems = document.getElementsByClassName('buttons');
											
											
										
												//display all buttons 
												for (var i=0; i<elems.length; i++){
													
													
														//elems[i].style.display = 'block';
														
														fadeIn(elems[i]);
												
														//display question
														document.getElementById("question").innerHTML = rand_question.text;
														//and display the answers inside buttons													
														document.getElementById("btn0").innerHTML = rand_question.choices[0];
														document.getElementById("btn1").innerHTML = rand_question.choices[1];
														document.getElementById("btn2").innerHTML = rand_question.choices[2];
														document.getElementById("btn3").innerHTML = rand_question.choices[3];
														//erase pop-up wrong-right button
														document.getElementById("answer").innerHTML = '';
														document.getElementById("answer").style.display = "none";
									
														} 
						
								break;
								
								default:  populate(); 
								

		
									}
						
						
					}
						
					else {
						// if all questions have been displayed
						game_over = true;
						document.getElementById("new_question").style.display = "block";
						document.getElementById("question").innerHTML = "<p id='game_over' style='text-align: center'> GAME OVER! </p>";
						document.getElementById("answer").style.display = 'none';
						
					}
										
									
}

function take_value(answer) {

						var elems = document.getElementsByClassName('buttons');
						
						
						for (var i=0; i<elems.length; i+=1){
							
							//hide the buttons if one of them was clicked - take value() is called onclick
							elems[i].style.display = 'none';
						}
						
						//check if answer given is matching any of the correct answer of the questions
						for ($i = 0; $i < questions.length; $i++) {
						
						//if the id of the current question is the same then we check answer
						if (id_of_current_question == questions[$i].id) {
							
						check_answer = questions[$i].correctAnswer(answer);
						
							if (check_answer) {
						 
						document.getElementById("answer").innerHTML = "CORRECT";
						document.getElementById("answer").style.display = "block";
						document.getElementById("answer").style.backgroundColor = "green";
						document.getElementById("right").style.display = "block";
						document.getElementById("left").style.display = "none";
						var elem = document.getElementById("right");
						
						slideDown(elem);
						
						playSound('success');
						
						score++;
						
						
						document.getElementById("score").innerHTML = "SCORE : " + score;
						
						 
								} 
								
								else {
									
									document.getElementById("score").innerHTML = "SCORE : " + score;
									document.getElementById("answer").innerHTML = "WRONG";
									document.getElementById("answer").style.display = "block";
									document.getElementById("answer").style.backgroundColor = "red";
									document.getElementById("left").style.display = "block";
									var elem = document.getElementById("left");
									
									slideDown(elem);
									
									playSound('fail');
																
									document.getElementById("right").style.display = "none";
									
									no_of_lives--;
									
									var lives = document.getElementById("lives1");
									
									life(lives);
												
								}
							}
	
						}
						
						if (game_play == "on") {
							setTimeout(function(){ populate(); }, 2000);
							
							//hide reset button during display of result
							document.getElementById("new_question").style.display = "none";
						}
						
 } 
 
 
 function fadeIn(elem) {
           
            var op = parseFloat(elem.style.opacity);

            var timer = setInterval(function () {
           
                if(op >= 1.0){
					clearInterval(timer);
				}
                elem.style.display = "block";  
                op += 0.1;
                elem.style.opacity = op;
            }, 150);
        }
		
		
function slideDown(elem) {
	
	var height = parseFloat(elem.style.height);
	
	var parent = elem.parentElement;
	
	var parent_heigth = parseFloat(parent.style.height);
	
	var timer = setInterval(function () {
           
                if(height >= 300){
					clearInterval(timer);
					//after clearInterval - after the stop
					
						setTimeout(function(){
							elem.style.height = '0px';
							parent.style.height = '0px';
						
						}, 2000);
				}
                    
                height += 30;
				
				parent_heigth = height + 0;
				
                elem.style.height = height + 'px';
				parent.style.height = parent_heigth + 'px';
				
            }, 50);
	
}
 
 
function playSound(type) {
	var sound;
	
	if(type == 'fail') {
		
	sound = document.getElementById("fail");
    sound.play();
		
	      }
	else if(type == 'success') {
			  
		  sound = document.getElementById("success");
          sound.play();
		  }
	else {
			  
		  sound = document.getElementById("game_over");
          sound.play();
		  }
       
}

function life(elem) {
           
            var op = parseFloat(elem.style.width);
			
			var parent = elem.parentElement;
	
			var parent_heigth = parseFloat(parent.style.width);
			
			elem.style.width = (op - 50) + 'px' ;

        }
  

