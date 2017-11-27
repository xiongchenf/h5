const Transform = {
	init(canvas) {
		let that = this;
		this.canvas = canvas;
		this.container = document.getElementById('container');
		this.addEvent(this.container, 'mousedown', (e) => {
			that.mousedown(e);
		}, false);
		this.addEvent(this.container, 'mouseup', (e) => {
			that.mouseup(e);
		}, false);
	},
	mousedown(e) {
		var e = e || window.event;
		this.sX = e.x;
		this.sY = e.y;
		this.addEvent(this.container, 'mousemove',  this.mousemove, false);
	},
	mouseup(e) {
		var e = e || window.event;
		this.sX = null;
		this.sY = null;
		this.removeEvent(this.container, 'mousemove', this.mousemove, false);
	},

	mousemove(e) {
		let that = Transform;
		var e = e || window.event;
		var dx = that.sX - e.x;
		var dy = that.sY - e.y;
		that.canvas.style.transform = "rotateX("+(dy/4)+"deg)";
	},

	addEvent(elem,event,fn) {
	    if(elem.addEventListener) {  
	        elem.addEventListener(event,fn,false);  
	    }else if (elem.attachEvent) {  
	        elem.attachEvent('on'+event,fn);  
	    }else{  
	        elem['on'+event]=fn;  
	    }  
	},

	removeEvent(element,type,handler) {   /*Chrome*/
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.deattachEvent) {               /*IE*/
			element.deattachEvent('on' + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
};

