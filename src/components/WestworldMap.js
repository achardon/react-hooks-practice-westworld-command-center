import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({areas, hosts}) {

  return <Segment id="map">{areas.map(area => <Area key={area.id} area={area} hosts={hosts}/>)}</Segment>;
}

export default WestworldMap;
