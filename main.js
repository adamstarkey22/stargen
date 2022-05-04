let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function generate() {
	canvas.width = data.imageWidth;
	canvas.height = data.imageHeight;
	let fragments = new Uint8ClampedArray(canvas.width * canvas.height * 4);

	const Kc = data.Kc;
	const Kl = data.Kl;
	const Kq = data.Kq;

	let minColor = vec3_create(1.0, 0.5, 0.125);
	let maxColor = vec3_create(0.125, 0.5, 1.0);
	let maxLuminance = data.maxLuminosity;

	let stars = new Array();
	let numStars = data.starsPer10k * (data.imageWidth * data.imageHeight / 10e3);

	for (let i = 0; i < numStars; ++i) {

		let position = [ Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)];
		let color = vec3_create(1, 1, 1);
		vec3_mix(color, minColor, maxColor, Math.random());
		let luminance = Math.random() * maxLuminance;

		let star = {
			position: position,
			color: color,
			luminance: luminance
		};

		stars.push(star);
	}
	console.log("wish me luck");
	let color = vec3_create(0, 0, 0, 1);
	for (let i = 0; i < fragments.length; i += 4) {
		fragments[i + 0] = 0;
		fragments[i + 1] = 0;
		fragments[i + 2] = 0;
		fragments[i + 3] = 255;

		let position = [ (i / 4) % canvas.width, Math.floor(i / 4 / canvas.width) ];
		for(let j = 0; j < stars.length; ++j) {

			let dist = [
				stars[j].position[0] - position[0],
				stars[j].position[1] - position[1]
			];

			let len = Math.sqrt(dist[0] * dist[0] + dist[1] * dist[1]);
			vec3_copy(color, stars[j].color);
			vec3_mul(color, stars[j].luminance);
			if (len != 0) vec3_mul(color, 1 / (Kc + Kl * len + Kq * len * len));
			
			map(color);
			vec3_mul(color, 255);
			fragments[i + 0] += color[0];
			fragments[i + 1] += color[1];
			fragments[i + 2] += color[2];
		}
	}
	
	ctx.putImageData(new ImageData(fragments, canvas.width, canvas.height), 0, 0);
	console.log("ah fuck me mate");
}



function map(color) {
	color[0] = color[0] / (color[0] + 1);
	color[1] = color[1] / (color[1] + 1);
	color[2] = color[2] / (color[2] + 1);
}

function generatepenis() {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	let scale = 2;

	canvas.width = data.imageWidth * scale;
	canvas.height = data.imageHeight * scale;
	ctx.scale(scale, scale);
	
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	
	let starsCount = data.starsPer10k * (data.imageWidth * data.imageHeight / 10e3);
	
	let minColor = vec3_create(1.0, 0.5, 0.125);
	let maxColor = vec3_create(0.125, 0.5, 1.0);
	
	let maxLuminosity = data.maxLuminosity;
	let bloomFac = data.bloomFactor;
	let gamma = data.gamma;
	let exposure = data.exposure;
	let threshold = maxLuminosity / exposure;
	
	for (let i = 0; i < starsCount; ++i) {
		let x = Math.floor(Math.random() * canvas.width);
		let y = Math.floor(Math.random() * canvas.height);
		let luminosity = Math.random() * maxLuminosity;
		
		let color = vec3_create(1, 1, 1);
		vec3_mix(color, minColor, maxColor, Math.random());
		vec3_pow(color, gamma);
		vec3_mul(color, luminosity);

		if (luminosity > threshold) {
			let radius = (luminosity - threshold) * bloomFac;
			for (let j = -radius; j <= radius; ++j) {
				for (let k = -radius; k <= radius; ++k) {
					let gx = x + j;
					let gy = y + k;

					let gcolor = vec3_create(1, 1, 1);
					vec3_copy(gcolor, color);

					let dist = Math.sqrt(j * j + k * k);
					if (dist > radius) continue;

					let atten = 1 / (dist * dist * dist);
					vec3_mul(gcolor, atten);

					map(gcolor, exposure);
					vec3_pow(gcolor, 1 / gamma);
					ctx.fillStyle = vec3_rgbstr(gcolor);
					ctx.fillRect(gx, gy, 1, 1);

				}
			}
		}

		map(color, exposure);
		vec3_pow(color, 1 / gamma);
		ctx.fillStyle = vec3_rgbstr(color);
		ctx.fillRect(x, y, 1, 1);
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