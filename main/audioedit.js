const ffmpeg = require("fluent-ffmpeg")
const execSync = require('child_process').execSync;
const path = require('path')

var info = require(path.resolve(__dirname,'/../soundcloud-bot/video_auto/src/obj.json'))

ffmpeg({source: path.resolve(__dirname,'/../soundcloud-bot/main/audio.wav')})
.setStartTime(info[1])
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
.saveToFile(path.resolve(__dirname, "/../soundcloud-bot/video_auto/public/editaudio.wav"))

