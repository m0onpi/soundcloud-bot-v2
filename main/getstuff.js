const express = require('express');
const execSync = require('child_process').execSync;
var bodyParser = require('body-parser')
const app = express();
fs = require("fs"); 

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var obj = []   
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    let songurl = req.body.songurl
    let startime = req.body.starttime
    obj.push(songurl, startime) 
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
var https = require('https')
var info = require('/projectsjs/video_auto/src/obj.json')

client.getSongInfo(info[0])
.then(async song => {
    const stream = await song.downloadProgressive();
    const writer = stream.pipe(fs.createWriteStream(`/projectsjs/main/audio.wav`));

    https.request(song.thumbnail, function(response) {                                        
      var data = new Stream();                                                      
      response.on('data', function(chunk) {                                       
        data.push(chunk);     
                                                            
      });

      response.on('end', function() {  
        fs.writeFileSync('/projectsjs/video_auto/public/image.png', data.read());
        require('child_process').fork('/projectsjs/main/blur.js')
        require('child_process').fork('/projectsjs/main/title.js')
        require('child_process').fork('/projectsjs/main/audioedit.js')
        
        
        
        
      });
    }).end()
    
    
  });


