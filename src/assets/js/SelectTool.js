class SelectTool extends Tool
{
	constructor() {
		super(...arguments);

		// 캔버스
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.left = 0;
		this.canvas.style.top = 0;
		this.canvas.style.zIndex = 100;
		
		this.ctx = this.canvas.getContext("2d");
		this.paintClass.target.append(this.canvas);
		this.canvas.width = this.paintClass.target.offsetWidth;
		this.canvas.height = this.paintClass.target.offsetHeight;

		// 마우스 좌표 값
		this._position = [];	

		// 이전 데이터 값 저장
		this.prevDatas = [];

		// 레이아웃 좌표 값
		this.layout_position = {
			top: null,
			bottom: null,
			left: null,
			right: null
		}

		// 리사이징 타입
		this.resizing = false;

		// 옵션
		this.lineColor = "#666666";
		this.pointSize = 7;
		this.cursor = [
			"nwse-resize", "ns-resize", "nesw-resize",
			"ew-resize", "move", "ew-resize",
			"nesw-resize", "ns-resize", "nwse-resize"
		];
	}

	down() {
		if (this.focus === false) {

			// 선택된 레이어 찾기
			let layouts = this.paintClass.layouts;

			for (let i = layouts.length - 1; i >= 0; i--) {
				let layout = layouts[i];

				// let layout_position = this.getLayoutPosition(layout);
				// let result = this.checkInnerPoint(layout_position, this.position(event));
				let result = this.isPointInPath(layout);

				if (result) {
					this.focus = i;
					break;
				}
			}
		}

		if (this.focus !== false) {
			let layout = this.paintClass.layouts[this.focus];
			let layout_position = this.getLayoutPosition(layout);

			this.layout_position = layout_position;
			this.prevDatas = this.objectClone(layout.datas);

			this._position = [this.position(event)];

			this.draw(layout);

			this.resizing = this.cursorHandler(layout);
		}
	}

	isPointInPath(layout) {
		let canvas = layout.canvas;
		let ctx = canvas.getContext("2d");
		let position = this.position(event);
		let data = ctx.getImageData(position.x, position.y, 1, 1).data;


		return data[3] == 255;
	}

	move() {
		if (this.focus !== false) {
			let layout = this.paintClass.layouts[this.focus];

			this.draw(layout);

			this._position[1] = this.position(event);

			if (this.resizing !== false) {
				let option = {
					top: false,
					bottom: false,
					left: false,
					right: false,
					move: false,
				};

				switch (this.resizing) {
					case 0:
						option.top = true;
						option.left = true;
						break;
					case 1:
						option.top = true;
						break;
					case 2:
						option.top = true;
						option.right = true;
						break;
					case 3:
						option.left = true;
						break;
					case 5:
						option.right = true;
						break;
					case 6:
						option.left = true;
						option.bottom = true;
						break;
					case 7:
						option.bottom = true;
						break;
					case 8:
						option.right = true;
						option.bottom = true;
						break;
					default:
						option = {
							top: false,
							bottom: false,
							left: false,
							right: false,
							move: true,
						};
				}
				this.movePoint(layout, option);
			}
		}
	}

	up() {
		this.resizing = false;
	}

	key() {
		this.focus = false;
		this.paintClass.target.style.cursor = "auto";
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw(layout) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawPoint(layout);
		this.cursorHandler(layout);
	}

	movePoint(layout, option = {}) {
		let value1 = this._position[0];
		let value2 = this._position[1];

		for (let i = 0; i < layout.datas.length; i++) {
			if (option.move) {
				layout.datas[i].x = this.prevDatas[i].x + value2.x - value1.x;
				layout.datas[i].y = this.prevDatas[i].y + value2.y - value1.y;

				if (layout.datas[i].control !== undefined) {
					layout.datas[i].control.x1 = this.prevDatas[i].control.x1 + value2.x - value1.x;
					layout.datas[i].control.x2 = this.prevDatas[i].control.x2 + value2.x - value1.x;
					layout.datas[i].control.y1 = this.prevDatas[i].control.y1 + value2.y - value1.y;
					layout.datas[i].control.y2 = this.prevDatas[i].control.y2 + value2.y - value1.y;
				}
			} else {
				if (option.left) {
					let temp1 = this.layout_position.right - Math.floor(value1.x);
					let temp2 = this.layout_position.right - Math.floor(value2.x);
					let temp3 = temp1 == 0 ? 0 : temp2 / temp1;
					layout.datas[i].x = (this.prevDatas[i].x - this.layout_position.right) * temp3 + this.layout_position.right;

					if (layout.datas[i].control !== undefined) {
						layout.datas[i].control.x1 = (this.prevDatas[i].control.x1 - this.layout_position.right) * temp3 + this.layout_position.right;
						layout.datas[i].control.x2 = (this.prevDatas[i].control.x2 - this.layout_position.right) * temp3 + this.layout_position.right;
					}
				}
				if (option.right) {
					let temp1 = this.layout_position.left - Math.floor(value1.x);
					let temp2 = this.layout_position.left - Math.floor(value2.x);
					let temp3 = temp1 == 0 ? 0 : temp2 / temp1;
					layout.datas[i].x = (this.prevDatas[i].x - this.layout_position.left) * temp3 + this.layout_position.left;

					if (layout.datas[i].control !== undefined) {
						layout.datas[i].control.x1 = (this.prevDatas[i].control.x1 - this.layout_position.left) * temp3 + this.layout_position.left;
						layout.datas[i].control.x2 = (this.prevDatas[i].control.x2 - this.layout_position.left) * temp3 + this.layout_position.left;
					}
				}
				if (option.top) {
					let temp1 = this.layout_position.bottom - Math.floor(value1.y);
					let temp2 = this.layout_position.bottom - Math.floor(value2.y);
					let temp3 = temp1 == 0 ? 0 : temp2 / temp1;
					layout.datas[i].y = (this.prevDatas[i].y - this.layout_position.bottom) * temp3 + this.layout_position.bottom;

					if (layout.datas[i].control !== undefined) {
						layout.datas[i].control.y1 = (this.prevDatas[i].control.y1 - this.layout_position.bottom) * temp3 + this.layout_position.bottom;
						layout.datas[i].control.y2 = (this.prevDatas[i].control.y2 - this.layout_position.bottom) * temp3 + this.layout_position.bottom;
					}
				}
				if (option.bottom) {
					let temp1 = this.layout_position.top - Math.floor(value1.y);
					let temp2 = this.layout_position.top - Math.floor(value2.y);
					let temp3 = temp1 == 0 ? 0 : temp2 / temp1;
					layout.datas[i].y = (this.prevDatas[i].y - this.layout_position.top) * temp3 + this.layout_position.top;

					if (layout.datas[i].control !== undefined) {
						layout.datas[i].control.y1 = (this.prevDatas[i].control.y1 - this.layout_position.top) * temp3 + this.layout_position.top;
						layout.datas[i].control.y2 = (this.prevDatas[i].control.y2 - this.layout_position.top) * temp3 + this.layout_position.top;
					}
				}
			}
		}

		layout.thisClass.draw(layout);
		this.draw(layout);
	}

	getPointPosition(layout_position) {
		let width = layout_position.right - layout_position.left;
		let height = layout_position.bottom - layout_position.top;

		return [
			{x: 0, y: 0},
			{x: width / 2, y: 0},
			{x: width, y: 0},

			{x: 0, y: height / 2},
			null,
			{x: width, y: height / 2},

			{x: 0, y: height},
			{x: width / 2, y: height},
			{x: width, y: height},
		];
	}

	drawPoint(layout) {
		let layout_position = this.getLayoutPosition(layout);
		let width = layout_position.right - layout_position.left;
		let height = layout_position.bottom - layout_position.top;
		let point_position = this.getPointPosition(layout_position);

		this.ctx.beginPath();
		this.ctx.save();

		this.ctx.strokeStyle = "#4f7fff";
		this.ctx.strokeRect(layout_position.left, layout_position.top, width, height);

		for (let i = 0; i < point_position.length; i++) {
			if (point_position[i] == null) continue;

			let x = layout_position.left - this.pointSize / 2 + point_position[i].x;
			let y = layout_position.top - this.pointSize / 2 + point_position[i].y;
			this.ctx.strokeRect(x, y, this.pointSize, this.pointSize);
		}

		this.ctx.restore();
		this.ctx.closePath();
	}

	cursorHandler(layout) {
		let layout_position = this.getLayoutPosition(layout);
		let point_position = this.getPointPosition(layout_position);

		this.paintClass.target.style.cursor = "auto";

		for (let i = 0; i < point_position.length; i++) {
			if (point_position[i] == null) continue;

			let x = layout_position.left - this.pointSize / 2 + point_position[i].x;
			let y = layout_position.top - this.pointSize / 2 + point_position[i].y;
			let obj = {
				top: y,
				bottom: y + this.pointSize,
				left: x,
				right: x + this.pointSize
			};

			let result = this.checkInnerPoint(obj, this.position(event));

			if (result) {
				this.paintClass.target.style.cursor = this.cursor[i];
				return i;
			}
		}

		let result = this.checkInnerPoint(layout_position, this.position(event));

		if (result) {
			this.paintClass.target.style.cursor = "move";
			return 4;
		}

		return false;
	}

	getLayoutPosition(layout) {
		let top = 0;
		let bottom = 0;
		let left = 0;
		let right = 0;

		let xList = [];
		let yList = [];

		switch (layout.type) {
			case "brush":
			case "polygon":
				xList = layout.datas.map(target => target.x);
				yList = layout.datas.map(target => target.y);

				top = Math.min.apply(null, yList);
				bottom = Math.max.apply(null, yList);
				left = Math.min.apply(null, xList);
				right = Math.max.apply(null, xList);

				break;
			case "pen":
				let step = 50;
				let arr = [];

				for (let i = 1; i < layout.datas.length; i++) {
					let value1 = layout.datas[i - 1];
					let value2 = layout.datas[i];

					for (let j = 0; j < step; j++) {
						let progress = j / (step - 1);

						let p1 = {
							x: value1.x,
							y: value1.y
						};
						let p2 = {
							x: value1.control.x2,
							y: value1.control.y2
						};
						let p3 = {
							x: value2.control.x1,
							y: value2.control.y1
						};
						let p4 = {
							x: value2.x,
							y: value2.y
						};

						let p5 = this.lineProgress(p1, p2, progress);
						let p6 = this.lineProgress(p2, p3, progress);
						let p7 = this.lineProgress(p3, p4, progress);

						let p8 = this.lineProgress(p5, p6, progress);
						let p9 = this.lineProgress(p6, p7, progress);

						let p10 = this.lineProgress(p8, p9, progress);
						
						arr.push(p10);
					}
				}

				// this.ctx.beginPath();
				// this.ctx.save();

				// for (let i = 0; i < arr.length; i++) {
				// 	this.ctx.moveTo(arr[i].x, arr[i].y);
				// 	this.ctx.arc(arr[i].x, arr[i].y, 8, 0, 2 * Math.PI)
				// }

				// this.ctx.stroke();

				// this.ctx.restore();
				// this.ctx.closePath();

				xList = arr.map(target => target.x);
				yList = arr.map(target => target.y);

				top = Math.min.apply(null, yList);
				bottom = Math.max.apply(null, yList);
				left = Math.min.apply(null, xList);
				right = Math.max.apply(null, xList);

				break;
			default:

		}

		return {top: top, bottom: bottom, left: left, right: right};
	}

	lineProgress(p1, p2, p) {
		let x = p1.x + (p2.x - p1.x) * p;
		let y = p1.y + (p2.y - p1.y) * p;

		return {
			x: x,
			y: y
		}
	}

	checkInnerPoint(layout_position, p) {
		let x_result = layout_position.left <= p.x && p.x <= layout_position.right;
		let y_result = layout_position.top <= p.y && p.y <= layout_position.bottom;
		return x_result && y_result;
	}
}