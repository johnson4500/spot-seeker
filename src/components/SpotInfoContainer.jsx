import React from "react";
import { Slide } from "react-slideshow-image";
export function SpotInfoContainer({
  properties,
  spotID,
  filteredData,
  spotClick,
  showMap
}) {
  return (
  <>
  <div className="spotInfoContainer">
    <div className="imageContainer">
      <div className='spotImage'>
          <Slide {...properties}>
            {filteredData[spotID].uploadedImgURLs.map((data, i) => 
              <div key={i + "spotImage"}>
                <img draggable="false" className="spotImage" src={data}></img>
              </div>)}
          </Slide>
        </div>
      </div>
      <br></br>
      <strong id="spotTitleText">Spot Name: {filteredData[spotID].spotName}</strong>
      <p id="spotAddress">Address: {filteredData[spotID].spotAddress}</p>
      <div className="spotDescription">
        <p id="spotDescriptionText">{filteredData[spotID].spotDescription}</p>
      </div>
      <br></br>
      <button id="backButton" onClick={() => {
        spotClick();
        showMap();
      }}> Back</button>
  </div>
  </>
  )
}
  