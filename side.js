
//Colors-------------------------
red       = "rgb(255, 0, 0)";
green     = "rgb(0, 255, 0)";
blue      = "rgb(0, 0, 255)";
yellow    = "rgb(255, 255, 0)";
pink      = "rgb(255, 192, 203)";
violet    = "rgb(238, 130, 238)";
indigo    = "rgb(75, 0, 130)";
turquoise = "rgb(0, 245, 255)";
cyan      = "rgb(0, 255, 255)";
orange    = "rgb(255, 165, 0)";
white     = "rgb(255, 255, 255)";
black     = "rgb(0, 0, 0)";
//-------------------------------
//Keycodes-----------------------
up    = 38;
down  = 40;
left  = 37;
right = 39;
space = 32;
w     = 87;
a     = 65;
s     = 83;
d     = 68;
//-------------------------------

let canvas = document.getElementById("ball");
let context2D = canvas.getContext("2d");
let s2;
let v;
let t;
let totalWidth = canvas.width;
let totalHeight = canvas.height;
let pi = Math.PI;
let FPS = 60;
let theAnimation = setInterval(update, 1000/FPS);//Mitt Drawgrej
let p1Angle;
let p2Angle;
let tomte = document.getElementById("tomte");
let p1X = 200; // Tomte 1 startPos
let p1Y = totalHeight - 125;
let p2X= totalWidth-264; // Tomte 2 startPos
let p2Y=totalHeight - 125;
let v0Y; // Vinklar
let v0X; // Vinklar
let g;
let v0;
let sy; //Avstånd från marken
let sx; // Avstånd från skjutpunkt i Xled
let xPos; // Bollens X position
let yPos; // Bollens Y position
let balls =[]; // Array med bollar
let p1HP = 100;
let p2HP = 100;
let p1Win = false;
let p2Win = false;
let ballSpeed = 100;
let p1AimY;
let p1AimX;
let p1AimV0;
let p1AimV0Y;
let p1AimV0X;
let p1AimSy;
let p1AimSx;

//-------Irrelevant------------------------------------------
function circle(x, y, r, color) 
{
  context2D.fillStyle = color;
  context2D.beginPath();
  context2D.arc(x, y, r, 0, Math.PI * 2, true);
  context2D.closePath();
  context2D.fill();
}
function rectangle(x, y, width, height, color) 
{
  context2D.fillStyle = color;
  context2D.fillRect(x, y, width, height);
}
function cos(angle)
{
  return Math.cos(angle);
}
function sin(angle)
{
  return Math.sin(angle);
}
function tan(angle)
{
  return Math.tan(angle);
}
function clearScreen()//Clearar skärmen
{
  context2D.clearRect(0, 0, totalWidth, totalHeight);
}
//------------------------------------------------------------


let moveP1 = {//Move tomte 1
	right: false,
	left: false
}
let moveP2 = {//Move tomte 2
	right: false,
	left: false
}
let aimP1 = { //Aim tomte 1
	right: false,
	left: false
}
let aimP2 = { //Aim tomte 2
	right: false,
	left: false
}

function start()
{
rectangle(0,0,totalWidth,totalHeight, "green");//Ritar ut i början
context2D.drawImage(tomte, p1X, p1Y);//Ritar ut i början
context2D.drawImage(tomte, p2X, p2Y);//Ritar ut i början
  	g     = -9.82;
  	g2     = -9.82;
  	v0    = 60;
  	v02 = 20;
  	t     = 0;
  	t2 = 0.3;
  	sx = v0Y * t + g*t*t;
	p2Alpha =((p2Angle/180)*pi);
	p1Alpha =((p1Angle/180)*pi);
	p1Angle = 20;
	p2Angle = 20;
}


