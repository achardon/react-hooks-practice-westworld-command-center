import React from "react";
import "../stylesheets/Area.css";

function Area( {area, hosts} ) {

  //capitalize first letter of each area
  const areaName = area.name
  let finishedName = areaName.replace('_', ' ')
  let splitName = finishedName.split(' ')
  for (let i = 0; i < splitName.length; i++) {
    splitName[i] = splitName[i][0].toUpperCase() + splitName[i].substring(1);
  }
  finishedName = splitName.join(' ')


  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {/* Don't just pass in the name from the data...clean that thing up */}
        {finishedName}
      </h3>
      {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
