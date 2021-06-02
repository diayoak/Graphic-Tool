class App {
  constructor(target) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = 0;
    this.canvas.style.top = 0;
    this.canvas.style.zIndex = 10;

    this.ctx = this.canvas.getContext('2d');
    this.target = document.querySelector(target);
    this.target.append(this.canvas);
    this.canvas.width = this.target.offsetWidth;
    this.canvas.height = this.target.offsetHeight;

    let brush = new BrushTool(this);
    let pen = new PenTool(this);
    let select = new SelectTool(this);
    let editPointer = new EditPointer(this);
    let polygon = new PolygonTool(this);
    let text = new TextTool(this);

    this.layouts = [];
    this.toolList = [brush, pen, select, editPointer, text, polygon];
    this.lineColor = '#000000';

    this.init();
  }

  get tool() {
    return $('.tool-item.active')[0].dataset.value;
  }

  init() {
    // setting
    this.clear();
    this.guideLine();

    // Event Handler
    this.target.on('mousedown', this.downHandler.bind(this));
    window.on('mousemove', this.moveHandler.bind(this));
    window.on('mouseup', this.upHandler.bind(this));
    window.on('keydown', this.keyHandler.bind(this));
  }

  downHandler() {
    this.toolList[this.tool].down();
    this.reDraw();
  }

  moveHandler() {
    this.toolList[this.tool].move();
    this.reDraw();
  }

  upHandler() {
    this.toolList[this.tool].up();
    this.reDraw();
  }

  keyHandler() {
    this.toolList[this.tool].key();
    this.reDraw();
  }

  reDraw() {
    this.clear();
    this.guideLine();
    this.layoutMerge();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  guideLine() {
    this.ctx.beginPath();
    this.ctx.save();

    for (let i = 0; i < this.canvas.width; i += 18) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
    }

    for (let i = 0; i < this.canvas.height; i += 18) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
    }

    this.ctx.strokeStyle = '#99999940';
    this.ctx.stroke();

    this.ctx.restore();
    this.ctx.closePath();
  }

  layoutMerge() {
    this.ctx.beginPath();
    this.ctx.save();

    for (let i = 0; i < this.layouts.length; i++) {
      this.ctx.drawImage(this.layouts[i].canvas, 0, 0, this.canvas.width, this.canvas.height);
    }

    this.ctx.restore();
    this.ctx.closePath();
  }
}

let app = new App('#workshop .workspace');

$('.tool-item').on('click', function() {
  $('.tool-item').removeClass('active');
  $(this).addClass('active');
});

$(document).on('keydown', function() {
  // switch(event.keyCode) {
  // 	case 66:
  // 		$(".tool-item")[0].click();
  // 		break;
  // 	case 80:
  // 		$(".tool-item")[1].click();
  // 		break;
  // 	case 86:
  // 		$(".tool-item")[2].click();
  // 		break;
  // 	case 65:
  // 		$(".tool-item")[3].click();
  // 		break;
  // 	case 84:
  // 		$(".tool-item")[4].click();
  // 		break;
  // 	case 85:
  // 		$(".tool-item")[5].click();
  // 		break;
  // }
});

$('.input-control input').on('input', function() {
  this.setAttribute('value', this.value);
});

export default App;
