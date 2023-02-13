var data = require('./wavaudio.json')
const values = data.data
time = Array.from({length: values.length}, (_, i) => i + 1)
var plot = [{x:time, y:values, type: 'bar'}];
var layout = {fileopt : "overwrite", filename : "simple-node-example"};

const maxValue = Math.max(...values)
const minValue = Math.min(...values)
const maxPos = values.indexOf(maxValue)
const minPos = values.indexOf(minValue)

console.log(maxValue, maxPos, minValue, minPos)
///plotly.plot(plot, layout, function (err, msg) {
	///if (err) return console.log(err);
	///console.log(msg);
///});

const startValue = ~~(maxPos/3) -5;
console.log(startValue)

module.exports = {startValue}