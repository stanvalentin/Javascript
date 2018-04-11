$(function(){
	

	
	
//declare variables
	var paint = false;
	//painting - erasing or not
	var paint_erase = "paint";
	//get the canvas and context
	var canvas = document.getElementById("paint");
	
	var ctx = canvas.getContext('2d');
	//get the canvas container
	var container = $("#container");
	
	//mouse position
	var mouse = {x: 0, y: 0};
	
	
	//onload load saved work from localStorage
	
	if(localStorage.getItem("imgCanvas") != null) {
		
		//create an image
		var img = new Image();
		img.onload = function(){
			ctx.drawImage(img, 0, 0);
			
		}
		img.src = localStorage.getItem("imgCanvas");
		
	}
	
	//set drawing parameters *(lineWidth, lineJoin, lineCap)
	ctx.lineWidth = 3; //initial diameter of the circle
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	
	//click inside container
	container.mousedown(function(e){
		paint = true;
		ctx.beginPath();
		//eventul pageX este distanta dintre marginea stg si mouse
		//offsetLeft da distanta dintre marginea din stanga si this in care sunt acum
		mouse.x = e.pageX - this.offsetLeft; 
		mouse.y = e.pageY - this.offsetTop; 
		ctx.moveTo(mouse.x, mouse.y);
		
		
		
		
	});
	
	//move the mouse while holding mouse key
	container.mousemove(function(e){
		mouse.x = e.pageX - this.offsetLeft; 
		mouse.y = e.pageY - this.offsetTop; 
		
		if(paint == true) { 
			if(paint_erase == "paint") {
				
				//get color input
				ctx.strokeStyle = $("#paintColor").val();
				
			} else {
				//white color - erasing
				ctx.strokeStyle = "white";
			}
			//draw line
			ctx.lineTo(mouse.x, mouse.y);
			//show line
			ctx.stroke();
		}
			
		
	});
	
	container.mouseup(function(){
		paint = "false";
		
		
	});
	
	//click on reset button 
	$("#reset").click(function() {
		//clear
		ctx.clearRect(0, 0, canvas.width, canvas.height );
		//and go back to painting mode
		paint_erase = "paint";
		$("#erase").removeClass("erase_mode");
	});
	
	//click erase button
	
	$("#erase").click(function(){
		if(paint_erase == "paint"){
			
			paint_erase = "erase";
			
		} else {
			
			paint_erase = "paint";
			
		}
		
		$(this).toggleClass("erase_mode");
		
	});
	
	//click on save button
	$("#save").click(function(){
		
		if(typeof(localStorage) != null) {
		
		localStorage.setItem("imgCanvas", canvas.toDataURL());
		
		
	} else {
		
		window.alert("Your browser does not support local storage!");
		
	}         

	});
	
	
	//change also the color input 
	$("#paintColor").change(function(){
		
				$("#circle").css("background-color", $(this).val());
		
		
		});
	
	//change lineWidth using slider
		$("#slider").slider({
		min: 3, 
		max: 30,
		slide: function(event, ui){
			$("#circle").height(ui.value);
			$("#circle").width(ui.value);
			ctx.lineWidth = ui.value;
			
		}
		
		
		
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});