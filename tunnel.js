var height = 768;
var width = 1366;

var cX = width/2;
var cY = height/2;

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// offset from top left corner of canvas
var mx = -60;
var my = -120;

var paused = false;

var l = []; // array of lights

var d; // depth layers
var dk; // darkness
var s; // speed
var dChange;
var animS = 45;
var mR; // max radius
var follow = false;

var r = 40; // radius

var clr = 0; // colour of first circle

var cC = 10; // colour change

var w = 45;


function genCircle () {
	// distance, radius, x, y, colour, width
	l.push([d, r, cX, cY, clr, w]);
    if (clr >= 360) {
    	clr = cC;
    }
    else {
    	clr += cC;
    }
}

function setFollow() {
	if (!follow) {
		follow = true;
		document.getElementById('canvas').onmousemove = setMouseLoc;
	}
	else {
		follow = false;
		cX = width/2;
		cY = height/2;
		document.getElementById('canvas').onmousemove = '';
	}
}

var amount = 0;

function setMouseLoc(event) {
    var rect = ctx.canvas.getBoundingClientRect();
    cX = event.clientX;
    cY = event.clientY;
}

function setD (nD) {
	d = nD;
}

function setS (nS) {
	s = nS/100;
}

function setP (nP) {
	p = nP;
}

function setDC (nDC) {
	dChange = nDC;
}

function setRX (nRX) {
	rX = nRX;
}

function setRY (nRY) {
	rY = nRY;
}

function setDK (nDK) {
	dk = nDK/100;
}

function setAS (nAS) {
	pause();
	animS = 252 - nAS;
	pause();
}

function setR (nR) {
	r = nR;
}

setD(document.getElementById('dS').value);
setS(document.getElementById('sS').value);
setDC(document.getElementById('dC').value);
setDK(document.getElementById('dkS').value);
setR(document.getElementById('rS').value);
setFollow();

function road() {
	console.log(l.length);
	amount += 0.00;
    if (amount > 1) {
        amount = 1;
        clearInterval(interval);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	genCircle();
	for(var i = l.length - 1; i > 0; i--){
		if (l[i][1]>= width*0.75) {
			l.splice(i, 1);
		}
		else {
			ctx.lineWidth = l[i][5];
			l[i][5]*=s;
			l[i][5] += 20;
			ctx.beginPath();
		    ctx.arc(
		    	l[i][2], // x
		    	l[i][3], // y
		    	l[i][1]*=s, // r
		    	0, 6.2832);
		    l[i][1]+= 5;
		    l[i][0] -= dChange;
	    	ctx.strokeStyle = "hsl(" + l[i][4]
	    		+ ", 90%, " + (50 - 100*dk*(l[i][0]/d)) + "%)";
	    	ctx.stroke();
		}
	}
}

var interval = setInterval(road, animS);

function pause () {
	if (!paused) {
		paused = true;
		interval = clearTimeout(interval);
	}
	else {
		paused = false;
		interval = setInterval(road, animS);
	}
}

c.onmousedown = pause;
