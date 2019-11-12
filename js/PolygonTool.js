class PolygonTool extends Tool
{
	constructor() {
		super(...arguments);
	}

	down() {
		if (this.focus === false) {
			this.focus = this.createLayout("brush");
			this.layouts[this.focus].pointList = [this.position(event)];
			this.draw(this.layouts[this.focus]);
		}
	}

	move() {
		if (this.focus !== false) {
			this.layouts[this.focus].pointList[1] = this.position(event);
			this.layouts[this.focus].datas = this.convert(this.layouts[this.focus]);
			this.draw(this.layouts[this.focus]);
		}
	}

	up() {
		if (this.focus !== false) {
			this.layouts[this.focus].pointList[1] = this.position(event);
			this.layouts[this.focus].datas = this.convert(this.layouts[this.focus]);
			this.draw(this.layouts[this.focus]);
			this.focus = false;
		}
	}

	stroke(layout_info) {
		let canvas = layout_info.canvas;
		let ctx = canvas.getContext("2d");
		let datas = layout_info.datas;

		ctx.beginPath();
		ctx.save();

		for (let i = 1; i < datas.length; i++) {
			let value1 = datas[i - 1];
			let value2 = datas[i];

			ctx.moveTo(value1.x, value1.y);
			ctx.lineTo(value2.x, value2.y);
		}
		ctx.lineCap = "round";
		ctx.lineWidth = layout_info.option.lineWidth;
		ctx.strokeStyle = layout_info.option.lineColor;
		ctx.stroke();

		ctx.restore();
		ctx.closePath();
	}

	convert(layout_info) {
		let n = layout_info.option.polygon;
		let theta = 2 * Math.PI / n;

		let value1 = this.layouts[this.focus].pointList[0];
		let value2 = this.layouts[this.focus].pointList[1];

		let w = value2.x - value1.x;
		let h = value2.y - value1.y;
		let size = Math.sqrt(Math.pow(value2.x - value1.x, 2) + Math.pow(value2.y - value1.y, 2));

		let arr = [];

		for (let i = 0; i <= n + 1; i++) {
			let x = w * Math.cos(theta * (i + 1)) - h * Math.sin(theta * (i + 1));
			let y = h * Math.cos(theta * (i + 1)) + w * Math.sin(theta * (i + 1));

			arr.push({x: value1.x + x, y: value1.y + y});
		}

		return arr;
	}
}