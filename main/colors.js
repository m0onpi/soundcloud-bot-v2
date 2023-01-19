const path = require('path')
const getColors = require('get-image-colors')

getColors(path.join(__dirname, 'output.png')).then(colors => {
  // `colors` is an array of color objects
  colors.map(color => color.hex())
  colour = JSON.stringify(colors[0])
  rgbvalues = colors[0]._rgb._unclipped.slice(0,-1)
  console.log(rgbvalues)
})