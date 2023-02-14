const sharp = require('sharp');
const path = require('path')
const ffmpeg = require("fluent-ffmpeg")
const execSync = require('child_process').execSync;
const obj = require('/soundcloud-bot/video_auto/src/obj.json')

let track = './main/audio.wav';//your path to source file
var data = require('./wavaudio.json')
const values = data.data
time = Array.from({length: values.length}, (_, i) => i + 1)

var info = require('./requests.json')
const songurl = info[1].urlV
console.log(songurl)
const fs  = require('fs');

const editaudio =  () => {
    ffmpeg('./main/audio.wav')
    .setStartTime(24)
    .duration(21)
    .on('start',function(commandLine){
    console.log("Trimming")

    })
    .on('error', function(err){
        console.log("Song not downloadable", + err)
    })
    .on("end", function(err){
        console.log("Trimmed")
        execSync('npm start --prefix video_auto')

    
    
    })
    .saveToFile(path.resolve(__dirname, "/soundcloud-bot/video_auto/public/editaudio.wav"))
}


const blurimage = async () => {
    sharp(path.resolve(__dirname,'/soundcloud-bot/video_auto/public/image.png'))
    .blur(25)
    .resize(1080,1920)
    .toFile(path.resolve(__dirname,'/soundcloud-bot/video_auto/public/output.png'), (error, info) => {
    if (error) {
        console.error(error)
    } else {
        console.log('Image blurred successfully');
    
    
    }
    })
}

const wav2 = async () => {
    ffmpeg(track)
    .toFormat('wav')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        // console.log(JSON.stringify(progress));
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
        console.log('Processing finished !');
    })
    .save('./main/wavaudio.wav');//path where you want to save your file
    }

const start =  () => {
const maxValue = Math.max(...values)
const minValue = Math.min(...values)
const maxPos = values.indexOf(maxValue)
const minPos = values.indexOf(minValue)

console.log(maxValue, maxPos, minValue, minPos)
///plotly.plot(plot, layout, function (err, msg) {
	///if (err) return console.log(err);
	///console.log(msg);
///});

return ~~(maxPos/3) -5;
}



module.exports = {blurimage,editaudio,wav2,start}