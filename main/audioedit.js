const ffmpeg = require("fluent-ffmpeg")
const execSync = require('child_process').execSync;
var info = require('/projectsjs/video_auto/src/obj.json')

ffmpeg({source:'/projectsjs/main/audio.wav'})
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
.saveToFile("/projectsjs/video_auto/public/editaudio.wav")