function drawBall(ballObj){
	if (ballObj.color == "white") {
	ballObj.v0X = cos(ballObj.p2Alpha) * ballObj.v0 * -1;
	ballObj.v0Y = sin(ballObj.p2Alpha) * ballObj.v0;
	} else{
	ballObj.v0X = cos(ballObj.p1Alpha) * ballObj.v0;
	ballObj.v0Y = sin(ballObj.p1Alpha) * ballObj.v0;
	}
	ballObj.sy = ballObj.v0Y*ballObj.t+(ballObj.g*(ballObj.t*ballObj.t))/2;
	ballObj.y = totalHeight - ballObj.sy - 100;
	ballObj.sx = ballObj.v0X*ballObj.t;
	ballObj.xPos = ballObj.sx + ballObj.x + 32;
	ballObj.yPos = ballObj.y;
	
	circle((ballObj.xPos), (ballObj.yPos), 10, ballObj.color);//Projektilen

	
	ballObj.t += 0.1;
	if (ballObj.color == "red") {
		if (ballObj.xPos > p2X && ballObj.xPos < (p2X + tomte.width) && ballObj.yPos > p2Y && ballObj.yPos < (p2Y + 125)) {
			balls.splice(balls.indexOf(ballObj), 1);
			if (p2HP > 5) {
				p2HP -= 6;
			}else if (0 < p2HP && p2HP < 6) {
				p2HP=0;
			} else {
				return p1Win = true;
			}
			let p2HPProcent = p2HP / 100;
		}
	}
	if (ballObj.color == "white") {
		if (ballObj.xPos > p1X && ballObj.xPos < (p1X + tomte.width) && ballObj.yPos > p1Y && ballObj.yPos < (p1Y + 125)) {
			balls.splice(balls.indexOf(ballObj), 1);
			if (p1HP > 5) {
				p1HP -= 6;
			}else if (0 < p1HP && p1HP < 6) {
				p1HP=0;
			} else {
				return p2Win = true;
			}
			let p1HPProcent = p1HP / 100;
		}
	}
	return p1HP, p2HP;
} 

