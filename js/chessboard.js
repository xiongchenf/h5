const ChessBoard = {
	lineNum: 15, 
	cellSize: 80,
	ctxSize: 1200,
	init(ctx) {
		ctx.lineWidth = 0.5;
		for(var i = 1, l = this.lineNum; i < l; i++) {
			ctx.beginPath();
			ctx.moveTo(this.cellSize * i, 0);
			ctx.lineTo(this.cellSize * i, this.ctxSize);
			ctx.strokeStyle = '#000000';
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, this.cellSize * i);
			ctx.lineTo(this.ctxSize, this.cellSize * i);
			ctx.stroke();
		}
		for(var i = 0, l = this.lineNum; i < l; i++) {
			for(var j = 0, k = this.lineNum; j < k; j++) {
				ctx.beginPath();		
				ctx.fillStyle='rgb(232, 223, 179)';
				ctx.fillRect(i * 80 + 1, j * 80 + 1, 78, 78);
				ctx.closePath();
			}
		}
	}
};

