function Circle(x, y, col){
	this.x = x;
	this.y = y;
	this.col = col;

	this.display = function(){
		stroke(this.col);
		fill(this.col);
		ellipse(x,y,80,80);
	}
}