function update()
{
	clearScreen(); //Clearar skärmen mellan varje frame
	rectangle(0,0,totalWidth,totalHeight,"green");//Min vackra gröna bakgrund

	if (moveP1.right && p1X < (totalWidth - tomte.width)) p1X = p1X + 3;// Smooth Movement i sidled för Tomte 1
	if (moveP1.left && p1X > 0) p1X = p1X - 3;// Smooth Movement i sidled för Tomte 1

	if (moveP2.right && p2X < (totalWidth - tomte.width)) p2X = p2X + 3;// Smooth Movement i sidled för Tomte 2
	if (moveP2.left && p2X > 0) p2X = p2X - 3;// Smooth Movement i sidled för Tomte 2


	//------Aim Tomte 1--------------------
	if (aimP1.right && p1Angle > 0) {
			p1Angle--;
	}
	if (aimP1.left && p1Angle < 180) {
			p1Angle++;
	}
	//------Aim Tomte 2--------------------
	if (aimP2.right && p2Angle > 0) {
			p2Angle--;
	}
	if (aimP2.left && p2Angle < 180) {
			p2Angle++;
	}
	//-------------------------------------
	
	context2D.drawImage(tomte, p1X, p1Y);//Tomte 1
	context2D.drawImage(tomte, p2X, p2Y);//Tomte 2

	let p1HPProcent = p1HP / 100;
	let p2HPProcent = p2HP / 100;
  	p1AimX = p1X;
	p1AimV0 = ballSpeed;
	p1Alpha = (((p1Angle - 90)/180)*pi);
	p1AimV0Y = p1AimV0 * cos(p1Alpha);
	p1AimV0X = p1AimV0 * sin(p1Alpha) * -1;
	p1AimSy = p1AimV0Y*t2+(g2*t2*t2)/2;
  	p1AimY = totalHeight - p1AimSy;
  	p1AimSx = p1AimV0X*t2;

  	p2AimX = p2X;
	p2AimV0 = ballSpeed;
	p2Alpha = (((p2Angle - 90)/180)*pi);
	p2AimV0Y = p2AimV0 * cos(p2Alpha);
	p2AimV0X = p2AimV0 * sin(p2Alpha);
	p2AimSy = p2AimV0Y*t2+(g2*t2*t2)/2;
  	p2AimY = totalHeight - p2AimSy;
  	p2AimSx = p2AimV0X*t2;





	balls.forEach(element=> {
		drawBall(element);
	});
	context2D.strokeStyle = black;
	context2D.lineWidth = 2;
	context2D.strokeRect(p1X-10, p1Y-15, 84,14);
	rectangle(p1X-8, p1Y-13, 80 * p1HPProcent, 10, red);
	context2D.strokeStyle = black;
	context2D.lineWidth = 2;
	context2D.strokeRect(p2X-10, p2Y-15, 84,14);
	rectangle(p2X-8, p2Y-13, 80* p2HPProcent, 10, red);

  	circle(p1AimSx + p1AimX + 32, p1AimY -100, 5, "black");//Tomte 1 aim hjälp
  	circle(p2AimSx + p2AimX + 32, p2AimY -100, 5, "black");//Tomte 1 aim hjälp

	if (p1Win) {
		context2D.font = "30px Arial";
		context2D.fillText("Player 1 Wins!!!", 600, 335);
		clearInterval(theAnimation);
	}
	if (p2Win) {
		context2D.font = "30px Arial";
		context2D.fillText("Player 2 Wins!!!", 600, 335);
		clearInterval(theAnimation);
	}
}
document.addEventListener("keydown", function(e){ // Smooth Movement i sidled för Tomte 1
	switch(e.key){
		case "d":
		moveP1.right = true;
		break;
		case "a":
		moveP1.left = true;
		break;
		case "D":
		moveP1.right = true;
		break;
		case "A":
		moveP1.left = true;
		break;
		case "w":
		aimP1.right = true;
		break;
		case "s":
		aimP1.left = true;
		break;
		case "W":
		aimP1.right = true;
		break;
		case "S":
		aimP1.left = true;
		break;
	}
});
document.addEventListener("keyup", function(e){ // Smooth Movement i sidled för Tomte 1
	switch(e.key){
		case "d":
		moveP1.right = false;
		break;
		case "a":
		moveP1.left = false;
		break;
		case "D":
		moveP1.right = false;
		break;
		case "A":
		moveP1.left = false;
		break;
		case "w":
		aimP1.right = false;
		break;
		case "s":
		aimP1.left = false;
		break;
		case "W":
		aimP1.right = false;
		break;
		case "S":
		aimP1.left = false;
		break;
	}
});
document.addEventListener("keydown", function(e){ // Smooth Movement i sidled för Tomte 2
	switch(e.key){
		case "ArrowRight":
		moveP2.right = true;
		break;
		case "ArrowLeft":
		moveP2.left = true;
		break;
		case "ArrowUp":
		aimP2.right = true;
		break;
		case "ArrowDown":
		aimP2.left = true;
		break;
	}
});
document.addEventListener("keyup", function(e){ // Smooth Movement i sidled för Tomte 2
	switch(e.key){
		case "ArrowRight":
		moveP2.right = false;
		break;
		case "ArrowLeft":
		moveP2.left = false;
		break;
		case "ArrowUp":
		aimP2.right = false;
		break;
		case "ArrowDown":
		aimP2.left = false;
		break;
	}
});

document.addEventListener("keydown", function (e) { // Skjuter iväg en projektil
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 32) { //space key
		let ball = {
			x: p1X,
			y: p1Y,
			p2X: p2X,
			p2Y: p2Y,
			g: -9.8,
			v0: (ballSpeed),
			p1Alpha: ((p1Angle / 180)* pi),
			t: 0,
			v0Y: v0*cos(p1Alpha),
			v0X: v0*sin(p1Alpha) * -1,
			color: "red"
		}
		balls.push(ball);
    }
});
document.addEventListener("keydown", function (e) { // Skjuter iväg en projektil
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) { //shift key
		let ball2 = {
			x: p2X,
			y: p2Y,
			p1X: p1X,
			p1Y: p1Y,
			g: -9.8,
			v0: (ballSpeed),
			p2Alpha: ((p2Angle/180)*pi),
			t: 0,
			v0Y: v0 * cos(p2Alpha),
			v0X: v0 * sin(p2Alpha) * -1,
			color: "white"
		}
		balls.push(ball2);
    }
});
window.requestAnimationFrame(start);