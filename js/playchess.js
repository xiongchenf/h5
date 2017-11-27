var Play = {
	impY: -1,
	impX: -1,
	chessArr: [],
	first: true,
	init(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.bindEvents();
		this.resetArr();
	},
	bindEvents() {
		this.canvas.addEventListener('click', (e) => {
			var ol = e.target.offsetLeft,
			ot = e.target.offsetTop,
			x= e.x,
			y= e.y;
			this.pX = x - ol;
			this.pY = y - ot;
			this.pointTo();
		}, false);

		this.canvas.addEventListener('mousemove', (e) => {
			var ol = e.target.offsetLeft,
			ot = e.target.offsetTop,
			x= e.x,
			y= e.y;
			this.mpX = x - ol;
			this.mpY = y - ot;
			this.movefTo();
		}, false)
	},

	resetArr() {
		for(var i = 0; i < 15; i++) {
			this.chessArr[i] = [];
			for(var j = 0;j <15; j++) {
				var o = {};
				o.s = false;
				o.c = -1;
				// 白棋子0 黑棋子 1
				this.chessArr[i][j] = o;
			}
		}
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
		if(!this.first) {
			this.ctx.fillStyle = 'rgb(0, 0, 0)';
			this.chessArr[this.cpX][this.cpY]['c'] = 1;
			fl = 1;
		} else {
			this.ctx.fillStyle = 'rgb(255, 255, 255)';
			this.chessArr[this.cpX][this.cpY]['c'] = 0;
			fl = 0;
		}
		this.first = !this.first;
		this.ctx.arc(this.cpX * 80 + 39, this.cpY * 80 + 39, 34, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.closePath();
		this.chessArr[this.cpX][this.cpY]['s'] = true;
		this.checkend(this.cpX, this.cpY, fl);
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
	}
};