import React from "react";
export function SpotContainer({
  markersData,
  getSpotContent
}) {
  return <div className="spotContainer">
                <h2 id="text1">View Skate Spots!</h2>
                {markersData.map((data, i) => <a href="#">
                  <div id={i} className="element-container" onClick={getSpotContent}>
                    <img src={data.uploadedImgURLs[0]} className='image' />  
                    <div className="overlay">
                      <div className="element-text">
                      {markersData[i].spotName}
                      </div>
                      <div className="element-textAddress">
                        {markersData[i].spotAddress}
                      </div>
                    </div>
                  </div>
                  </a>)}
              </div>;
}
  