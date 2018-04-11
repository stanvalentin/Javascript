$(function () {
	//variables
	
		//App mode
		var mode = 0;
		//time counter
		var timeCounter = 0;
		//lap counter
		var lapCounter = 0;
		//variable for setInterval
		var action;
		//var for lap numbers
		var lapNum = 0;
		
		//minutes, seconds and centiseconds for time and lap
		
		var timeMinutes, timeSeconds, timeCentiseconds, 
		lapMinutes, lapSeconds, lapCentiseconds;
		
		//On App load show start and lap buttons
		//hide all buttons then show only 2
		hideshowButtons("#startButton", "#lapButton");
		
		//click on startButton	
			
		$("#startButton").click(function() {
			//mode on 
			mode = 1;
			//show stop and lap buttons
			hideshowButtons("#stopButton", "#lapButton");
			//start counter
			startAction();
			
		});
		
		//click on stopButton
		$("#stopButton").click(function(){
			//show resume and reset buttons
			hideshowButtons("#resumeButton", "#resetButton");
			//stop counter
			clearInterval(action);
			
		});
		
		//click on resumeButton
		$("#resumeButton").click(function(){
			//show stop and lap buttons
			hideshowButtons("#stopButton", "#lapButton");
			//start counter
			startAction();
			
		});
		
		//click on resetButton
		
		$("#resetButton").click(function(){
			//reload the page
			location.reload();
			
		});
		
		//click on lapButton
		$("#lapButton").click(function(){
			//if mode is ON 
			if(mode) {
				//stop action
				clearInterval(action);
				//resetLap and print lap details
				lapCounter = 0;
				addLap();
				//start action
				startAction();
				
			}
			
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//functions
		
		function hideshowButtons(x,y) {
			
			$(".control").hide();
			$(x).show();
			$(y).show();
			
			
		}
		
		//start the counter
		function startAction(){
			
			action = setInterval(function(){ //every 10 miliseconds
				timeCounter++;
				if(timeCounter == 100*60*100) {
					timecounter = 0;
				}
				lapCounter++;
				if(lapCounter == 100*60*100) {
					lapCounter = 0;
				}
				updateTime();
			}, 10); 
			
		}
		
		//updateTime : converts counters to min, sec and centiseconds
		
		function updateTime() {
			//1min = 60 * 100 centiseconds = 6000 centiseconds
			timeMinutes = Math.floor(timeCounter/6000);
			//1sec = 100 centiseconds
			timeSeconds = Math.floor((timeCounter%6000)/100);
			//remainder of previous division
			timeCentiseconds = (timeCounter%6000)%100;
			
			$("#timeminute").text(format(timeMinutes));
			$("#timesecond").text(format(timeSeconds));
			$("#timecentisecond").text(format(timeCentiseconds));
			
			//1min = 60 * 100 centiseconds = 6000 centiseconds
			lapMinutes = Math.floor(lapCounter/6000);
			//1sec = 100 centiseconds
			lapSeconds = Math.floor((lapCounter%6000)/100);
			//remainder of previous division
			lapCentiseconds = (lapCounter%6000)%100;
			
			$("#lapminute").text(format(lapMinutes));
			$("#lapsecond").text(format(lapSeconds));
			$("#lapcentisecond").text(format(lapCentiseconds));
			
		}
		
		//format numbers
		function format(number) {
			if(number < 10) {
				return '0' + number;
			}else {
				return number;
			
			}
			
		}
	
		//add lap - print lap details inside lap box
		function addLap(){
			lapNum++;
			var myLapDetails= 
				'<div class="lap">' + 
					'<div class="laptimetitle">' + 
						'Lap' + lapNum +
					'</div>' +
					'<div class="laptime">' +
						'<span>' + format(lapMinutes) + '</span>' + 
						':<span>' + format(lapSeconds) + '</span>' +
						':<span>' + format(lapCentiseconds) + '</span>' +
					'</div>'
				'<div>';
		
		$(myLapDetails).appendTo("#laps");
			
		}
});
	
	
	
	
	
	
	
