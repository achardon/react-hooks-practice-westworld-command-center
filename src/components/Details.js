import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details( {selectedHost, areas, hosts, setHosts} ) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  // console.log(selectedHost)

  return (
    <Segment id="details" className="HQComps">
      {selectedHost ? <HostInfo selectedHost={selectedHost} areas={areas} hosts={hosts} setHosts={setHosts}/> : <Image size="medium" src={Images.westworldLogo} />}
      
    </Segment>
  );
}

export default Details;
