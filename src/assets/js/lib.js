// selector fn
function $(selector_name = "") {
	let selector = [selector_name];

	if (typeof selector_name == "string") {
		selector = Array.from(document.querySelectorAll(selector_name));
	}

	return selector;
}

Object.prototype.addClass = function(className) {
	let arr = this;

	if (!Array.isArray(arr)) {
		arr = [this];
	}

	for (let i = 0; i < arr.length; i++) {
		arr[i].classList.add(className);
	}

	return arr;
}

Object.prototype.removeClass = function(className) {
	let arr = this;

	if (!Array.isArray(arr)) {
		arr = [this];
	}

	for (let i = 0; i < arr.length; i++) {
		arr[i].classList.remove(className);
	}

	return arr;
}

Object.prototype.on = function(type, fn) {
	let arr = this;

	if (!Array.isArray(arr)) {
		arr = [this];
	}

	for (let i = 0; i < arr.length; i++) {
		arr[i].addEventListener(type, fn);
	}

	return arr;
}

Object.prototype.remove = function() {
	let arr = this;

	if (!Array.isArray(arr)) {
		arr = [this];
	}

	for (let i = 0; i < arr.length; i++) {
		arr[i].remove();
	}

	return arr;
}