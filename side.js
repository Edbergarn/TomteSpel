
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
zero  = 48;
one   = 49;
two   = 50;
three = 51;
four  = 52;
five  = 53;
six   = 54;
seven = 55;
eight = 56;
nine  = 57;
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
let sliderAngle = document.getElementById("id1");
let sliderSpeed = document.getElementById("id2");
let tomte = document.getElementById("tomte");
let p1X = 200;
let p1Y = totalHeight - 125;
let p2X= 1200
let p2Y=totalHeight - 125;
let v0Y;
let v0X;
let g;
let v0;
let alpha;
let sy;
let sx;
let balls =[];

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

function start()
{
rectangle(0,0,totalWidth,totalHeight, "green");//Ritar ut i början
context2D.drawImage(tomte, p1X, p1Y);//Ritar ut i början
context2D.drawImage(tomte, p2X, p2Y);//Ritar ut i början
  s2     = 0;
  g     = -9.82;
  v0    = sliderSpeed.value / 10;
  alpha = pi/(sliderAngle.value / 10);
  t     = 0;

  v0X   = v0*cos(alpha);
  v0Y   = v0*sin(alpha);
}


function drawBall(ballObj){
	ballObj.sy = ballObj.v0Y*ballObj.t+(ballObj.g*ballObj.t*ballObj.t)/2;
	ballObj.y = totalHeight - ballObj.sy;
	ballObj.sx = ballObj.v0X*ballObj.t;
	
	circle((ballObj.sx + ballObj.x + 32), (ballObj.y - 100), 10, ballObj.color);//Projektilen
	
	ballObj.t += 0.1;
}
function update()
{
  clearScreen(); //Clearar skärmen mellan varje frame
  rectangle(0,0,totalWidth,totalHeight,"green");//Min vackra gröna bakgrund

  context2D.drawImage(tomte, p1X, p1Y);//Tomte 1
  context2D.drawImage(tomte, p2X, p2Y);//Tomte 2

  if (moveP1.right && p1X < (totalWidth-64)) p1X = p1X + 3;// Smooth Movement i sidled för Player 1
  if (moveP1.left && p1X > 0) p1X = p1X - 3;// Smooth Movement i sidled för Player 1

  if (moveP2.right && p2X < (totalWidth-64)) p2X = p2X + 3;// Smooth Movement i sidled för Player 1
  if (moveP2.left && p2X > 0) p2X = p2X - 3;// Smooth Movement i sidled för Player 1

  balls.forEach(element=> {
  	drawBall(element);
  });
}
document.addEventListener("keydown", function(e){ // Smooth Movement i sidled för Player 1
	switch(e.key){
		case "d":
		moveP1.right = true;
		break;
		case "a":
		moveP1.left = true;
		break;
	}
});
document.addEventListener("keyup", function(e){ // Smooth Movement i sidled för Player 1
	switch(e.key){
		case "d":
		moveP1.right = false;
		break;
		case "a":
		moveP1.left = false;
		break;
	}
});
document.addEventListener("keydown", function(e){ // Smooth Movement i sidled för Player 1
	switch(e.key){
		case "ArrowRight":
		moveP2.right = true;
		break;
		case "ArrowLeft":
		moveP2.left = true;
		break;
	}
});
document.addEventListener("keyup", function(e){ // Smooth Movement i sidled för Player 1
	switch(e.key){
		case "ArrowRight":
		moveP2.right = false;
		break;
		case "ArrowLeft":
		moveP2.left = false;
		break;
	}
});

document.addEventListener("keydown", function (e) { // Skjuter iväg en projektil
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 32) { //space key
		let ball = {
			x: p1X,
			y: p1Y,
			g: -9.8,
			v0: (sliderSpeed.value / 10),
			alpha: (pi/(sliderAngle.value / 10)),
			t: 0,
			v0Y: v0*cos(alpha),
			v0X: v0*sin(alpha),
			color: "red"
		}
		balls.push(ball);
    }
});
document.addEventListener("keydown", function (e) { // Skjuter iväg en projektil
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 16) { //shift key
		let ball2 = {
			x: p2X,
			y: p2Y,
			g: -9.8,
			v0: (sliderSpeed.value / 10),
			alpha: (pi/((sliderAngle.value /10))),
			t: 0,
			v0Y: v0*cos(alpha),
			v0X: v0*sin(alpha) * -1,
			color: "#FFFFFF"
		}
		balls.push(ball2);
    }
});
window.requestAnimationFrame(start);