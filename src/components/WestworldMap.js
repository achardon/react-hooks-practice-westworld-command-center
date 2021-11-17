import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({areas, hosts, selectHost}) {

  return <Segment id="map">{areas.map(area => <Area key={area.id} area={area} hosts={hosts} selectHost={selectHost}/>)}</Segment>;
}

export default WestworldMap;
