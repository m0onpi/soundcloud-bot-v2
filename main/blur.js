const sharp = require('sharp');
const path = require('path')

sharp(path.resolve(__dirname,'/../soundcloud-bot/video_auto/public/image.png'))
.blur(25)
.resize(1080,1920)
.toFile(path.resolve(__dirname,'/../soundcloud-bot/video_auto/public/output.png'), (error, info) => {
if (error) {
    console.error(error)
} else {
    console.log('Image blurred successfully');
    
}
})

