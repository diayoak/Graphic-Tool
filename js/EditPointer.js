class EditPointer extends Tool
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
		this.lineColor = "#4f7fff";
		this.pointSize = 7;
		this.cursor = [
			"nwse-resize", "ns-resize", "nesw-resize",
			"ew-resize", "move", "ew-resize",
			"nesw-resize", "ns-resize", "nwse-resize"
		];
	}

	down() {
		let position = this.position(event);  
		let layouts = this.paintClass.layouts;

		this.paintClass.target.style.cursor = "auto";

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let i = layouts.length - 1; i >= 0; i--) {
			let layout = layouts[i];
			let canvas = layout.canvas;
			let ctx = canvas.getContext("2d");

			let result = this.isPointInPath(layout);

			if (result) {
				this.focus = i;
				break;
			}
		}

		if (this.focus !== false) {
			layouts[this.focus].thisClass.drawPath(this.canvas, layouts[this.focus], true);
		}
	}

	move() {
		let position = this.position(event);  
		let layouts = this.paintClass.layouts;

		this.paintClass.target.style.cursor = "auto";

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


		for (let i = layouts.length - 1; i >= 0; i--) {
			let layout = layouts[i];
			let canvas = layout.canvas;
			let ctx = canvas.getContext("2d");

			let result = this.isPointInPath(layout);

			if (result) {
				layouts[i].thisClass.drawPath(this.canvas, layouts[i]);
				break;
			}
		}

		if (this.focus !== false) {
			layouts[this.focus].thisClass.drawPath(this.canvas, layouts[this.focus], true);
		}
	}

	up() {

	}

	key() {
		this.focus = false;
		this.paintClass.target.style.cursor = "auto";
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	isPointInPath(layout) {
		let canvas = layout.canvas;
		let ctx = canvas.getContext("2d");
		let position = this.position(event);
		let data = ctx.getImageData(position.x, position.y, 1, 1).data;


		return data[3] == 255;
	}
}