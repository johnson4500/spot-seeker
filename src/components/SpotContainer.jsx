import { set } from 'firebase/database';
import { SearchBar } from './SearchBar';
import { marker } from "leaflet";
import React, { useEffect } from "react";
import { useState } from "react";
export function SpotContainer({
  markersData,
  getSpotContent,
  filteredData,
  setFilteredData
}) {
  const [searchInput, setSearchInput] = useState("");

  return <div className="spotContainer">
            <strong id="text1">View Skate Spots!</strong>
            <SearchBar markersData={markersData} setFilteredData={setFilteredData} searchInput={searchInput} setSearchInput={setSearchInput}/>
            {/* <div>

            </div> */}
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
              <strong style = {{position: "relative", fontSize: "20px"}}>No spots found!</strong>
              <br></br>
              <strong>{":(("}</strong>
              </div>
            )}
            </div>
          </div>;
}
  