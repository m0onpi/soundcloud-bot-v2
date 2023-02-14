const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const {exec} = require('child_process')
fs = require("fs"); 
const path = require('path')
const {blurimage,editaudio, wav2,start} = require('./editdata')
const {maintitle} = require('./gettitle')
var info = require('./requests.json')
const songurl = info[0].urlV
obj = []
obj.push(songurl, start()) 
let object = JSON.stringify(obj)
fs.writeFileSync('/soundcloud-bot/video_auto/src/obj.json',object)
console.log(obj)  

const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();                                                
Stream = require('stream').Transform, 
fs = require("fs");
var http = require('http')
var https = require('https');

client.getSongInfo(obj[0])
.then(async song => {
    const stream = await song.downloadProgressive();
    const writer = stream.pipe(fs.createWriteStream(`./main/audio.wav`));

    https.request(song.thumbnail, function(response) {                                        
      var data = new Stream();                                                      
      response.on('data', function(chunk) {                                       
        data.push(chunk);     
                                                            
      });

      response.on('end', function() {  
        fs.writeFileSync(path.resolve(__dirname,'/soundcloud-bot/video_auto/public/image.png'), data.read());
        blurimage()
        editaudio()
        start()
        wav2()
        
      });
    }).end()


    
  });


