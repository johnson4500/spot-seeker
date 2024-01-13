import {React, useState, useEffect} from "react";
export function SearchBar({
    markersData,
    setFilteredData,
    searchInput,
    setSearchInput
}) {
    useEffect(() => {
        if (searchInput.length < 1) {
        setFilteredData(markersData);
        }
    }, [searchInput])

    const handleSearchInput = (e) => {
        if (event.key === 'Enter') {
        setFilteredData(prevData => markersData.filter(element =>
            element.spotName.toLowerCase().includes(searchInput.toLowerCase()) || element.spotName.toLowerCase().includes(searchInput.toLowerCase())
        )); 
        }
    }

  return (
    <input className="input-field" type="text" id="fname" name="fname" placeholder='Search then press enter...' value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={handleSearchInput} />
  )
}
  