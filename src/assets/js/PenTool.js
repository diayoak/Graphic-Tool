class PenTool extends Tool
{
	constructor() {
		super(...arguments);

		// 클릭된 포인트
		this.focusPoint = false;
	}

	down() {
		if (this.focus === false) {
			this.focus = this.createLayout("pen");
		}

		this.isDraw = true;

		let position = this.position(event);

		position.control = {
			x1: position.x,
			y1: position.y,
			x2: position.x,
			y2: position.y,
		}
		position.apply = false;

		this.layouts[this.focus].datas.push(position);
		this.draw(this.layouts[this.focus]);
	}

	move() {
		if (this.focus !== false) {

			if (this.isDraw) {
				let datas = this.layouts[this.focus].datas;
				let value = datas[datas.length - 1];
				let position = this.position(event);

				value.control = {
					x1: value.x * 2 - position.x,
					y1: value.y * 2 - position.y,
					x2: position.x,
					y2: position.y,
				}
			}

			this.draw(this.layouts[this.focus]);
		}
	}

	up() {
		if (this.focus !== false) {
			if (this.isDraw) {
				let datas = this.layouts[this.focus].datas;
				let value = datas[datas.length - 1];
				let position = this.position(event);

				value.control = {
					x1: value.x * 2 - position.x,
					y1: value.y * 2 - position.y,
					x2: position.x,
					y2: position.y,
				}
				value.apply = true;
			}

			this.draw(this.layouts[this.focus]);

			this.isDraw = false;
		}
	}

	key() {
		if (this.focus !== false) {
			let layout_info = this.layouts[this.focus];

			this.focus = false;
			this.draw(layout_info);
		}
	}

	draw(layout_info) {
		let canvas = layout_info.canvas;
		let ctx = canvas.getContext("2d");

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.stroke(layout_info);
		this.fill(layout_info);

		if (this.focus !== false) {
			this.nextLineView(layout_info);
			this.nextControlPoint(layout_info);
		}
	}

	stroke(layout_info) {
		let canvas = layout_info.canvas;
		let ctx = canvas.getContext("2d");
		let datas = layout_info.datas.filter(x => x.apply);

		ctx.beginPath();
		ctx.save();

		for (let i = 1; i < datas.length; i++) {
			let value1 = datas[i - 1];
			let value2 = datas[i];

			ctx.moveTo(value1.x, value1.y);
			ctx.bezierCurveTo(value1.control.x2, value1.control.y2, value2.control.x1, value2.control.y1, value2.x, value2.y);
		}

		ctx.lineCap = "round";
		ctx.lineWidth = layout_info.option.lineWidth;
		ctx.strokeStyle = layout_info.option.lineColor;
		ctx.stroke();

		ctx.restore();
		ctx.closePath();
	}

	drawPath(canvas, layout_info, type = false) {
		this.drawPathLine(canvas, layout_info);

		if (type) {
			this.drawPathPoint(canvas, layout_info);
		}
	}

	drawPathLine(canvas, layout_info) {
		let ctx = canvas.getContext("2d");
		let datas = layout_info.datas.filter(x => x.apply);

		ctx.beginPath();
		ctx.save();

		for (let i = 1; i < datas.length; i++) {
			let value1 = datas[i - 1];
			let value2 = datas[i];

			ctx.moveTo(value1.x, value1.y);
			ctx.bezierCurveTo(value1.control.x2, value1.control.y2, value2.control.x1, value2.control.y1, value2.x, value2.y);
		}

		ctx.lineCap = "round";
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#4f7fff";
		ctx.stroke();

		ctx.restore();
		ctx.closePath();
	}

	drawPathPoint(canvas, layout_info) {
		let ctx = canvas.getContext("2d");
		let datas = layout_info.datas.filter(x => x.apply);

		ctx.beginPath();
		ctx.save();

		let result = false;

		for (let i = 0; i < datas.length; i++) {
			let value = datas[i];
			let size = 5;

			ctx.moveTo(value.x - size / 2, value.y - size / 2);

			if (this.checkInnerPoint(value, size + 4, this.position(event))) {
				if (event && event.type == "mousedown") {
					// 컨트롤 포인트 클릭
					result = true;
					this.focusPoint = i;
					console.log(this.focusPoint);
				}


				ctx.rect(value.x - (size + 4) / 2, value.y - (size + 4) / 2, (size + 4), (size + 4));
			} else {
				ctx.rect(value.x - size / 2, value.y - size / 2, size, size);
			}

			if (this.focusPoint === i) {
				ctx.rect(value.x - (size + 4) / 2, value.y - (size + 4) / 2, (size + 4), (size + 4));
			}
		}
		console.log(this.focusPoint);

		// ctx.lineCap = "round";
		// ctx.lineWidth = 1;
		ctx.fillStyle = "#4f7fff";
		ctx.fill();

		ctx.restore();
		ctx.closePath();
	}

	checkInnerPoint(value, size, p) {
		let x_result = value.x - size / 2 <= p.x && p.x <= value.x + size / 2;
		let y_result = value.y - size / 2 <= p.y && p.y <= value.y + size / 2;
		return x_result && y_result;
	}

	nextLineView(layout_info) {
		let canvas = layout_info.canvas;
		let ctx = canvas.getContext("2d");
		let datas = this.getLastDatas(layout_info, 2, true);

		ctx.beginPath();
		ctx.save();

		for (let i = 1; i < datas.length; i++) {
			let value1 = datas[i - 1];
			let value2 = datas[i];

			ctx.moveTo(value1.x, value1.y);
			ctx.bezierCurveTo(value1.control.x2, value1.control.y2, value2.control.x1, value2.control.y1, value2.x, value2.y);
		}

		ctx.lineCap = "round";
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#0000FF40";
		ctx.stroke();

		ctx.restore();
		ctx.closePath();
	}

	nextControlPoint(layout_info) {
		let canvas = layout_info.canvas;
		let ctx = canvas.getContext("2d");
		let datas = this.getLastDatas(layout_info, 2);
		let rsize = 2;

		ctx.beginPath();
		ctx.save();

		let value1 = datas[0];
		let value2 = datas[1];

		if (value1) {
			ctx.moveTo(value1.x, value1.y);
			ctx.lineTo(value1.control.x2, value1.control.y2);

			ctx.moveTo(value1.control.x2 + rsize, value1.control.y2);
			ctx.arc(value1.control.x2, value1.control.y2, rsize, 0, 2 * Math.PI);
		}

		if (value2) {
			ctx.moveTo(value2.control.x1, value2.control.y1);
			ctx.lineTo(value2.control.x2, value2.control.y2);

			ctx.moveTo(value2.control.x1 + rsize, value2.control.y1);
			ctx.arc(value2.control.x1, value2.control.y1, rsize, 0, 2 * Math.PI);

			ctx.moveTo(value2.control.x2 + rsize, value2.control.y2);
			ctx.arc(value2.control.x2, value2.control.y2, rsize, 0, 2 * Math.PI);
		}

		ctx.lineCap = "round";
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#0000FF40";
		ctx.stroke();

		ctx.restore();
		ctx.closePath();


		ctx.beginPath();
		ctx.save();

		if (value1) {
			ctx.moveTo(value1.x + rsize, value1.y);
			ctx.arc(value1.x, value1.y, rsize, 0, 2 * Math.PI);
		}

		if (value2) {
			ctx.moveTo(value2.x + rsize, value2.y);
			ctx.arc(value2.x, value2.y, rsize, 0, 2 * Math.PI);
		}


		ctx.fillStyle = "#0000FF40";
		ctx.fill();

		ctx.restore();
		ctx.closePath();
	}

	getLastDatas(layout_info, n, type = false) {
		let datas = layout_info.datas.slice();

		if (!datas.filter(x => !x.apply).length && type) {
			let position = this.position(event);

			position.control = {
				x1: position.x,
				y1: position.y,
				x2: position.x,
				y2: position.y,
			}

			datas.push(position);
		}

		return datas.slice(datas.length - n, datas.length);
	}
}