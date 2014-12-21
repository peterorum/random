// run phantom from a node script
// node ./run-take-screenshot.js

var shooter = require("./take-screenshot.js");

shooter.takeShot('http://localhost:8888', 'screen2' );
