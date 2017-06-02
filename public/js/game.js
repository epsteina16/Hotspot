var level = 0, roundCount = 1, score = 0;
var size = 80;
var round;
var clicked = false;
var start, scoreDiv, header, howto, roundDiv, timer, end, endScore;

var time = 0;
var roundTimer = 0;

var d = new Date();

//setup
function setup(){
	createCanvas(windowWidth,windowHeight);
	
	//set up loading screen
	howto = createDiv("How to play: For each round you have 5 seconds to guess where the hotspot is on the screen. \
	Click the screen with the mouse to see how close you are to the hotspot. Red means close, blue far, and green means you hit it! \
	At the end of the 5 seconds for each round, you get a certain number of points between 0 and 100 that relates \
	to how close you were to finding the spot. If you hit the spot before 5 seconds is up, you move to the next round. \
	There are 5 rounds.");
	howto.id('howto');

	start = createDiv("Press here to start.");
	start.id('start');

	header = createDiv("Hotspot");
	header.position(10,10);
	header.style('font-size', '20px');

	scoreDiv = createDiv("Score: 0");
	scoreDiv.position(10, 40);

	roundDiv = createDiv("Round: 1");
	roundDiv.position(10, 60);

	timer = createDiv("Time: 5");
	timer.position(10, 80);

	end = createDiv("Game Over. Press here to continue.");
	end.mousePressed(endClicked);
	end.id('end');
	endScore = createDiv("Your score was: " + score);
	endScore.id('endScore');
	end.hide();
	endScore.hide();

	nextRoundLabel = createDiv("Next Round in 3");
	nextRoundLabel.id('nextRoundLabel');
	nextRoundLabel.hide();

	hideForm();

	frameRate(5);
}

//mousepressed event
function mousePressed(){
	if (level == 0){
		level = 1;
		start.hide();
		howto.hide();
		roundCount = 1;
		score = 0;
		time = 0;
		round = new Round();
	} else if (level == 1){
		round.clicked();
	}
}

//end div clicked
function endClicked(){
	if (level == 2){
		level = 0;
		end.hide();
		endScore.hide();
		hideForm();
	}
}

//animation
function draw(){
	time++;
	if (level == 0){
		background(255);
		start.show();
		howto.show();
		score = 0;
		updateScore();
	} else if (level == 2){
		background(255);
		end.show();
		endScore.html("Your score was: " + score);
		endScore.show();
		showForm();
	}
	else if (level == 3){
		if (roundCount > 5){
			level = 2;
		} else{
			roundTimer++;
			updateRoundScreen();
			if (roundTimer >= 15){
				level = 1;
				nextRoundLabel.hide();
				time = 0;
				round = new Round();
			}
		}
	} else{
		updateTime();
		if (roundCount > 5){
			level = 2;
		}
		if (time >= 25 || round.isOver()){
			time = 0;
			background(255);
			roundTimer = 0;
			score += round.roundScore();
			console.log(round.roundScore());
			score = Math.round(Number(score))
			updateScore();
			roundCount++;
			updateRound();
			level = 3;
		}
	}
}

//update score label
function updateScore(){
	scoreDiv.html("Score: " + score);
}

//update round label
function updateRound(){
	roundDiv.html("Round: " + roundCount);
}

//update time label
function updateTime(){
	var displayTime = Math.floor(time/5);
	timer.html("Time: " + (5 - displayTime));
}

//update mid round screen
function updateRoundScreen(){
	nextRoundLabel.show();
	var displayTime = 3 - Math.floor(roundTimer/5);
	nextRoundLabel.html("Next Round in " + displayTime);
}

//hide form
function hideForm(){
	$('#form').css({
		'visibility':'hidden'
	});
}

//show form
function showForm(){
	$('#form').css({
		'visibility': 'visible'
	});
	$('#score_input').val(score);
}