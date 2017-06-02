function Hotspot(x,y){
	this.x = x
	this.y = y

	var touching = function(x,y,r){
		if (dist(x,y,x,y) <= r){
			return true;
		} 
		return false;
	}

}