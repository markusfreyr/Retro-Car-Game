"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = g_canvas.getContext("2d");
var track = track;

var ACCEL = '38';

var distance = 0;
var offset = 0;
var trackSec = 0;
var curvature = 0;
var trackCurv = 0;
var targetCurv = 0;
var playerCurv = 0;
var carPos = 0;
var speed = 0;
//var lapses = 0;

function updateRoad(du){
  if (keys[ACCEL]) {

    speed += 2 * du * 0.01;
     console.log("du: "+du);
  }
  else {

    speed -= 1 * du * 0.01;
  }

   if(speed > 1) speed = 1;
   if(speed < 0) speed = 0;

   distance += (0.7*speed) * du;

  while (trackSec < track.length && offset <= distance) {

    offset += track[trackSec].distance;
    trackSec++;

  }

  targetCurv = track[trackSec -1].curvature;

  var trackCurvDiff = (targetCurv - curvature) * 0.01 * du * speed;
  curvature += trackCurvDiff;
  trackCurv += curvature * speed * 0.01 * du;

  carPos = playerCurv - trackCurv;

}

function renderRoad(ctx) {

  for (var y = 0 ; y < ctx.canvas.height/2; y += 4) {

        for (var x = 0; x < ctx.canvas.width; x += 4) {

              var perspective =  y / (ctx.canvas.height/2);

              var mid = 0.5 + trackCurv * Math.pow(1 - perspective, 3);
              var roadWidth =  0.1 +  perspective * 0.8;
              var clipping = roadWidth * 0.15;

              roadWidth *= 0.5;

              var l_grass = (mid - roadWidth - clipping) * ctx.canvas.width;
              var l_clip = (mid - roadWidth) * ctx.canvas.width;

              var r_grass = (mid + roadWidth + clipping) * ctx.canvas.width;
              var r_clip = (mid + roadWidth) * ctx.canvas.width;

              var grassColor = Math.sin(20 * Math.pow(1 - perspective,3) + distance * 0.1) > 0 ? "green" : "#4ce04c";
              var clipColor = Math.sin(80 * Math.pow(1 - perspective,2) + distance) > 0 ? "red" : "white";
              var yy = ctx.canvas.height / 2 + y;

              if (x >= 0 && x < l_grass) {
                ctx.fillStyle = grassColor;
                ctx.fillRect( x, yy, 4, 4 );
              }
              if (x >= l_grass && x < l_clip) {
                ctx.fillStyle = clipColor;
                ctx.fillRect( x, yy, 4, 4 );
              }
              if (x >= l_clip && x < r_clip) {
                ctx.fillStyle = "grey";
                ctx.fillRect( x, yy, 4, 4 );
              }
              if (x >= r_clip && x < r_grass) {
                ctx.fillStyle = clipColor;
                ctx.fillRect( x, yy, 4, 4 );
              }
              if (x >= r_grass && x < ctx.canvas.width) {
                ctx.fillStyle = grassColor;
                ctx.fillRect( x, yy, 4, 4 );
              }

        }
  }


  ctx.fillStyle = "black";
  ctx.font="30px Verdana";
  ctx.fillText("speed: "+ speed,50,50);
  ctx.fillText("distance: "+ Math.floor(distance),50,100);
  ctx.fillText("track Curv: "+ trackCurv,50,150);
  ctx.fillText("player curv: "+ playerCurv,50,200);
  ctx.fillText("targetCurv: "+ curvature,50,250);




}
