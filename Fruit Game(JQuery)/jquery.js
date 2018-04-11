var playing = false;
var score;
var step;
var action;
var trialsLeft;
var fruits = ['bananas','blackberry','cherry','grapes','pear','pineapple','strawberry'];

$(function() {
	
	//click start reset btn
	$("#startreset").click(function(){
		//hide game over box
		$("#gameover").hide();
		//are we playing?
		if(playing == true) {
		 //reload page
		location.reload();
		} else {
		//we are not playing
			playing = true; //game initiated
			//set score to 0 
			score = 0;
			$("#scorevalue").html(score);
			
			//show trials left
			$("#lives").show();
			trialsLeft = 3;
			addHearts();
			}
			//change button text to "reset game"
			$("#startreset").html("Reset Game") ;
			
			//start sending fruits
			startAction();
		
	});
	
	//slice a fruit
$("#fruit1").mouseover(function(){
		score++;
		$("#scorevalue").html(score);
		//document.getElementById('slicesound').play();
		$("#slicesound")[0].play();
		//stop fruit going down
		clearInterval(action);
		
		//hide the fruit with jquery UI
		$("#fruit1").hide("explode", 500);
			
		//send a new fruit
		setTimeout(startAction, 500);
	});

	//play sound in background
	//explode the fruit
	//increase score by 1
				
function addHearts(){
	$("#lives").empty();
	for(i = 0; i < trialsLeft; i++){
		$("#lives").append('<img src="images/heart.png" class="life"> ');
	}
}

function startAction() {
	//generate a fruit
	$("#fruit1").show();
	chooseFruit();   	//generate a random fruit
	$("#fruit1").css({"left": Math.round(Math.random() * 550), "top" : -50});
	
	//generate step
	step = 1 + Math.round(Math.random() * 5); //add with 1 not to have 0 result
	
	//move the fruit with generated step 10ms
	 action = setInterval(function() {
		$("#fruit1").css({"top": $("#fruit1").position().top + step});
		//check if the fruit is too low
		if($("#fruit1").position().top > $("#fruitContainer").height()){
			//check if trials left
			if(trialsLeft > 1) {
					//generate a fruit
					$("#fruit1").show();
					chooseFruit();   	//random fruit
					$("#fruit1").css({"left": Math.round(Math.random() * 550), "top" : -50});
					
					//generate step
					step = 1 + Math.round(Math.random() * 5);
					//remove one heart
					trialsLeft--;
					addHearts();
			} else {
				//game over 
				playing = false;
				$("#startreset").html("Start Game");
				$("#gameover").show();
				$("#gameover").html('<p>Game Over</p> <p> Your Score Is '+ score + '</p>');
				$("#lives").hide();
				stopAction();
				
			}
			
		}
		
	}, 10);
	
}

//generate random fruit function
function chooseFruit(){
	
	var random = Math.floor(Math.random() * 6);
	
	$("#fruit1").attr('src', 'images/'+ fruits[random]+ '.png');
	
}

function stopAction(){
	
	clearInterval(action);
	$("#fruit1").hide();
	
}

});


			