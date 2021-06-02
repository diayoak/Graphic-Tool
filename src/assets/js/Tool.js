class Tool {
  constructor(paintClass) {
    this.paintClass = paintClass;
    this.width = this.paintClass.canvas.width;
    this.height = this.paintClass.canvas.height;

    this.layouts = [];
    this.focus = false;
    this.isDraw = false;
  }

  get option() {
    return {
      fontSize: fontSize.value,
      lineWidth: borderSize.value,
      lineColor: this.paintClass.lineColor,
      backgroundColor: '#000000',
      polygon: polygonCnt.value,
    };
  }

  position(event) {
    return {
      x: event.pageX - this.paintClass.target.offsetLeft,
      y: event.pageY - this.paintClass.target.offsetTop,
    };
  }

  down() {}

  move() {}

  up() {}

  key() {}

  draw(layout_info) {
    let canvas = layout_info.canvas;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.stroke(layout_info);
    this.fill(layout_info);
  }

  stroke(layout_info) {}

  fill(layout_info) {}

  drawPath(canvas, layout_info) {}

  createLayout(type) {
    let canvas = document.createElement('canvas');

    this.paintClass.target.append(canvas);
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.display = 'none';

    let layout = {
      thisClass: this,
      canvas: canvas,
      type: type,
      datas: [],
      option: Object.assign({}, this.option),
    };

    this.paintClass.layouts.push(layout);

    return this.layouts.push(layout) - 1;
  }

  objectClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default Tool;
