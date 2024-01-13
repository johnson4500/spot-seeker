import { React, useMemo, useState, useEffect} from "react";
import { Slide } from "react-slideshow-image";
import {update, ref as dbRef, onValue} from 'firebase/database';
import { rtDB} from '../firebaseconfig';
import { v4 } from "uuid";
import { useAuth } from "../pages/AuthContext";

export function SpotInfoContainer({
  properties,
  spotID,
  filteredData,
  spotClick,
  showMap,
}) {

  const { authUser, setAuthUser } = useAuth();
  const [text, setText] = useState("");
  const [commentsData, setCommentsData] = useState({});
  const commentRef = useMemo(() => dbRef(rtDB, 'spots/' + filteredData[spotID].spotName + '/comments'), [filteredData, spotID]);


  const handleChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "25px";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(e.target.value);
  };

  const postComment = () => {
    if (authUser !== null) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const formattedDateTime = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      if (text.length > 1) {
        update(commentRef, {
          [v4()]: text + formattedDateTime,
        }).then(() => {
          setText("");
          console.log("Comment added.");
        });
      } 
    } else {
      window.alert("Please sign in to comment!");
    }
    
  }
  
  useEffect(() => {
    const unsubscribe = onValue(commentRef, (snapshot) => {
      const newComments = [];
      snapshot.forEach(childSnapshot => {
        newComments.push(childSnapshot.val());
      });

      // Sort comments by date posted (oldest to newest)
      const sortedComments = newComments.slice().sort((a, b) => {
        const timestampA = a.slice(a.length - 16, a.length); // Extract timestamp substring
        const timestampB = b.slice(b.length - 16, b.length);
      
        const timeA = new Date(timestampA);
        const timeB = new Date(timestampB);
      
        return timeA - timeB;
      });
      
      setCommentsData(sortedComments);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the event listener
  }, [commentRef]);
  

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
      <div style = {{marginTop: "10px"}}>
        <strong id="spotTitleText">Spot Name: {filteredData[spotID].spotName}</strong>
      </div>
      <p id="spotAddress">Address: {filteredData[spotID].spotAddress}</p>
      <div className="spotDescription">
        <p id="spotDescriptionText">{filteredData[spotID].spotDescription}</p>
      </div>
      <button id="backButton" onClick={() => {
        spotClick();
        showMap();
      }}> Back</button>
      <div> 
        <strong style = {{fontSize: "25px"}}>
          Comments
        </strong>
      </div>
      {/* <div className = "commentContainer" style = {{height: "500px", width: "90%", backgroundColor: "gray", borderRadius: "20px", borderStyle: "solid", borderWidth: "5px"}}> */}
  
      <div className="textAreaContainer">
        <textarea
          className="textArea"
          placeholder="Enter your comment here..."
          name="comment"
          value={text}
          onChange={handleChange}
        >
        </textarea>
        <div 
          style = {{
            height: "40px",
            width: "40px",
            marginBottom: "10px", 
            float: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }} 
          className= "sendIcon"
          role="button"
          tabIndex="0"
          onClick={postComment}
        >
          <img id = "sendImg" src = "https://cdn.iconscout.com/icon/free/png-256/free-send-forward-arrow-right-direction-import-30559.png" 
          style = {{
            height: "20px", 
            width: "20px", 
            left: "10px",
            color: "blue"
          }}
          />
        </div>
      </div>
  
      <div className = "commentsContainer">
        {commentsData.length > 0 ? (
          commentsData.map(element => (
          <div className="comments">
            <div style = {{height: "30px"}}>
            <p style = {{marginBottom: "0"}}>{element.substring(element.length - 16, element.length)}</p>
            </div>
             <strong>{element.substring(0, element.length - 16)}</strong>
          </div>
          ))
        ) : (
          null
        )}
      </div>
    </div>
    </>
  )
}
  