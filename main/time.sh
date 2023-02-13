#!/usr/bin/python3

python wav2json.py -i audio.wav
const wav = execSync('node main/wavmaker')
const wav2json =execSync('python main/wav2json.py -i main/wavaudio.wav')
const fft =execSync('node main/fft')
console.log(wav)
console.log(wav2json)
console.log(fft)