const express = require('express');
const execSync = require('child_process').execSync;
var bodyParser = require('body-parser')
const app = express();
fs = require("fs"); 
const path = require('path')
const shell = require('shelljs')
const startValue = require('./fft')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var obj = []   
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    let songurl = req.body.songurl
    obj.push(songurl, startValue.startValue) 
    let object = JSON.stringify(obj)
    console.log(obj)  
    fs.writeFile('./video_auto/src/obj.json', object, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
      console.log('Successfully wrote file')

      
      }})  
    res.sendFile(__dirname + '/index.html');
});
app.listen(8800)

const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();                                                
Stream = require('stream').Transform, 
fs = require("fs");
var http = require('http')
var https = require('https');
var info = require(path.resolve(__dirname,'/soundcloud-bot/video_auto/src/obj.json'))

client.getSongInfo(info[0])
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
        require('child_process').fork(path.resolve(__dirname,'blur.js'))
        require('child_process').fork(path.resolve(__dirname,'title.js'))
        require('child_process').fork(path.resolve(__dirname,'audioedit.js'))
        
      });
    }).end()


    
  });


