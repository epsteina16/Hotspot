function Round(){
	this.x = random(width);
	this.y = random(height);
	this.col = color(255);
	this.score = 0;
	this.size = Math.sqrt((width * height)/1500);
	this.hotspot = new Hotspot(this.x,this.y);

	this.clicked = function(){
		background(255);
		var distance = dist(mouseX, mouseY, this.x, this.y);
		if (distance <= this.size){
			this.col = color(0,255,0);
			var circle = new Circle(mouseX, mouseY, this.col, this.size);
			circle.display();
			this.score = 100;
		} else{
			var maxDistance = Math.max(dist(0,0,this.x,this.y),dist(width,0,this.x,this.y), 
				dist(width,height,this.x,this.y), dist(0, height,this.x, this.y));
			var proximity = distance / maxDistance;
			var red = 255 - (255 * proximity);
			var blue = 255 * proximity;
			this.col = color(red, 0, blue);
			var circle = new Circle(mouseX, mouseY, this.col, this.size);
			circle.display();
			if ((100 - (100 * proximity)) > this.score){
				this.score = 100 - (100 * proximity);
			}
		}
	}

	this.roundScore = function(){
		return this.score;
	}

	this.isOver = function(){
		if (this.score == 100){
			return true;
		} else{
			return false;
		}
	}
}