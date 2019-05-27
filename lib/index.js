"use strict";

var _fivetwelve = _interopRequireDefault(require("fivetwelve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_fivetwelve.default); // import bridge from 'fivetwelve-bridge'
// import CliDebugDriver from 'fivetwelve-cli-debug-driver'
// // setup the real dmx-output with your drivers
// const output = fivetwelve(new CliDebugDriver())
// output.start(1000/30)
// // start the bridge-server
// const _bridge = bridge(output)
// _bridge.listen(31821, 'localhost', () => {
//   console.log('fivetwelve-bridge is listening on localhost:31821')
// })