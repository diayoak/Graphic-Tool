class TextTool extends Tool
{
	constructor() {
		super(...arguments);
		this.textarea;
	}

	down() {
 		let position = this.position(event);
 		this.textarea = document.createElement("textarea");

 		this.paintClass.target.append(this.textarea);

 		this.textarea.style.position = "absolute";
 		this.textarea.style.left = (position.x - 4) + "px";
 		this.textarea.style.top = position.y + "px";
 		this.textarea.style.border = "0";
 		this.textarea.style.outline = "none";
 		this.textarea.zIndex = 1000;
	}

	move() {

	}

	up() {
		this.textarea.focus();
	}

	key() {

	}
}