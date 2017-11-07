

"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function car(descr) {
    for (var property in descr) {
        this[property] = descr[property];
      }
}

car.prototype.KEY_RIGHT  = '39';
car.prototype.KEY_LEFT   = '37';


car.prototype.rotation = 0;
car.prototype.cx = g_ctx.canvas.width / 2 + g_ctx.canvas.width * carPos / 2 ;
car.prototype.cy = 700;


car.prototype.update = function(du) {

  if (keys[this.KEY_RIGHT]) {

    playerCurv += 0.7 * du *0.01 * (1 - speed/2);

  }
  if (keys[this.KEY_LEFT]) {

    playerCurv -= 0.7 * du * 0.01  * (1 - speed/2);

  }

  this.cx = g_ctx.canvas.width / 2 + g_ctx.canvas.width * carPos / 2;

}

car.prototype.render = function (ctx) {

    if (keys[this.KEY_LEFT]) {
      g_sprites.carL.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation
      );


    }
    else if(keys[this.KEY_RIGHT]) {
      g_sprites.carR.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation
      );
    }
    else {
      g_sprites.car.drawWrappedCentredAt(
  	ctx, this.cx, this.cy, this.rotation
      );
    }

};
