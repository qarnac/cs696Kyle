        var drawingCanvas = document.getElementById('myCanvas'), context = drawingCanvas.getContext('2d'), difficulty = new Image();

        function loadImage(myImage, xpos, ypos, cxpos, cypos){
                context.drawImage(myImage,xpos,ypos,480,100,cxpos,cypos,480,100);
            };
        difficulty.src = "../img/difficulty.png";
            
       
        loadImage(difficulty,0,0,240,134); //load easy 
        loadImage(difficulty,0,100,240,334); //load intermediate
        loadImage(difficulty,0,200,240,534); //load hard 
            
        //begin timer countdown
        function startItUp(){
            timer();
            setInterval(timer, 1000);
        }
        var seconds = 3;

        function timer(){
            context.clearRect(0,0,drawingCanvas.width, drawingCanvas.height);
            context.font = 'italic 50pt Calibri';
            context.fillText('...'+seconds, 430, 385);
            --seconds;
            if(seconds == -1){
                clearInterval(startItUp);
                runGame(); //after 3 seconds of notifying the player, start the game
            }
        }


    //gets the mouse position when the cursor is over the canvas
    function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                 x: evt.clientX - rect.left,
                 y: evt.clientY - rect.top
            };
        }
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt);
    

    var countdown = document.getElementById("countdown");
        //easy difficulty
        if(mousePos.x >= 240 && mousePos.x <= 720 && mousePos.y >= 134 && mousePos.y <= 234){
            context.clearRect(0,0,drawingCanvas.width, drawingCanvas.height);
            
            startItUp();
             
        }
        //intermediate difficulty
        else if(mousePos.x >= 240 && mousePos.x <= 720 && mousePos.y >= 334 && mousePos.y <= 434){
            startItUp();
        }
        //hard difficulty
        else if(mousePos.x >= 240 && mousePos.x <= 720 && mousePos.y >= 534 && mousePos.y <= 634){
            startItUp();
        }

    }, false);



        function runGame(){

            var xpos = 0, ypos = 0, cxpos = 448, cypos = 320, framesize = 64, direction = "right", myImage = new Image();

            context.clearRect(0,0,drawingCanvas.width, drawingCanvas.height);

            function loadMuncher(xpos, ypos, cxpos, cypos){
                context.drawImage(myImage,xpos,ypos,framesize,framesize,cxpos,cypos,framesize,framesize);
            };
            myImage.src = "../img/spritesheet.png";
       
            loadMuncher(xpos, ypos, cxpos, cypos); //Once the page has loaded, load the muncher to the initial start position


			function loop(){
        		
        		context.clearRect(0,0,drawingCanvas.width, drawingCanvas.height);
        			
        		if(direction == "left"){
        			cxpos -= 64;

					if(xpos == 64 && ypos == 64){
        				xpos = 128;
        			}
        			else{
        				xpos = 64;
        			}
        		}
        		else if(direction == "right"){
        			cxpos += 64;

        			if(xpos == 0 && ypos == 0){
        				xpos = 128;
        			}
        			else{
        				xpos = 0;
        			}
        		}
        		else if(direction == "up"){
        			cypos -= 64;

        			if(xpos == 0 && ypos == 192){
        				xpos = 128;
        			}
        			else{
        				xpos = 0;
        			}
        		}
        		else{
        			cypos += 64;

        			if(xpos == 0 && ypos == 128){
        				xpos = 128;
        			}
        			else{
        				xpos = 0;
        			}
        		}

        		document.onkeydown = function(evt){

        			evt = evt || window.event;
        			switch(evt.keyCode){
        				case 37:
        				    
        				    if(direction != "left"){
        				    	xpos = 64;
        				    	ypos = 64;
        				    }
        					direction = "left";
        					break;

        				case 38:

        					if(direction != "up"){
        				    	xpos = 0;
        				    	ypos = 192;
        				    }
        				
        					direction = "up";

        					break;

        				case 39:

        					if(direction != "right"){
        				    	xpos = 0;
        				    	ypos = 0;
        				    }
        				
        					direction = "right";
        					break;

        				case 40:

        					if(direction != "down"){
        				    	xpos = 0;
        				    	ypos = 128;
        				    }
        				
        					direction = "down";
        					break;
        			}
        		}
                loadMuncher(xpos, ypos, cxpos, cypos); //reload image to new position on the gameboard
        	}
        	setInterval(loop,1000);
        }
        