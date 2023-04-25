import { interpolate, useCurrentFrame,spring, AbsoluteFill, Img, staticFile,Audio,useVideoConfig,Sequence } from "remotion"
import { AudioData, useAudioData, visualizeAudio } from "@remotion/media-utils";
import { loadFont } from "@remotion/google-fonts/Montserrat";
const { fontFamily } = loadFont();
const generated = require('./generatedTitle.json')
import { RadialBarsVisualization } from "./RadialBarsVisualization";
import musicSrc from "/public/editaudio.wav";


const combineValues = (length: number, sources: Array<number[]>): number[] => {
    return Array.from({ length }).map((_, i) => {
      return sources.reduce((acc, source) => {
        // Pick the loudest value for each frequency bin
        return Math.max(acc, source[i]);
      }, 0);
    });
  };
  
  const visualizeMultipleAudio = ({
    sources,
    ...options
  }: {
    frame: number;
    fps: number;
    numberOfSamples: number;
    sources: Array<AudioData>;
    smoothing?: boolean | undefined;
  }) => {
    const sourceValues = sources.map((source) => {
      return visualizeAudio({ ...options, audioData: source });
    });
    return combineValues(options.numberOfSamples, sourceValues);
  };


export const Background: React.FC = () =>{

    const frame = useCurrentFrame(); 
    const {fps} = useVideoConfig();
    const {durationInFrames} = useVideoConfig();
    const opacity = interpolate(frame, [0, 30,durationInFrames-30,durationInFrames-5], [0, 1,1,0])
    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.5])
    const title = generated
    const Ypath = spring({
        from: 0,
        to: 100,
        frame,
        fps,
        config: {mass: 10, damping: 110, stiffness: 350}
    })
    const up = interpolate(Ypath,[0,100,durationInFrames -100,durationInFrames],[0,100,100,-100])
    const musicData = useAudioData(musicSrc);
    if (!musicData) return null;

  // I suggest using either 1024, or 512.
  // Larger number = finer details
  // Smaller number = faster computation
  const nSamples = 1024;

  const visualizationValues = visualizeMultipleAudio({
    fps,
    frame,
    sources: [musicData],
    numberOfSamples: nSamples
  });

  // Optional: use only part of the values
  const frequencyData = visualizationValues.slice(0, 1.2 * nSamples);



    return(
        <Sequence >


        <AbsoluteFill>   
            <Img src={staticFile("output.png")} style={{
                transform:`scale(${zoom})`,
                border: "10px",
                

            }} />
            
    
            
        <Img src ={staticFile("image.png")} style = {{
            position: "relative",
            width: "600px",
            height: "600px",
            bottom: "62%",
            left: "22.5%",
            padding: "10px",
            background: "black",
            opacity,
            transform: `translateY(-${up}px)`,
            borderRadius: "50%",

            
             
                
        }} />
        
        
        <Img src ={staticFile("dntlogo.png")} style = {{
            position: "relative",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            bottom: "35.5%",
            left: "82.5%",
            padding: "4px",
            background: "black",
            transform: `translateY(-${up}px)`,
            opacity,
            
            
                
        }} />


        <Img src ={staticFile("222.png")} style = {{
            position: "relative",
            width: "650px",
            height: "350px",
            bottom: "127.5%",
            left: "20%",
            padding: "8px",
            background: "black",
            transform: `translateY(-${up}px)`,
            opacity,
            borderRadius: "5%"
            
            
                
        }} />

        <div  style={{ 
            display: "flex",
            position: "relative",
            fontFamily,
            fontSize: 80,          
            color: "white",
            bottom: "82%",
            left: "2.5%",
            width: "1000px",
            padding: "10px",
            border: "5px",
            margin: "0px",
            textAlign: "center",
            transform: `translateY(-${up}px)`,
            opacity,
            
            
            
            
         }}>
              
         <p>
         {title}
        </p>


        </div>
        </AbsoluteFill> 

        <Audio src={staticFile("editaudio.wav")} volume={(f) =>
          interpolate(f, [0, 100], [0, 0.5], { extrapolateLeft: "clamp",extrapolateRight:"clamp" })
        } />

        <div
          style={{
            position: "relative",
            left: "13.25%",
            top: "32.75%",
            transform: `translateY(-${up}px)`,
            opacity,  
            rotate: `0deg`
          }}  
        >
          <RadialBarsVisualization
            frequencyData={frequencyData}
            diameter={800}
            innerRadius={300}
            color="#C0C0C0"
            
          /> 
        </div>  

        
              

    </Sequence>
    )
};
