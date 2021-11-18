import React from "react";
import "../stylesheets/Area.css";
import Host from './Host';

function Area( {area, hosts, selectHost} ) {

  //capitalize first letter of each area
  const areaName = area.name
  let finishedName = areaName.replace('_', ' ')
  let splitName = finishedName.split(' ')
  for (let i = 0; i < splitName.length; i++) {
    splitName[i] = splitName[i][0].toUpperCase() + splitName[i].substring(1);
  }
  finishedName = splitName.join(' ')

  const hostsInThisArea = hosts.filter(host => host.area === area.name && host.active)

  // console.log(area.name, hostsInThisArea)

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
      {hostsInThisArea.map(host => <Host key={host.id} host={host} selectHost={selectHost}/>)}
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
