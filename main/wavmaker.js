const ffmpeg = require('fluent-ffmpeg');
let track = './main/audio.wav';//your path to source file

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
