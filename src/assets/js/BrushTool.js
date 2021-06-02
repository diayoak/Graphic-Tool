class BrushTool extends Tool {
  constructor() {
    super(...arguments);
  }

  down() {
    if (this.focus === false) {
      this.focus = this.createLayout('brush');
      this.layouts[this.focus].datas.push(this.position(event));
      this.draw(this.layouts[this.focus]);
    }
  }

  move() {
    if (this.focus !== false) {
      this.layouts[this.focus].datas.push(this.position(event));
      this.draw(this.layouts[this.focus]);
    }
  }

  up() {
    if (this.focus !== false) {
      this.layouts[this.focus].datas.push(this.position(event));
      this.draw(this.layouts[this.focus]);
      this.focus = false;
    }
  }

  stroke(layout_info) {
    let canvas = layout_info.canvas;
    let ctx = canvas.getContext('2d');
    let datas = layout_info.datas;

    ctx.beginPath();
    ctx.save();

    for (let i = 1; i < datas.length; i++) {
      let value1 = datas[i - 1];
      let value2 = datas[i];

      ctx.moveTo(value1.x, value1.y);
      ctx.lineTo(value2.x, value2.y);
    }
    ctx.lineCap = 'round';
    ctx.lineWidth = layout_info.option.lineWidth;
    ctx.strokeStyle = layout_info.option.lineColor;
    console.log(layout_info.option.lineColor);
    ctx.stroke();

    ctx.restore();
    ctx.closePath();
  }

  drawPath(canvas, layout_info) {
    let ctx = canvas.getContext('2d');
    let datas = layout_info.datas;

    ctx.beginPath();
    ctx.save();

    for (let i = 1; i < datas.length; i++) {
      let value1 = datas[i - 1];
      let value2 = datas[i];

      ctx.moveTo(value1.x, value1.y);
      ctx.lineTo(value2.x, value2.y);
    }
    ctx.lineCap = 'round';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4f7fff';
    ctx.stroke();

    ctx.restore();
    ctx.closePath();
  }
}

export default BrushTool;
