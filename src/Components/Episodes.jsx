import React from 'react';
import axios from 'axios';




const Episodes = ({ title, season, episodeNumber, details }) => {
    <div className="episode">
        <h2>{title}</h2>
        <h3>Season: {season}</h3>
        <h3>Episode: {episodeNumber}</h3>
        <ul>
            {/* {details.map(detail => (
                <li>hi</li>
            ))} */}
            {details}
        </ul>
    </div>
}
    
    
        // <div className="episodes">
        //   {this.state.episodes.map(episode => (
        //     <div>
        //       <h1>{episode.title}</h1>
        //       <h3>Season: {episode.season}</h3>
        //       <h3>Episode: {episode.episodeNumber}</h3>
        //       <ul>             
        //         {episode.details.map(detail => (
        //           <li>{detail}</li>
        //         ))}
        //       </ul>
        //     </div>
        //   ))}
        // </div>



export default Episodes;
