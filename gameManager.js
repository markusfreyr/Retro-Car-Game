/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var gameManager = {

// "PRIVATE" DATA

_car   : [],

// PUBLIC METHODS


generateCar : function(descr) {

    var mycar = new car(descr);
    this._car.push(mycar);
    console.log(this._car);
},


// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._rocks, this._bullets, this._car];
},

init: function() {

    this.generateCar();

},

update: function(du) {

    // TODO: Implement this

    // NB: Remember to handle the "KILL_ME_NOW" return value!
    //     and to properly update the array in that case.

    for (var i = 0; i < this._car.length; i++) {
      if(this._car[i].dead){
        this._car.splice(i, 1);
      }
      else{
        this._car[i].update(du);
      }
    }
},

render: function(ctx) {

    // TODO: Implement this

    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects
    this._car.forEach((car) => {
      car.render(ctx);
    });


}

}

// Some deferred setup which needs the object to have been created first
gameManager.deferredSetup();
gameManager.init();
