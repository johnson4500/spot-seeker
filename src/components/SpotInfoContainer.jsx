import React from "react";
import { Slide } from "react-slideshow-image";
export function SpotInfoContainer({
  properties,
  spotID,
  markersData,
  spotClick,
  showMap
}) {
  return <div className="spotInfoContainer">
                <br></br>
                  <div className="imageContainer">
                    <br></br>
                    <div className='spotImage'>
                      <Slide {...properties}>
                        {markersData[spotID].uploadedImgURLs.map((data, i) => <div key={i + "spotImage"}>
                            <img draggable="false" className="spotImage" src={data}></img>
                          </div>)}
                      </Slide>
                    </div>
                </div>
                <br></br>
                <strong id="spotTitleText">Spot Name: {markersData[spotID].spotName}</strong>
                <p id="spotAddress">Address: {markersData[spotID].spotAddress}</p>
                <div className="spotDescription">
                  <p id="spotDescriptionText">{markersData[spotID].spotDescription}</p>
                </div>
                <br></br>
                <button id="backButton" onClick={() => {
      spotClick();
      showMap();
    }}> Back</button>
              </div>;
}
  