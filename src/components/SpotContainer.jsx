import { marker } from "leaflet";
import React from "react";
import { useState } from "react";
export function SpotContainer({
  markersData,
  getSpotContent,
  searchInput, 
  setSearchInput,
  filteredData,
  handleSearchInput
}) {
  return <div className="spotContainer">
            <strong id="text1">View Skate Spots!</strong>
            <input className="input-field" type="text" id="fname" name="fname" style={{
              paddingLeft: "10px",
              fontWeight: "bold",
              fontSize: "2.5vh",
              marginBottom: "30px",
              width: "89%",
              borderStyle: "solid",
              borderRadius: "10px",
              borderColor: "black",
              borderWidth: "4px"
            }} placeholder='Search...' value = {searchInput} onChange={handleSearchInput}/>

            <div className = "blocker">
            {filteredData.length > 0 ? (
              <>
              {filteredData.map((data, i) => 
                <a href="#">
                  <div id={i} className="element-container" onClick={getSpotContent}>
                    <img src={data.uploadedImgURLs[0]} className='image' />  
                    <div className="overlay">
                      <div className="element-text">
                      {filteredData[i].spotName}
                      </div>
                      <div className="element-textAddress">
                        {filteredData[i].spotAddress}
                      </div>
                    </div>
                  </div>
                </a>)
              }
              </>
            ) : (
              <div style = {{textAlign:"center"}}>
              <strong style = {{position: "relative", fontSize: "20px"}}>No spots found matching search "{searchInput}".</strong>
              <br></br>
              <strong>{":(("}</strong>
              </div>
            )}
            </div>
          </div>;
}
  