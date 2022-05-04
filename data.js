"use strict";


const data = (function () {
	let data = {};
	
	Array.from(document.querySelectorAll("[data-name]")).forEach(input => {
		Object.defineProperty(data, input.dataset.name, {
			get: function () {
				if (input.type && input.type == "number")
					return parseFloat(input.value);
				
				return input.value;
			}
		});
	});
	
	return data;
})();


class Color {
	constructor() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 1;
	}
	
	setHex(code) {
		if (code[0] == "#")
			code = code.slice(1);
		
		if (code.length == 8)
			this.r = parseInt(code[0] + code[1], 16) / 255,
			this.g = parseInt(code[2] + code[3], 16) / 255,
			this.b = parseInt(code[4] + code[5], 16) / 255,
			this.a = parseInt(code[6] + code[7], 16) / 255;
		
		else if (code.length == 6)
			this.r = parseInt(code[0] + code[1], 16) / 255,
			this.g = parseInt(code[2] + code[3], 16) / 255,
			this.b = parseInt(code[4] + code[5], 16) / 255,
			this.a = 1;
		
		else if (code.length == 4)
			this.r = parseInt(code[0] + code[0], 16) / 255,
			this.g = parseInt(code[1] + code[1], 16) / 255,
			this.b = parseInt(code[2] + code[2], 16) / 255,
			this.a = parseInt(code[3] + code[3], 16) / 255;
		
		else if (code.length == 3)
			this.r = parseInt(code[0] + code[0], 16) / 255,
			this.g = parseInt(code[1] + code[1], 16) / 255,
			this.b = parseInt(code[2] + code[2], 16) / 255,
			this.a = 1;
		
		else throw new RangeError("invalid hex color");
		
		return this;
	}
	
	toHex() {
		let r = Math.round(this.r * 255);
		let g = Math.round(this.g * 255);
		let b = Math.round(this.b * 255);
		let a = Math.round(this.a * 255);
		
		let r1 = Math.floor(r / 16);
		let g1 = Math.floor(g / 16);
		let b1 = Math.floor(b / 16);
		let a1 = Math.floor(a / 16);
		
		let r2 = r % 16;
		let g2 = g % 16;
		let b2 = b % 16;
		let a2 = a % 16;
		
		return "#" +
			Color.getHexDigit(r1) +
			Color.getHexDigit(r2) +
			Color.getHexDigit(g1) +
			Color.getHexDigit(g2) +
			Color.getHexDigit(b1) +
			Color.getHexDigit(b2) +
			Color.getHexDigit(a1) +
			Color.getHexDigit(a2);
	}
	
	static getHexDigit(number) {
		switch (number) {
			case 10: return "a";
			case 11: return "b";
			case 12: return "c";
			case 13: return "d";
			case 14: return "e";
			case 15: return "f";
			default: return number.toString();
		}
	}
	
	static fromHex(code) {
		return new Color().setHex(code);
	}
	
	static lerp(out, a, b, t) {
		out.r = a.r + (b.r - a.r) * t;
		out.g = a.g + (b.g - a.g) * t;
		out.b = a.b + (b.b - a.b) * t;
		out.a = a.a + (b.a - a.a) * t;
	}
}