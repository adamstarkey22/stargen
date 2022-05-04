function generate() {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	
	canvas.width = data.imageWidth;
	canvas.height = data.imageHeight;
	
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	let starsCount = data.starsPer10k * (data.imageWidth * data.imageHeight / 10e3);
	
	let currentColor = new Color();
	let minColor = Color.fromHex(data.minColor);
	let maxColor = Color.fromHex(data.maxColor);
	let maxLuminosity = data.maxLuminosity;
	let threshold = data.threshold;
	let glareFactor = data.glareFactor;
	
	for (let i = 0; i < starsCount; ++i) {
		let x = Math.floor(Math.random() * canvas.width);
		let y = Math.floor(Math.random() * canvas.height);
	/*	
		if (Math.random() < data.upgradePercent) {
			Color.lerp(currentColor, upgradeMinColor, upgradeMaxColor, Math.random());
			context.fillStyle = currentColor.toHex();
			context.fillRect(x, y, 1, 1);
			
			let glareRadius = Math.floor(data.upgradeMinGlareRadius + Math.random() * (data.upgradeMaxGlareRadius - data.upgradeMinGlareRadius));
			
			for (let j = 0; j < glareRadius; ++j) {
				context.globalAlpha = (1 - j / glareRadius) * data.upgradeGlareStrength;
				context.fillRect(x + j + 1, y, 1, 1);
				context.fillRect(x - j - 1, y, 1, 1);
			}
			
			context.globalAlpha = 1;
		}
		
		else {
			Color.lerp(currentColor, minColor, maxColor, Math.random());
			context.fillStyle = currentColor.toHex();
			context.fillRect(x, y, 1, 1);
		}
	*/
	}
}


/*
function generate() {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	
	canvas.width = data.size.width;
	canvas.height = data.size.height;
	
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	let colors = [
		data.colors.color1,
		data.colors.color2,
		data.colors.color3,
		data.colors.color4
	];
	
	let weights = [
		data.colors.color1_weight,
		data.colors.color2_weight,
		data.colors.color3_weight,
		data.colors.color4_weight
	];
	
	for (let i = 0; i < 200; ++i) {
		let x_ = Math.floor(Math.random() * canvas.width);
		let y_ = Math.floor(Math.random() * canvas.height);
		
		let r = 15;
		
		let ind = weightedRandomIndex(colors, weights, Math.random());
		
		if (ind == 0) {
			context.fillStyle = "#222222";
			
			for (let x = -r; x < r + 1; ++x) {
				for (let y = -r; y < r + 1; ++y) {
					let d = Math.hypot(x, y*5);
					let a = 1 - Math.min(d / r, 1);
					
					context.globalAlpha = a / 3;
					context.fillRect(x_ + x, y_ + y, 1, 1);
				}
			}
		}
		
		context.fillStyle = colors[ind];
		
		context.globalAlpha = 1;
		context.fillRect(x_, y_, 1, 1);
	}
}


function weightedRandom(items, weights, random) {
	let sum = 0;
	
	weights.forEach(i => sum += i);
	
	let amount = sum * random;
	
	for (let i = 0; i < items.length; ++i) {
		amount -= weights[i];
		
		if (amount <= 0) return items[i];
	}
	
	throw new RangeError("invalid range");
}


function weightedRandomIndex(items, weights, random) {
	let sum = 0;
	
	weights.forEach(i => sum += i);
	
	let amount = sum * random;
	
	for (let i = 0; i < items.length; ++i) {
		amount -= weights[i];
		
		if (amount <= 0) return i;
	}
	
	throw new RangeError("invalid range");
}
*/