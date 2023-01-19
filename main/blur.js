const sharp = require('sharp');

sharp('/projectsjs/video_auto/public/image.png')
.blur(25)
.resize(1080,1920)
.toFile('/projectsjs/video_auto/public/output.png', (error, info) => {
if (error) {
    console.error(error)
} else {
    console.log('Image blurred successfully');
    
}
})

