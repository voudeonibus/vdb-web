var Reflux = require('reflux');

var busTripAction = Reflux.createActions([
    "searchLine",
    "selectLine"
]);

module.exports.actions = busTripAction;