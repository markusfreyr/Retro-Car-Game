

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");


gameManager.generateCar({
    cx : 600,
    cy : 700
});

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


function updateSimulation(du) {

    updateRoad(du);
    gameManager.update(du);

}

function renderSimulation(ctx) {


    renderRoad(ctx);
    gameManager.render(ctx);


}


var g_images = {};

function requestPreloads() {

    var requiredImages = {
	car   : "src/car.png",
  carR  : "src/carR.png",
  carL  : "src/carL.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.car = new Sprite(g_images.car);
    g_sprites.carR = new Sprite(g_images.carR);
    g_sprites.carL = new Sprite(g_images.carL);


    main.init();
}

// Kick it off
requestPreloads();
