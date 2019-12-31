import React from "react";
import ReactDOM from "react-dom";
import JSZip from "jszip";
import FileSaver from "file-saver";

import "./styles.css";

const IMAGE_SOURCE =
  "http://localhost:3001/internal/media/file/fhd/d738da5b-9a01-4353-94f9-f782fbe71d30?_t=2019-12-10T04:15:12.642Z";
const IMAGE_SOURCE_2 =
  "http://localhost:3001/internal/media/file/fhd/bbdd0bc2-e4f2-4b99-97e1-e36cb0beb60e?_t=2019-12-10T04:15:12.642Z";

const selectedImages = [IMAGE_SOURCE, IMAGE_SOURCE_2];

function App() {
  const handleClick = async () => {
    console.log("click!");
    const myImage = document.querySelector(".dynamic-image");

    const zip = new JSZip();
    const folder = zip.folder("downloads");
    for (const image of selectedImages) {
      const fileName =
        "image" + String(Math.round(Math.random() * 10000)) + ".jpg";
      await fetch(image)
        .then(res => res.blob())
        .then(res => folder.file(fileName, res))
        .then(() => console.log(`folder after image --> `, { folder }));
    }
    console.log(`folder --> `, { folder });
    const downloadableZip = await folder.generateAsync({ type: "blob" });
    console.log(`downloadable --> `, { downloadableZip });
    FileSaver.saveAs(downloadableZip, "download");

    fetch(IMAGE_SOURCE)
      .then(res => res.blob())
      .then(res => {
        const universalResourceLocator = URL.createObjectURL(res);
        console.log({ universalResourceLocator });
        myImage.src = universalResourceLocator;
      });
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <img className="dynamic-image" alt="" src="" />
        <button onClick={handleClick} style={{ width: "100px" }}>
          click
        </button>
      </div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
