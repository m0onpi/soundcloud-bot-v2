const sharp = require('sharp');
const path = require('path')
const ffmpeg = require("fluent-ffmpeg")
const execSync = require('child_process').execSync;
const wait  = require('wait')
var info = require('./requests.json')
const url = info[0].url
const fs  = require('fs');
const { spawn } = require('child_process');

const urlSplit = async => {
    const songurl = url.split('?')[0]
    const time = url.split('t=')[1]
    const minute = Number(time.split('%')[0])
    const second = Number(time.split('A')[1])
    console.log(minute, second)
    return (minute * 60) + second -2
}
const t = urlSplit()
const editaudio = async (callback) => {
    try {
      await ffmpeg('./main/audio.wav')
        .setStartTime(t)
        .duration(21)
        .on('start', function(commandLine) {
          console.log('Trimming');
        })
        .on('error', function(err) {
          console.log('Error trimming audio:', err);
          callback(err);
        })
        .on('end', function() {
          console.log('Audio trimmed successfully.');
        })
        .saveToFile(path.resolve(__dirname, '/soundcloud-bot/video_auto/public/editaudio.wav'));
    } catch (err) {
      console.log('Error during audio trimming:', err);
      callback(err);
    }
    
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

module.exports = {blurimage,editaudio,urlSplit}