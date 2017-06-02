function Circle(x, y, col, size){
	this.x = x;
	this.y = y;
	this.col = col;
	this.size = size

	this.display = function(){
		stroke(this.col);
		fill(this.col);
		ellipse(x,y,this.size,this.size);
	}
}