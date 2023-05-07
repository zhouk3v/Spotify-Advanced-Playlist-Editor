import React from "react";
import { TableVirtuoso } from "react-virtuoso";
import { TrackItem } from "./listitems/TrackItem";

import "./css/TrackTable.css";

const TrackTable = ({ items }) => {
  const width = window.innerWidth;
  return (
    // <table className="track-table">
    //   <thead>
    //     <tr>
    //       <th></th>
    //       <th>Track Name</th>
    //       <th>Album</th>
    //       <th>Artists</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {items.map((listItem, index) => (
    //       <TrackItem
    //         key={`${listItem.uri} - ${index}`}
    //         index={index + 1}
    //         track={listItem}
    //       />
    //     ))}
    //   </tbody>
    // </table>
    <TableVirtuoso
      className="track-table"
      data={items}
      fixedHeaderContent={() => (
        <tr style={{ background: "black" }}>
          <th>Index</th>
          <th style={{ width: width * 0.5 }}>Track Name</th>
          <th style={{ width: width * 0.25 }}>Album</th>
          <th style={{ width: width * 0.25 }}>Artists</th>
        </tr>
      )}
      itemContent={(index, track) => (
        <TrackItem
          key={`${track.uri} - ${index}`}
          index={index + 1}
          track={track}
        />
      )}
    />
  );
};

export default TrackTable;
