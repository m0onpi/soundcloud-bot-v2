const request = require('request');
const cheerio = require('cheerio');
const path = require('path')

var info = require(path.resolve(__dirname,'/../soundcloud-bot/video_auto/src/obj.json'));
const fs  = require('fs');
const trackUrl = info[0];

request(trackUrl, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const title = $('title').text();

    // Split the title into its component parts
    const parts = title.split(' by ');

    const author = (parts[1].split(' | ')[0]).replace(/"/g ,"")


    // Extract the track title and artist name
    const trackTitle = parts[0];


    // Construct the final track title string
    const remove1 = `${trackTitle.replace("Stream","")}`;
    const remove2 = `${remove1.replace("[FREE DL]","")}`;
    const remove3 = `${remove2.replace("(FREE DOWNLOAD)","")}`;
    const remove4 = `${remove3.replace("[FREE DOWNLOAD]","")}`;
    const remove5 = `${remove4.replace("FREE DL","")}`;
    const remove6 =`${remove5.replace("()","")}`;
    const remove7 =`${remove6.replace("**","")}`;
    const remove8 =`${remove7.replace("[OUT NOW ON ALL PLATFORMS]","")}`;

    const final = remove8

    const cutfinal = (final.replace(/ /g,'')).toUpperCase()
    const cutauthor = (author.replace(/ /g,'')).toUpperCase()
    let included = cutfinal.includes(cutauthor)  
    console.log(cutauthor,cutfinal)
    

    if (included){
        maintitle = JSON.stringify(final).toUpperCase()
        console.log(maintitle)

        fs.writeFile(path.resolve(__dirname,"/../soundcloud-bot//video_auto/src/generatedTitle.json"),maintitle, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
            }})
        }else{
            maintitle = JSON.stringify(final+' - '+author).toUpperCase()
            console.log(maintitle)

            fs.writeFile(path.resolve(__dirname,"/../soundcloud-bot//video_auto/src/generatedTitle.json"),maintitle, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                }})
        }
    
  }
})

