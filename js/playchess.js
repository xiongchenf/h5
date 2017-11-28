var Play = {
	impY: -1,
	impX: -1,
	icpX: -1,
	icpY: -1,
	chessArr: [],
	stepmove: [],
	first: true,
	init(canvas, ctx) {
		this.canvas = canvas;
		this.resetPlay = document.getElementById('resetPlay');
		this.pullBack = document.getElementById('pullBack');
		this.ctx = ctx;
		this.bindEvents();
		this.resetArr();
	},

	bindEvents() {
		this.addEvent(this.resetPlay, 'click', (e) => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			ChessBoard.init(this.ctx);
			this.resetArr();
		}, false);
		this.addEvent(this.pullBack, 'click', (e) => {
			this.pullBackAction();
		}, false);
		this.addEvent(this.canvas, 'click', (e) => {
			var ol = e.target.offsetLeft,
			ot = e.target.offsetTop,
			x= e.x,
			y= e.y;
			this.pX = x - ol;
			this.pY = y - ot;
			this.pointTo();
		}, false);

		this.addEvent(this.canvas, 'mousemove', (e) => {
			var ol = e.target.offsetLeft,
			ot = e.target.offsetTop,
			x= e.x,
			y= e.y;
			this.mpX = x - ol;
			this.mpY = y - ot;
			this.movefTo();
		}, false);
	},

	resetArr() {
		for(var i = 0; i < 15; i++) {
			this.chessArr[i] = [];
			for(var j = 0;j <15; j++) {
				var o = {};
				o.s = false;
				o.c = -1;
				this.chessArr[i][j] = o;
			}
		}
		this.stepmove = [];
	},

	movefTo() {
		var flag = false;
		this.cmpX = parseInt(this.mpX/40);
		this.cmpY = parseInt(this.mpY/40);
		if(this.cmpX < 0 || this.cmpX > 14) return;
		if(this.cmpY < 0 || this.cmpY > 14) return;
		if(this.cmpX != this.impX || this.cmpY != this.impY) {
			if(this.chessArr[this.cmpX][this.cmpY]['s']) return;
			this.ctx.beginPath();
			this.ctx.fillStyle='rgb(232, 223, 205)';
			this.ctx.fillRect(this.cmpX * 80 + 1, this.cmpY * 80 + 1, 78, 78);
			this.ctx.closePath();
			if(this.chessArr[this.impX]) {
				if(this.chessArr[this.impX][this.impY]['s']) {
					this.impX = this.cmpX;
					this.impY = this.cmpY;
					flag = true;
				}
			} 
			if(flag) return;
			this.ctx.beginPath();
			this.ctx.fillStyle='rgb(232, 223, 179)';
			this.ctx.fillRect(this.impX * 80 + 1, this.impY * 80 + 1, 78, 78);
			this.ctx.closePath();
			this.impX = this.cmpX;
			this.impY = this.cmpY;
		}
	},

	pointTo() {
		this.cpX = parseInt(this.pX/40);
		this.cpY = parseInt(this.pY/40);
		var fl = -1;
		if(this.chessArr[this.cpX][this.cpY]['s']) return;
		if(this.chessArr[this.icpX]) {
			if(this.chessArr[this.icpX][this.icpY]['s']) {
				if(this.first) {
					this.ctx.fillStyle = 'rgb(0, 0, 0)';
				} else {
					this.ctx.fillStyle = 'rgb(255, 255, 255)';
				}
				this.ctx.arc(this.icpX * 80 + 39, this.icpY * 80 + 39, 34, 0, 2 * Math.PI);
				this.ctx.fill();
			}			
		}
		this.ctx.closePath();
		this.ctx.beginPath();
		console.log(this.first);
		if(!this.first) {
			this.ctx.fillStyle = 'rgb(0, 0, 0)';
			this.chessArr[this.cpX][this.cpY]['c'] = 1;
			fl = 1;
		} else {
			this.ctx.fillStyle = 'rgb(255, 255, 255)';
			this.chessArr[this.cpX][this.cpY]['c'] = 0;
			fl = 0;
		}
		var o = {};
		o.x = this.cpX;
		o.y = this.cpY;
		o.c = fl;
		this.stepmove.push(o);
		this.ctx.arc(this.cpX * 80 + 39, this.cpY * 80 + 39, 34, 0, 2 * Math.PI);
		this.ctx.fill();
		this.redcross(this.cpX, this.cpY, this.first);
		this.first = !this.first;
		this.icpX = this.cpX;
		this.icpY = this.cpY;
		this.chessArr[this.cpX][this.cpY]['s'] = true;
		this.checkend(this.cpX, this.cpY, fl);
	},

	pullBackAction() {
		var len = this.stepmove.length;
		if(len == 0) {
			return;
		}
		if(len - 1 == 0) {
			Play.first = true; 
		}
		var o = this.stepmove.pop(), f = false;
		this.chessArr[o.x][o.y]['s'] = false;
		this.chessArr[o.x][o.y]['c'] = -1;
		this.ctx.fillStyle='rgb(232, 223, 179)';
		this.ctx.fillRect(o.x * 80 + 1, o.y * 80 + 1, 78, 78);
		this.ctx.beginPath();
		var ol = this.stepmove[len - 2];
		if(ol) {
			if(ol.c == 0) {
				this.ctx.fillStyle = 'rgb(255, 255, 255)';
				f = true;
			} else {
				this.ctx.fillStyle = 'rgb(0, 0, 0)';
				f = false;
			}
			this.ctx.arc(ol.x * 80 + 39, ol.y * 80 + 39, 34, 0, 2 * Math.PI);
			this.ctx.fill();
			this.redcross(ol.x, ol.y, f);
		}
	},

	redcross(x, y, f) {
		if(!f) {
			this.ctx.strokeStyle = 'rgb(255, 255, 255)';
		} else {
			this.ctx.strokeStyle = 'rgb(0, 0, 0)';
		}
		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.moveTo(x * 80 + 29, y * 80 + 39);
		this.ctx.lineTo(x * 80 + 49, y * 80 + 39);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(x * 80 + 39, y * 80 + 29);
		this.ctx.lineTo(x * 80 + 39, y * 80 + 49);
		this.ctx.stroke();
	},

	checkend(x, y, c) {
		// 往8个方向搜索
		this.checkUp(x, y, c);
		this.checkRight(x, y, c);
		this.checkDown(x, y, c);
		this.checkLeft(x, y, c);
		this.checkLeftUp(x, y, c);
		this.checkRightUp(x, y, c);
		this.checkRightDown(x, y, c);
		this.checkLeftDown(x, y, c);
	},

	checkUp(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			--y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkRight(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			++x;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkDown(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			++y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkLeft(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			--x;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkLeftUp(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			--x;
			--y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkRightUp(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			++x;
			--y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkRightDown(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			++x;
			++y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkLeftDown(x, y, c) {
		var l = 0;
		for(var i = 0, le = 5; i < le; i++) {
			--x;
			++y;
			if(this.checkCore(x, y, c)) {
				l++;
			}
		}
		this.caseend(l, c);
	},

	checkCore(x, y, c) {
		var f = false;
		if(this.chessArr[x]) {
			var upperChess = this.chessArr[x][y];
			if(upperChess) {
				if(upperChess['s'] && upperChess['c'] == c) {
					f = true;
				}
			}
		}
		return f;
	},

	caseend(l, c) {
		if(l >= 4) {
			setTimeout(() => {
				if(c == 0) {
					alert('结束了白棋胜利!');
				} else {
					alert('结束了黑棋胜利!');
				}
			}, 300)
		}
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
};