"use strict";


 var util = {

   clearCanvas: function (ctx) {
       var prevfillStyle = ctx.fillStyle;
       ctx.fillStyle = "#42e5f4";
       ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
       ctx.fillStyle = prevfillStyle;
   }
 };
