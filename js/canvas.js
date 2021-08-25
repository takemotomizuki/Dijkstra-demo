
function drawCircle(x,y,circleRad,index){
  ctx.lineWidth="5"
  ctx.beginPath();
  ctx.moveTo(x+circleRad, y);
  ctx.arc(x, y, circleRad, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
  ctx.stroke();
  circleList.push({x:x,y:y,circleRad:circleRad,index:index})
}

function getStartPoint(startCircle,endx,endy){
  let rad = Math.atan2(endy - startCircle.y,endx - startCircle.x);
  let y = Math.sin(rad) * startCircle.circleRad + startCircle.y;
  let x = Math.cos(rad) * startCircle.circleRad + startCircle.x;
  return {x,y}
}

function createCircle1(){
  let startWidth = 490;
  let circleRad = 50;
  let x = canvas.width;
  let y = canvas.height;
  x = canvas.width;
  // start & end
  ctx.font = "56px serif";
  ctx.fillText("S", startWidth-16, y/2+24);
  ctx.fillText("E", x-startWidth-16, y/2+24);
  drawCircle(startWidth,y/2,circleRad,0);
  drawCircle(x-startWidth, y/2,circleRad,4);

  // others
  drawCircle(x/2, y/4,circleRad,1);
  drawCircle(x/2, y/2,circleRad,2);
  drawCircle(x/2, y*3/4,circleRad,3);
}

function mousedown(event){
  const point = {
    x: event.offsetX,
    y: event.offsetY
  };
  preImage = ctx.getImageData(0,0,canvas.width,canvas.height);
  for(let circle of circleList){
    if(Math.pow(point.x-circle.x,2) + Math.pow(point.y-circle.y,2) <= Math.pow(circle.circleRad,2)){
      startCircle = circle
      draw = true;
    }
  }
  preImageMove = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function mousemove(event){
  let endx = event.offsetX;
  let endy = event.offsetY;
  if(!endCircle || Math.pow(endx-endCircle.x,2) + Math.pow(endy-endCircle.y,2) > Math.pow(endCircle.circleRad,2)){
    endCircle = null;
    for(let circle of circleList){
      if(Math.pow(endx-circle.x,2) + Math.pow(endy-circle.y,2) <= Math.pow(circle.circleRad,2)){
          endCircle = circle
          break;
      }
    }
  }
  if(draw && Math.pow(endx-startCircle.x,2) + Math.pow(endy-startCircle.y,2) > Math.pow(startCircle.circleRad,2)){
    let startPoint = getStartPoint(startCircle,endx,endy);
    if(endCircle && Math.pow(endx-endCircle.x,2) + Math.pow(endy-endCircle.y,2) <= Math.pow(endCircle.circleRad,2)){
      endx = getStartPoint(endCircle,startCircle.x,startCircle.y).x;
      endy = getStartPoint(endCircle,startCircle.x,startCircle.y).y;
      startPoint = getStartPoint(startCircle,endx,endy);
    }
    ctx.putImageData(preImageMove,0,0);
    ctx.beginPath();                
    ctx.moveTo(startPoint.x,startPoint.y);     
    ctx.lineTo(endx,endy); 
    ctx.stroke(); 
  }
}
function mouseup(){
  draw = false;
  if(endCircle){
    preImage = ctx.getImageData(0,0,canvas.width,canvas.height);
    movable[startCircle.index].push(endCircle.index);
    console.log(movable);
  }
  ctx.putImageData(preImage,0,0);
}

function touchstart(event){
  startx = event.offsetX;
  starty = event.offsetY;
  draw = true;
}
function touchmove(event){
  if(draw){
      //ctx.save();   
      ctx.beginPath();                
      ctx.moveTo(startx, starty);    
      ctx.lineTo(event.offsetX,event.offsetY);        
      ctx.stroke(); 
  }
}
function touchend(){
  draw = false;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
circleList = [];
createCircle1();

var startCircle;
var endCircle;
var draw = false;
var preImage;
var preImageMove;

var movable = new Array(5);
movable[0]
for(node of movable){
  node = new Array(0);
}

var rate = 1/canvas.width

canvas.addEventListener("mousedown",mousedown,false);
canvas.addEventListener("mousemove",mousemove,false);
canvas.addEventListener("mouseup",mouseup,false);
canvas.addEventListener("touchstart",touchstart,false);  
canvas.addEventListener("touchmove",touchmove,false);   
canvas.addEventListener("touchend",touchend,false);    
