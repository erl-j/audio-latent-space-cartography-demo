import logo from './logo.svg';
import './App.css';
import pointData from './pointData.js';
import React from 'react';
const FRAME_WIDTH = 512;
const INNER_WIDTH = 3200;

const c2p = (x) => {
  return (x * (INNER_WIDTH) + FRAME_WIDTH) / (INNER_WIDTH + FRAME_WIDTH * 2)
}

const family2emoji = {
  "bass": "🐟",
  "guitar": "🎸",
  "reed": "🎷",
  "brass": "🎺",
  "keyboard": "🎹",
  "organ": "⛪️",
  "vocal": "🗣",
  "mallet": "🔨",
  "string": "🎻",
  "flute": "🪄",
}

const keywords = {
  "instruments": [
    "bass guitar",
    "acoustic guitar",
    "piano keyboard",
    "flute",
    "pipe organ",
    "violin",
    "cello",
    "double bass",
    "violin",
    "viola",
    "saxophone",
    "trumpet",
    "trombone",
    "tuba",
    "clarinet",
    "marimba",
    "kalimba",
    "xylophone",
    "bell",
    "electric guitar",
    "human voice",
  ],
  "adjectives":
    [
      "soft",
      "hard",
      "rough",
      "smooth",
      "textured",
      "metallic",
      "repeating",
      "distorted",
      "geometric",
      "bright",
      "dark",
      "scary",
      "weird",
      "organic",
    ]
}


const mapName2url = {
  "Music instruments": { keywords: keywords["instruments"], prompt_template: "A 3D rendered close-up of a <KEYWORD>, pinterest trending aesthetic", url: "maps/map.jpg" },
  "René Magritte": { keywords: keywords["instruments"], prompt_template: "A close-up of a <KEYWORD> in the style of Renee Magritte, pinterest trending aesthetic", url: "maps/magritte_map.jpg" },
  "Besinski": { keywords: keywords["instruments"], prompt_template: "A close-up of a <KEYWORD> in the style of Zdzisław Beksiński, pinterest trending aesthetic", url: "maps/beksinski_map.jpg" },
  "Mushrooms": { keywords: keywords["adjectives"], prompt_template: "A 3D rendered <KEYWORD> mushroom, pinterest trending aesthetic", url: "maps/mushroom_map.jpg" },
  "Christmas ornaments": { keywords: keywords["instruments"], prompt_template: "A 3D rendered close-up of a <KEYWORD> shaped christmas ornament, pinterest trending aesthetic", url: "maps/christmas_map.jpg" },
  "Neon lights": { keywords: keywords["instruments"], prompt_template: "A nighttime close-up of a neon sign in the shape of a <KEYWORD>, pinterest trending aesthetic", url: "maps/neon_map.jpg" },
  "Flowers": { keywords: keywords["adjectives"], prompt_template: "A 3D rendered <KEYWORD> flower, pinterest trending aesthetic", url: "maps/flowers_map.jpg" }
}
function App() {

  const [showLabels, setShowLabels] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(Object.keys(mapName2url)[0]);

  return (
    <div style={{ width: "100vw", height: "100vh", flex: "column", flexDirection: "column" }}>
      <div style={{ margin: 32 }}>
        <h1>Audio Latent Space Cartography Demo</h1>
        <p>Click on a point to hear it. Select a latent map style in the dropdown. Legend appears at the bottom of the page when labels are shown.</p>
        <label>
          Latent map style:
          <select type="select" value={selectedMap} onChange={(e) => setSelectedMap(e.target.value)}>
            {
              Object.keys(mapName2url).map((name) => {
                return <option key={name} value={name}>{name}</option>
              })
            }
          </select>
        </label>
        <br></br>
        <br></br>
        <button
          onClick={
            () => {
              setShowLabels(!showLabels)
            }
          }
        >{!showLabels ? "Show audio labels" : "Hide audio labels"}</button>

      </div>
      <div style={{ margin: 32 }}>
        <h3>Map style: {selectedMap}</h3>
        <p>Prompt template: <it>{mapName2url[selectedMap]["prompt_template"]}</it></p>
        <p>Keywords: <it>{mapName2url[selectedMap]["keywords"].map(kw => kw + ", ")}</it></p>
      </div>
      <div style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>

        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={process.env.PUBLIC_URL + "/" + mapName2url[selectedMap]["url"]} style={{ maxHeight: "100vh", maxWidth: "98vw", opacity: showLabels ? 0.1 : 1 }}></img>
          {pointData.map((point, pi) => {
            return <div key={pi}
              onClick={() => {
                // play audio
                console.log("play audio", point)
                const audio = new Audio(point.metadata.filepath.replace("./data/nsynth/nsynth-test", process.env.PUBLIC_URL));
                // lower volume
                audio.volume = 0.1;
                audio.play();
                console.log("hello")
              }}
              style={{
                width: showLabels ? 0 : "1.5vh",
                height: showLabels ? 0 : "1.5vh",
                borderRadius: 100,
                backgroundColor: "lightgray",
                boxShadow: "0px 0px 3px 1px black",
                cursor: "pointer", position: "absolute",
                left: c2p(point.y) * 100 + "%",
                top: 100 - c2p(point.x) * 100 + "%",
                color: "grey", fontSize: 25,
                lineHeight: "-50%"
              }}>{showLabels ? family2emoji[point.metadata.instrument_family_str] : ""}</div>
          })}

        </div>

      </div >
      <div>


        <div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", margin: 32 }}>

            {showLabels &&
              <>
                <h3>Legend</h3>
                {Object.keys(family2emoji).map((family) => {
                  return <div style={{ display: "flex", flexDirection: "row", fontSize: 24 }}>
                    <div>{family2emoji[family]}   {family}</div>
                  </div>
                })}
              </>
            }
          </div>
        </div>
      </div >
      {/* <div>
        {Object.keys(mapName2url).slice(1, 4).map(e =>
          <img src={process.env.PUBLIC_URL + "/" + mapName2url[e]} style={{ margin: -10, height: 350, width: 350 }}></img>
        )}
        <br></br>
        {Object.keys(mapName2url).slice(4).map(e =>
          <img src={process.env.PUBLIC_URL + "/" + mapName2url[e]} style={{ margin: -10, height: 350, width: 350 }}></img>
        )}
      </div> */}
    </div>
  );
}

export default App;
